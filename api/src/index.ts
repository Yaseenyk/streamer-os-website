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
  const { embedding } = await embed({
    model: google.textEmbeddingModel('gemini-embedding-001'),
    value: lastUserText(messages),
    providerOptions: { google: { outputDimensionality: 768 } },
  });

  const hits = await index.query({
    vector: embedding,
    topK: 3,
    includeMetadata: true,
  });

  const context = hits
    .map((h) => h.metadata?.text)
    .filter(Boolean)
    .join('\n\n---\n\n');

  const system = `You are the streamerOS Tier-1 Support Agent, a friendly and concise customer support assistant for streamerOS.

Answer the user's question using ONLY the context provided below. The context is drawn from the official streamerOS knowledge base.

Rules:
- Be helpful, friendly, and concise.
- Base your answer strictly on the provided context. Do not invent features, requirements, or steps.
- If the context does not contain the answer, say you don't have that information and suggest contacting streamerOS support, rather than guessing.
- When the context lists steps, present them as clear, ordered steps.

Context:
${context}`;

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
