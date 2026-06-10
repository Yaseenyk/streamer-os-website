import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { embed, streamText, convertToModelMessages, type UIMessage } from 'ai';
import { Index } from '@upstash/vector';

// Secrets/bindings are injected by Wrangler at runtime (set via `wrangler secret`
// in production, or a local `.dev.vars` file for `wrangler dev`).
export interface Env {
  GOOGLE_GENERATIVE_AI_API_KEY: string;
  UPSTASH_VECTOR_REST_URL: string;
  UPSTASH_VECTOR_REST_TOKEN: string;
}

const app = new Hono<{ Bindings: Env }>();

// The site is served from GitHub Pages under a subpath, but the CORS origin is
// the bare scheme+host. localhost:3000 is allowed for local Next.js dev.
app.use(
  '*',
  cors({
    origin: ['https://yaseenyk.github.io', 'http://localhost:3000'],
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
  const index = new Index({
    url: c.env.UPSTASH_VECTOR_REST_URL,
    token: c.env.UPSTASH_VECTOR_REST_TOKEN,
  });

  // Embed the latest user turn with the SAME model + dimension used at ingest
  // time (gemini-embedding-001 @ 768) so the vectors are comparable.
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
    model: google('gemini-flash-lite-latest'),
    system,
    messages: await convertToModelMessages(messages),
  });

  // v6 renamed toDataStreamResponse() -> toUIMessageStreamResponse(); this is the
  // format @ai-sdk/react's useChat consumes on the client (Phase 3).
  return result.toUIMessageStreamResponse();
});

export default app;
