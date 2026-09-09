# Product screenshots

Real captures of streamerOS, not mockups. Taken from the product repo running in
**simulation mode** (`npm run dev:sim` in `streamerOS/`), which swaps every IPC
surface for an in-memory mock so the whole UI runs in a plain browser with no
Rust, no Tauri, no OBS and no Ollama.

`components/Screenshot.tsx` renders a file only if it exists, so an empty slot
costs nothing — drop a PNG in, rebuild, and the section appears.

## What is here

| filename            | shows                                                    | used on |
| ------------------- | -------------------------------------------------------- | ------- |
| `dashboard.png`     | The cockpit mid-stream — chat triage, super chats, sentiment, scene switcher | homepage, /features, /features/performance |
| `auto-director.png` | The node canvas: chat-velocity trigger → logic → scene switch | /features, /features/auto-hype |
| `viral-moments.png` | Velocity monitor with messages/sec, baseline and heat ratio | /features, /features/viral-moments |
| `sponsor-crm.png`   | Sponsor pipeline board with stages and open-pipeline total | /features, /features/sponsor-crm |
| `obs-bridge.png`    | OBS connection + the stream deck, live scene highlighted   | /features/obs-bridge |
| `clip-library.png`  | Local recordings ranked by hype score                      | /features/clip-library |
| `chat-archive.png`  | Saved stream chat, searchable, held locally                | /features/zero-cloud |
| `aura.png`          | The overlay gallery                                        | /features/aura-studio |

## Still missing

| slot              | why it is empty |
| ----------------- | ---------------- |
| `media-kit.png`   | The PDF preview renders blank in simulation mode — `@react-pdf/renderer` gets no data from the mock. Capture this from a real run, or fix `mockMediaKit` to return a populated report. |

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
