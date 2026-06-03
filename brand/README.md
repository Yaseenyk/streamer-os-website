# streamerOS — “Signal” logo kit

The live-pulse logomark: a 7-bar waveform (chat velocity made visible) topped by a
broadcast pulse, in the brand gradient **#22D3EE → #A855F7** on ink **#05070A**.

```
brand/
├─ svg/
│  ├─ signal-mark.svg            ← primary mark (gradient + glow)
│  ├─ signal-mark-animated.svg   ← self-contained LOOPING animation (SMIL) — the "live signal"
│  ├─ signal-mark-mono-cyan.svg  ← single-colour cyan, no glow
│  ├─ signal-mark-white.svg      ← reversed / on-colour
│  ├─ signal-lockup.svg          ← horizontal mark + wordmark
│  ├─ signal-lockup-stacked.svg  ← vertical mark + wordmark
│  ├─ signal-icon.svg            ← app-icon squircle tile
│  └─ signal-favicon.svg         ← bold, ring-free, legible at 16px
├─ png/
│  ├─ signal-mark-512 / -1024            (transparent)
│  ├─ signal-mark-white-512             (transparent, reversed)
│  ├─ signal-icon-512 / -1024
│  ├─ apple-touch-icon-180
│  ├─ favicon-16 / -32 / -48            (transparent)
│  ├─ signal-avatar-1024               (square, branded bg — social avatar)
│  └─ og-image-1200x630                (social / link preview)
├─ background/
│  ├─ bg-hero.svg                       (scalable)
│  └─ bg-hero-1920.png
└─ react/
   └─ SignalLogo.tsx                    (drop-in component)
```

## Use the animation
`signal-mark-animated.svg` loops on its own — no JS, no video file needed:

```html
<img src="brand/svg/signal-mark-animated.svg" width="48" height="48" alt="streamerOS" />
```

It also works inline or via `<object>`. It respects nothing extra — the loop is baked in.
(For React, prefer `<SignalMarkAnimated />`, which honours `prefers-reduced-motion`.)

## Drop into the Next.js site (streameros-site)
1. Copy `react/SignalLogo.tsx` → `components/SignalLogo.tsx`.
2. Swap usages:
   - `components/Header.tsx`: replace `<Logo />` with `<SignalLogo animated />`.
   - Anywhere using `<LogoMark />`: use `<SignalMark />` (or `<SignalMarkAnimated />`).
3. Favicon / app icon: replace `app/icon.svg` with `svg/signal-favicon.svg`,
   and drop `png/apple-touch-icon-180.png` into `app/` (Next picks it up as the
   Apple touch icon). The old `app/favicon.ico` can be regenerated from
   `png/favicon-32.png` if you want a classic .ico.
4. OG image: point `openGraph.images` / the Twitter card at `png/og-image-1200x630.png`.

## Colors
| Token        | Hex       |
|--------------|-----------|
| Cyan (floor) | `#22D3EE` |
| Purple (peak)| `#A855F7` |
| Ice (pulse)  | `#67E8F9` |
| Ink (bg)     | `#05070A` |

Bars run a **bottom→top** gradient: cyan at the base, purple at the peak.

## Clear space & min size
- Keep clear space ≥ the width of one bar on all sides.
- Min mark size: 16px (use `signal-favicon.svg` below ~24px — it drops the ring
  and thickens the bars so the silhouette survives).
