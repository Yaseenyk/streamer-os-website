# streamerOS — Marketing Site

The marketing website for **streamerOS**, the ultra-lightweight desktop
cockpit for live streamers. A high-performance, statically-exported site.

> This repository is the marketing site only. The streamerOS desktop
> application lives in a separate repository.

## Tech stack

- **Next.js** — App Router, configured for static export
- **Tailwind CSS**
- **Framer Motion** — hero & scroll animations
- **Lucide React** — icons

## Local development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

Before the contact form will work, create a `.env.local` from `.env.example`
and set `NEXT_PUBLIC_FORM_ENDPOINT` (see **Environment variables** below).

## Build

```bash
npm run build
```

Because `next.config.ts` sets `output: 'export'`, `next build` emits a fully
static site into `./out` — plain HTML, CSS, and JS, with no Node server at
runtime.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Yes — for the contact form | URL the contact form POSTs to, e.g. a Formspree or Web3Forms endpoint. |

The `NEXT_PUBLIC_` prefix means the value is **inlined into the client bundle
at build time**. A static export has no server to read it at runtime, so it
must be set **before** `next build` runs — changing it requires a rebuild.

## Deployment to Vercel

This project is a **static export** (`output: 'export'` in `next.config.ts`):
the build produces a static `out/` directory with no serverless functions or
Node runtime.

1. Import the repository into Vercel — it auto-detects Next.js.
2. In **Project Settings → Environment Variables**, add
   `NEXT_PUBLIC_FORM_ENDPOINT`. Set it **before the first build**, since the
   value is baked into the static bundle at build time (a later change needs a
   redeploy).
3. Deploy. Vercel runs `next build` and serves the static output.

The contact form submits directly from the browser to the external
`NEXT_PUBLIC_FORM_ENDPOINT` service — no backend or serverless function is
required.
