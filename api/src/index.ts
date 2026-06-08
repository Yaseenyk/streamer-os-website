import { Hono } from 'hono';
import { cors } from 'hono/cors';

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

// Placeholder — RAG retrieval (Upstash Vector) + Gemini streaming lands in Phase 3.
app.post('/chat', async (c) => {
  return c.json({ message: 'Chat endpoint not yet implemented.' }, 501);
});

export default app;
