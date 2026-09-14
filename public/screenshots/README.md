# Product screenshots

Real captures of streamerOS, not mockups. Taken from the product repo running in
**simulation mode** (`npm run dev:sim` in `streamerOS/`), which swaps every IPC
surface for an in-memory mock so the whole UI runs in a plain browser with no
Rust, no Tauri, no OBS and no Ollama.

`components/Screenshot.tsx` and `components/ScreenshotStrip.tsx` render a file
only if it exists, so an empty slot costs nothing — drop a PNG in, rebuild, and
it appears. Every slot is defined once, with its alt text, in `lib/shots.ts`.

## What is here

| filename | shows | used on |
| --- | --- | --- |
| `dashboard.png` | The cockpit mid-stream — chat triage, super chats, sentiment, scene switcher | home, /features, /features/live-cockpit, /for/indian-streamers |
| `auto-director.png` | The node canvas: chat-velocity trigger → logic → scene switch | home, /features, /features/auto-hype |
| `viral-moments.png` | Velocity monitor with messages/sec, baseline and heat ratio | /features, /features/viral-moments, /features/shorts-factory |
| `sponsor-crm.png` | Sponsor pipeline board with stages and open-pipeline total | /features, /features/sponsor-crm |
| `obs-bridge.png` | OBS connection + the stream deck, live scene highlighted | /features/obs-bridge |
| `clip-library.png` | Local recordings ranked by hype score | /features/clip-library, /features/shorts-factory |
| `chat-archive.png` | Saved stream chat, searchable, held locally | /features/chat-archive, /features/zero-cloud |
| `aura.png` | The Aura Studio overlay gallery | /features/aura-studio, /features/aura-scene |
| `panel-*.png` | Cropped cockpit widgets (triage, revenue, sentiment, top chatters, scene switcher, OBS connection, stream deck, velocity stats) | home tour and feature pages |

## Waiting for a capture (added 2026-09-11)

The slots exist in `lib/shots.ts` with **placeholder dimensions** — after
capturing, set `width`/`height` there to the file's real pixel size. The full
shot list, with what to stage on screen for each, is in
`docs/session-logs/2026-09-11.md`.

| filename | page |
| --- | --- |
| `panel-revenue-inr.png` | /features/live-cockpit, /for/indian-streamers |
| `chat-archive-session.png` | /features/chat-archive |
| `ai-sidekick.png`, `panel-ai-action.png`, `panel-creator-memory.png` | /features/ai-sidekick |
| `panel-hinglish-chat.png` | /features/ai-sidekick, /for/indian-streamers |
| `viral-engine.png`, `panel-thumbnail-lab.png` | /features/viral-engine |
| `aura-scene.png` | /features/aura-scene |
| `shorts-factory.png` | /features/shorts-factory |
| `brand-guard.png` | /features/brand-guard |
| `media-kit.png` | /features/media-kit, /features/brand-guard — the PDF preview renders blank in simulation mode (`@react-pdf/renderer` gets no data from the mock); capture from a real run or populate `mockMediaKit` |

## Re-capturing

The cockpit's Chat Triage listens for the Rust `chat-message-received` **event**.
Simulation mode mocks the `invoke` command surface but not the event channel, so
`listen()` rejects in a browser and chat stays empty. To capture a populated
cockpit, install a small `window.__TAURI_INTERNALS__` shim before app scripts run
(it only needs `transformCallback` plus an `invoke` that answers
`plugin:event|listen`), then dispatch `chat-message-received` payloads.

Guidance that matters more than resolution:

- **Real data beats clean data.** A dashboard with a live spike on it sells; an
  empty one does not. Do not ship a screen showing "No chat yet".
- **Crop to the feature.** Trim dead space and any developer annotations.
- **1600px wide is plenty.** Anything larger is bytes nobody sees.
- **Keep alt text specific.** Describe what is on screen, not the product pitch.
