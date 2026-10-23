import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { embed, streamText, convertToModelMessages, type UIMessage } from 'ai';
import { Index } from '@upstash/vector';

// Secrets/bindings are injected by Wrangler at runtime (set via `wrangler secret`
// in production, or a local `.dev.vars` file for `wrangler dev`).
export interface Env {
  // Answers the question. Set with `wrangler secret put OPENAI_API_KEY`.
  OPENAI_API_KEY: string;
  // Still required: the retrieval half runs on Gemini — see the embed call.
  GOOGLE_GENERATIVE_AI_API_KEY: string;
  UPSTASH_VECTOR_REST_URL: string;
  UPSTASH_VECTOR_REST_TOKEN: string;
}

const app = new Hono<{ Bindings: Env }>();

// The facts every answer may rely on, whatever retrieval returns. "What is
// streamerOS?" was answered with "I don't have information" because the
// vector search for a short follow-up ("what is it?") surfaced unrelated
// chunks and the prompt forbade anything outside them. Identity, platform,
// price and launch are too basic to depend on a similarity score. Keep this
// in step with docs/knowledge-base.md.
const CORE_FACTS = `streamerOS is a desktop cockpit app for live streamers on YouTube Live and Twitch. It runs natively on Windows 10 and 11 (64-bit) and works alongside OBS Studio: it reads your chat, measures what your audience is doing, drives OBS scene changes for you, and helps with the work around the stream (clips, Shorts, upload titles, sponsors). It does not replace OBS; you still stream with OBS. It is built in Rust on Tauri, uses about 1.8% CPU under a live 1080p60 game, and is local-first: no account, no login, no cloud backend, no telemetry; chat, audio and data stay on the user's PC. Local AI features (AI Sidekick, Sentiment Horizon, Viral Engine) run on the GPU through Ollama. It does not support macOS or Linux. Pricing: a 7-day free trial with every feature and no card; a one-time $29 licence, not a subscription; people who pre-registered before the February 2027 launch get a 3-month trial. Public launch: February 2027; pre-registration is open at streamerosai.com/download.`;

// The site moved to its own domain and this list did not follow it, so every
// request from streamerosai.com was blocked by the browser: the widget showed
// its typing dots for two seconds and then nothing, because the preflight came
// back without an allow-origin header. The github.io address is kept — it still
// serves the site — and localhost:3000 is local Next.js dev.
app.use(
  '*',
  cors({
    origin: [
      'https://streamerosai.com',
      'https://www.streamerosai.com',
      'https://yaseenyk.github.io',
      'http://localhost:3000',
    ],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
  }),
);

app.get('/', (c) => c.json({ status: 'ok', service: 'streameros-chatbot' }));

// Pull the plain text out of the most recent user message, tolerating both the
// legacy { content: string } shape and the v6 useChat { parts: [...] } shape.
function lastUserText(messages: UIMessage[]): string {
  const last = [...messages].reverse().find((m) => m.role === 'user');
  if (!last) return '';
  const anyMsg = last as unknown as {
    content?: string;
    parts?: Array<{ type: string; text?: string }>;
  };
  if (typeof anyMsg.content === 'string') return anyMsg.content;
  if (Array.isArray(anyMsg.parts)) {
    return anyMsg.parts.filter((p) => p.type === 'text').map((p) => p.text ?? '').join(' ');
  }
  return '';
}

/** The last user message, prefixed by the one before it when the last is short. */
function retrievalQuery(messages: UIMessage[]): string {
  const users = messages.filter((m) => m.role === 'user');
  const last = users.length ? lastUserText([users[users.length - 1]]) : '';
  const prev = users.length > 1 ? lastUserText([users[users.length - 2]]) : '';
  return last.trim().split(/\s+/).length <= 6 && prev ? `${prev}
${last}` : last;
}

app.post('/chat', async (c) => {
  const { messages } = await c.req.json<{ messages: UIMessage[] }>();

  // On Workers, secrets live on c.env (process.env is not populated), so the
  // Google provider must be constructed with the key explicitly.
  const google = createGoogleGenerativeAI({ apiKey: c.env.GOOGLE_GENERATIVE_AI_API_KEY });
  const openai = createOpenAI({ apiKey: c.env.OPENAI_API_KEY });
  const index = new Index({
    url: c.env.UPSTASH_VECTOR_REST_URL,
    token: c.env.UPSTASH_VECTOR_REST_TOKEN,
  });

  // Embedding stays on Gemini and must: the Upstash index was built with
  // gemini-embedding-001 at 768 dimensions, and a vector from any other model
  // is not comparable to those. Swapping this to OpenAI silently returns
  // nonsense chunks until the whole knowledge base is re-ingested.
  // Retrieval is allowed to fail without taking the request with it. The
  // Upstash free-tier index has disappeared twice — a deleted database answers
  // with an empty 404 body, the client tries to JSON.parse nothing, and the
  // whole route threw a 500 that reached the widget as a silent dead end.
  let context = '';
  let retrievalFailed = false;
  try {
    // Embed the question together with the previous user turn, so a
    // follow-up like "what is it?" retrieves what "it" referred to.
    const { embedding } = await embed({
      model: google.textEmbeddingModel('gemini-embedding-001'),
      value: retrievalQuery(messages),
      providerOptions: { google: { outputDimensionality: 768 } },
    });

    const hits = await index.query({
      vector: embedding,
      topK: 5,
      includeMetadata: true,
    });

    context = hits
      .map((h) => h.metadata?.text)
      .filter(Boolean)
      .join('\n\n---\n\n');
  } catch (err) {
    retrievalFailed = true;
    console.error('retrieval failed', err instanceof Error ? err.message : err);
  }

  const retrievalNote = retrievalFailed
    ? '\n\nNOTE: the knowledge-base lookup failed for this request. Answer only from the core facts; for anything else, say the detailed knowledge base is temporarily unavailable and suggest trying again shortly or contacting streamerOS support.'
    : '';

  const system = `You are the streamerOS Tier-1 Support Agent, a friendly and concise customer support assistant for streamerOS.

Answer the user's question using ONLY the context provided below. The context is drawn from the official streamerOS knowledge base.

Rules:
- Be helpful, friendly, and concise.
- Base your answer strictly on the provided context. Do not invent features, requirements, or steps.
- If neither the core facts nor the context contain the answer, say you don't have that information and suggest contacting streamerOS support, rather than guessing.
- A question about what streamerOS is, what it runs on, what it costs, or when it launches is answered from the core facts.
- When the context lists steps, present them as clear, ordered steps.

Core facts (always true, use freely):
${CORE_FACTS}

Context from the knowledge base:
${context}${retrievalNote}`;

  // When retrieval is down (the embedding API rate-limits, or the Upstash
  // free-tier index vanishes again), still answer from the core facts and say
  // that detailed lookups are unavailable — rather than refusing everything,
  // including "what is streamerOS?". The prompt forbids guessing, so an
  // answer outside the core facts still comes back as "I don't have that".

  const result = streamText({
    model: openai('gpt-5.5'),
    system,
    messages: await convertToModelMessages(messages),
  });

  // v6 renamed toDataStreamResponse() -> toUIMessageStreamResponse(); this is the
  // format @ai-sdk/react's useChat consumes on the client (Phase 3).
  return result.toUIMessageStreamResponse();
});

export default app;
