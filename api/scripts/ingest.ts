import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import dotenv from 'dotenv';
import { embedMany } from 'ai';
import { google } from '@ai-sdk/google';
import { Index } from '@upstash/vector';

// Load Upstash + Gemini secrets from the Wrangler dev secrets file. Run this
// script from the `api/` directory so the relative paths below resolve.
dotenv.config({ path: '.dev.vars' });

const KB_PATH = resolve(process.cwd(), '../docs/knowledge-base.md');

async function main() {
  const raw = readFileSync(KB_PATH, 'utf-8');

  // Split on each H2 (`## `) and H3 (`### `) heading so every chunk keeps its
  // own heading as context for retrieval. The lookahead preserves the heading
  // at the start of the chunk it introduces.
  const chunks = raw
    .split(/\n(?=#{2,3}\s)/)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0);

  console.log(`Parsed ${chunks.length} chunks from ${KB_PATH}`);

  // gemini-embedding-001 defaults to 3072 dims; force 768 to match the Upstash
  // index (text-embedding-004 was retired from the v1beta API).
  const { embeddings } = await embedMany({
    model: google.textEmbeddingModel('gemini-embedding-001'),
    values: chunks,
    providerOptions: { google: { outputDimensionality: 768 } },
  });

  const vectors = chunks.map((text, i) => ({
    id: `kb-${i}`,
    vector: embeddings[i],
    metadata: { text },
  }));

  const index = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL!,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
  });

  await index.upsert(vectors);

  console.log(`Upserted ${vectors.length} vectors to Upstash Vector.`);
}

main().catch((err) => {
  console.error('Ingestion failed:', err);
  process.exit(1);
});
