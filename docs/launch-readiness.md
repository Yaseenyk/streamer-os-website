# Launch readiness — streamerOS, November 2026

Written 2026-09-09. Roughly eight weeks to launch.

Everything outstanding, who owns it, and what has a lead time long enough to
matter. Ordered by what actually blocks revenue, not by effort.

---

## 1. Blockers — nothing else matters until these clear

### 1.1 There is no way to pay you · **owner: Yaseen** · urgent

Every purchase path is dead:

| surface | target | state |
| --- | --- | --- |
| App "Buy a Licence" | `streameros.app/pricing` | did not resolve — **fixed 2026-09-09**, unpushed on `feat/v32-cockpit-pillar-c` |
| Site "Buy a Licence" | `streameros.gumroad.com/l/supporter` | **404** — product does not exist |
| Site "Download" | `github.com/streamerOS/streamerOS/releases/latest` | **404** — org is not yours (`Yaseenyk`) |

Create the $29 product and send the URL; it goes in `config/site.ts`
(`supporterCheckoutUrl`, `downloadUrl`).

**Recommendation: Lemon Squeezy or Paddle over Gumroad.** Both are merchants of
record, so they handle global VAT/GST on your behalf from India, and both ship a
licence-key API that maps directly onto the existing `ActivationScreen` — that is
your licensing backend without building one.

### 1.2 Code signing · **owner: Yaseen** · 1–3 week lead time, start now

`src-tauri/tauri.conf.json` has no `certificateThumbprint` or `signingIdentity`.
The minisign key under `plugins.updater` is for update verification and is not
the same thing.

An unsigned NSIS installer triggers **"Windows protected your PC"** from
SmartScreen. Most people stop there, and for a product whose pitch is that
nothing leaves your machine, a malware warning on first run is close to fatal.

* **OV certificate** — cheaper, still has to build reputation before warnings stop
* **EV certificate** — instant SmartScreen trust, more expensive, hardware token

Either way identity verification takes 1–3 weeks. This is the item most likely
to slip the launch date, and it is invisible until you try to install on a clean
machine.

### 1.3 The 1.8% CPU claim is not yet validated · **owner: Yaseen**

`README_v1_GA_BLOCKER.md` records a hard-hold, and `BENCHMARK_PROTOCOL.md`
defines the figure as measurable on an RTX 3060 under Cyberpunk 2077 at 1080p60
— a capture that has not been run.

That number is now on the homepage, every feature page and 39 blog posts,
described as measured. It is the differentiator the entire positioning rests on.
Run the capture. If it holds, it is proof for Show HN; if it does not, changing
one number now is far cheaper than a Reddit thread doing it for you.

**Also confirm the GA hold itself is stale.** It was raised on 2026-05-13 over
`whisper-rs-sys` failing to build. The 2026-05-21 re-scope moved
`compliance-asr` to v1.1, which should make the hold moot — but nothing says so
in writing.

### 1.4 Nobody has used it · **owner: Yaseen**

Zero users, zero testimonials, zero reviews. A $29 product from an unknown
developer with no social proof converts badly regardless of copy.

**Get 20–50 beta testers before November.** Start with the 10 pre-registrants,
then r/obs and streaming Discords — "free beta, local-first, want feedback" is a
welcome post in a way that "check out my product" is not. What it buys:
testimonials for the pricing page, bugs found by people who are not you, and
reviews ready on day one rather than week six.

### 1.5 The three-month key has no delivery mechanism · **owner: Yaseen**

"Pre-register and your trial is 3 months instead of 7 days" is now promised on
36 pages. Confirm the licence system can issue a 90-day key, or that someone
sends them manually in November. Right now this is a promise with no fulfilment
path behind it.

---

## 2. High value, not blocking

### 2.1 Screenshots and a demo video · **owner: Yaseen**

Six slots are wired and waiting. The component checks for the file at build time
and renders nothing until it exists — drop a PNG in, rebuild, it appears. No
code change needed.

```
public/screenshots/dashboard.png       -> /features/performance
public/screenshots/auto-director.png   -> /features/auto-hype, /features/obs-bridge
public/screenshots/viral-moments.png   -> /features/viral-moments
public/screenshots/media-kit.png       -> /features/media-kit
public/screenshots/aura.png            -> /features/aura-studio
```

Then a **60–90 second silent demo video**: chat spikes, the scene cuts itself,
the media kit PDF generates. Product Hunt and Reddit are visual feeds, and a
desktop cockpit with no moving picture does not convert.

### 2.2 Reddit and Discord presence · **owner: Yaseen** · start now, weekly

The only channel that can reach anyone before November. SEO cannot — the domain
is DR 0 at position 23, and today's content is a 2027 asset.

Eight weeks of answering questions in r/obs, r/Twitch and r/streaming, then one
launch post. Drafts and the what-not-to-do list are in `launch-copy.md`.

### 2.3 Analytics goals · **owner: either**

Plausible is installed but pre-register submissions are not tracked as a goal.
Without it there is no conversion rate, and no way to tell whether the new CTA
worked.

---

## 3. Content — done, and what is left

### Done 2026-09-09

* Pricing corrected sitewide to the real model: 7-day trial, $29 once, not a
  subscription. It previously advertised "free forever" against a product that
  locks after seven days.
* The 3-months-free offer now leads the CTA on 30 blog posts, the pricing block,
  the homepage, the download page and the signup modal. It existed and was
  written nowhere.
* 13 product-doc posts consolidated into 6 written for the query rather than the
  feature; all old URLs redirect. A redirect mechanism was built for this, since
  the site had none.
* 28 titles and descriptions rewritten to fit inside Google's truncation limits.
* 3 developer-audience posts retitled toward the streamer benefit.
* 4 posts and the Clip Library page labelled with what is v1.0 versus v1.1.
* 2 comparison posts written — Streamlabs alternative, and what stream tools
  upload — the highest-intent keywords on the site, previously uncovered.
* Feature pages answer the technical questions the chosen audience asks, from
  the product's own architecture.
* Launch copy for Product Hunt, Show HN, Reddit and the email list.

Blog is now **39 posts, all marketing-usable**. It was 44 with 16 that only
someone who already knew the product could find.

### Available on request

* **Lead magnets per cluster.** The CTA is the same everywhere. An OBS settings
  checklist on the OBS posts and a media kit template on the sponsorship posts
  would convert several times better — each needs the asset built.
* **A comparison page** at `/vs/streamlabs` or similar. The blog post exists;
  a dedicated page converts harder for that query.
* **Deepening the remaining feature pages** with the same treatment as
  performance, zero-cloud, auto-hype and viral-moments.

### Deliberately not done

**Five feature blog posts.** They would compete with the six guides just
consolidated — a post on Auto-Director against `auto-switch-obs-scenes-guide`,
one on sentiment against `how-to-read-chat-sentiment-in-real-time`. That splits
the authority the consolidation just gathered. Features belong on `/features/*`,
which is where evaluation happens; the blog is for acquisition.

---

## 4. Ordering, if time is short

1. Checkout that works — nobody can pay today
2. Code signing — longest lead time, blocks installs
3. Beta testers — the only source of proof
4. Validate the benchmark — the claim is load-bearing
5. Screenshots and demo video
6. Reddit and Discord, weekly from now
7. Everything in section 3

Items 1–4 are all yours and three of them have lead times that make November
tight. Content was the least urgent thing on this list, which is fine — it is
finished.
