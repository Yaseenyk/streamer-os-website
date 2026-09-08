/**
 * Engineering write-ups about streamerOS, published on the builder's site.
 *
 * These are the working notes behind the performance claims made across this
 * site — the arena allocator behind the 152 MB figure, the IPC deserialisation
 * work, the telemetry transport. Linking them is editorial, not decorative:
 * a reader who doubts "1.8% CPU" can go read how it was measured.
 */
export const BUILDER = {
  name: 'Yaseen Khatib',
  url: 'https://yaseenkhatib.streamerosai.com/',
} as const;

export interface EngineeringNote {
  title: string;
  href: string;
  blurb: string;
}

export const ENGINEERING_NOTES: EngineeringNote[] = [
  {
    title: "Everyone said 'just use Electron.' I wrote streamerOS in Rust",
    href: 'https://yaseenkhatib.streamerosai.com/blog/streameros-rust-over-electron/',
    blurb: 'Why the core is Rust and Tauri rather than a bundled browser, and what that decision actually bought.',
  },
  {
    title: 'Rust arena allocation to keep streamerOS under 152 MB for 12h',
    href: 'https://yaseenkhatib.streamerosai.com/blog/rust-arena-allocation-to-keep-streameros-under-152-mb-for-12h/',
    blurb: 'The allocation strategy behind the memory figure quoted on this site, measured across a twelve-hour session.',
  },
  {
    title: 'serde_json to simd-json in streamerOS IPC',
    href: 'https://yaseenkhatib.streamerosai.com/blog/serdejson-to-simd-json-in-streameros-ipc-hot-path-deserialization/',
    blurb: 'Hot-path deserialisation between the Rust core and the UI, and why the parser choice showed up in CPU.',
  },
  {
    title: 'Shrink streamerOS Rust binaries: opt=z, fat LTO, panic=abort',
    href: 'https://yaseenkhatib.streamerosai.com/blog/shrink-streameros-rust-binaries-optz-fat-lto-panicabort/',
    blurb: 'The build flags behind the download size, and what each one costs you in return.',
  },
  {
    title: 'WebSocket telemetry at scale',
    href: 'https://yaseenkhatib.streamerosai.com/blog/websocket-telemetry-at-scale/',
    blurb: 'What happens to the live telemetry pipe when one process stops being enough.',
  },
  {
    title: 'Real-time telemetry: why polling lies',
    href: 'https://yaseenkhatib.streamerosai.com/blog/real-time-telemetry-websockets-react/',
    blurb: 'Why the cockpit reads live rather than on an interval, and what polling hides.',
  },
];
