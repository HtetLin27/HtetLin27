# DESIGN.md — Portfolio redesign

Reference spec for the redesign of `htetlinko.com`. Source of truth for the design language, interactions, and page structure. Update this file when decisions change; don't re-derive them from code.

---

## Vision in one paragraph

A dark, cinematic, editorial portfolio for Htet Lin Ko — Senior Frontend at Better HR, ex-network engineer. Awwwards-adjacent motion (GSAP-driven scroll, SVG path draws, horizontal scroll reel, shared-element route transitions), but the copy and structure lead. No badge walls, no percentage skill bars, no "Hi I'm ___" openers. The site should feel *authored*, not generated.

---

## Stack

- **Framework:** Next.js 15, App Router, TypeScript
- **Styling:** Tailwind CSS
- **Motion:** GSAP + ScrollTrigger (scroll timelines, pinning, SVG path draws), Framer Motion (route transitions, `layoutId` shared elements, gesture UI)
- **Smooth scroll:** Lenis
- **Type utilities:** SplitType (for character/word/line splitting used in scramble + stagger reveals)
- **Fonts:** Instrument Serif (display), Inter (body), Geist Mono (labels/numbers) — all self-hosted via `next/font`

---

## Design system

### Palette

| Token | Value | Use |
|---|---|---|
| `bg` | `#FCF9EC` | Page background. Bright warm ivory — milk-white with a whisper of cream. |
| `bone` | `#0B0B0C` | Primary text, headings, mark stroke. Near-black. (Token name predates light-mode pivot — it is no longer literally bone-colored.) |
| `muted` | `#6B665C` | Secondary text, meta, dim state. Warm dusty grey — reads soft on milk. |
| `ink` | `#050505` | Contrast blocks, dividers. Deepest tone for punch. |

**Site is light.** The original dark cinematic pass has been flipped to a milk-paper editorial pass. Marks that used to be light bone on dark are now dark ink on milk — the compositional logic is the same, only the value is inverted.

**Grain overlay:** SVG noise (`feTurbulence`), fixed position, `mix-blend-mode: multiply`, ~6% opacity. Present sitewide. Adds printed-paper texture on light bg; keeps the "not-flat-digital" feel.

### Typography

| Family | Role | Sizes (fluid) |
|---|---|---|
| Instrument Serif | Display, pull quotes, project numbers, hero name | 4rem → 20rem depending on context |
| Inter | Body copy | 1rem–1.125rem body, 0.9rem meta |
| Geist Mono | Labels, project counters, tickers, timestamps | 0.75rem–0.85rem, tracked +0.05em, uppercase for labels |

Rules:
- Italic display type is used **only** for emotional beats (hero tagline hits, `available` word on contact, pull-quotes inside case studies). Never for section labels.
- No `font-weight` heavier than 400 for the serif — Instrument Serif is a single-weight face.
- Mono is always uppercase for section labels, mixed-case for meta and tickers.

### Motion primitives

- **Ease:** Default `power3.out` for reveals, `power4.inOut` for transitions, `none` (linear) for scroll-scrubbed animations.
- **Reveal stagger:** 40ms per glyph, 60ms per word, 80ms per line.
- **Scroll scrub:** `scrub: 1` (1s smoothing) for most timelines — feels weighted, not twitchy.
- **Reduced motion:** All GSAP timelines wrapped in a `prefers-reduced-motion` check. Fallback: no scrubbing, instant reveals, no horizontal scroll (reel becomes vertical stack).

### Custom cursor

Small bone circle (`8px`), lags the pointer by ~120ms (Lenis-adjacent easing). On hover of interactive elements: expands to a `56px` bone disk with a mono label ("VIEW", "OPEN", "SCROLL", etc.) filling in. Hidden entirely on touch devices.

---

## The mark

A **node-and-edge constellation** — 3 dots connected by thin lines forming an asymmetric mark. Reads as "connection" / "system" without being literal (no icons of routers or servers). Callback to the network-engineering past, delivered abstractly.

Behavior:
- **Hero:** Center-stage, ~30vw wide, draws in stroke-by-stroke over ~1.2s on load.
- **Post-hero:** Shrinks and translates to bottom-left corner (`24px` inset, `48px` wide). Persists across all scroll sections as a fixed thread.
- **Rotation:** As you traverse the horizontal work reel, the mark rotates ±8° tied to horizontal scroll progress. Small, deliberate.
- **Panel 03 accent:** A larger copy peeks half-cropped from the right edge, static.
- **Route change:** Fades but the corner mark persists across `/` and `/work/[slug]` — it's a fixed element outside the route outlet.

**To design (not yet decided):** the specific geometry. Deliverable: 3 SVG options for review.

---

## Page architecture

### `/` — Home

Single-page vertical scroll. Sections in order:

#### 1. Hero (100vh)
- Layout: centered mark, name below, tagline below that. Corners: `HLK / 2026` (top-left), `YANGON · UTC+6:30 [live clock]` (top-right). Bottom: `SCROLL ↓` in mono.
- Load sequence: mark draws → name letters stagger up (40ms glyph, 20px rise, opacity 0→1) → tagline scrambles in on the last 4 words only.
- Tagline draft: *"Frontend engineer. Ex-network engineer. Building real products for real teams."*

#### 2. About (~70vh)
- Two-column, left = masked SVG (the mark used as `clipPath` mask, revealing a subtle textured fill behind it), right = three short paragraphs.
- Paragraph 1: network engineer → software arc.
- Paragraph 2: what you do at Better HR (concrete products).
- Paragraph 3: what you're studying (system design, full-stack).
- Each paragraph has its own ScrollTrigger, opacity + `y: 20 → 0`.
- No heading. The first sentence is the entry point.

#### 3. Work reel — the anchor section (400vw, pinned)

Vertically pinned. Horizontal container translates left as vertical scroll progresses (`ScrollTrigger.pin` + `scrub`). Four panels, each 100vw. Text-only — **no screenshots in the reel**. Each panel has a distinct composition:

| # | Project | Composition |
|---|---|---|
| 01 | Better HR ATS | Giant `01` in serif, cropped top/bottom. Content mid-right. Bottom ticker of concrete numbers. |
| 02 | Performance Appraisal | Flipped: content left, `02` right. Thin SVG diagram of review flow draws in mid-panel. |
| 03 | Job Platform | `03` tiny in top corner. Center: giant serif italic pull-quote. Mark peeks from right edge. |
| 04 | Developer Monitoring Platform | Editorial statement across full panel: *"Not a client project. / A system I built to think in systems."* `04` tiny. |
| 05 | Endcap | Bone slab: `SEE ALL WORK →`. Hover to release the pin and resume vertical scroll. |

Persistent UI within the reel:
- 1px bone progress bar at bottom, tied to horizontal progress
- `0X / 04` counter, top-left, updates on panel enter
- Mark bottom-left, rotates ±8° tied to progress

Interactions:
- Panel number scrambles on enter (mono digits shuffle for ~400ms then settle)
- Panel title hover: 1px underline slides in from left
- Panel click → shared-element transition to `/work/[slug]` (see Transitions)

#### 4. Skills — the SVG path (~120vh)

A single 1px bone stroke path draws itself across the viewport as you scroll, connecting labeled nodes. Reads as a schematic.

- Nodes: `React` `Next.js` `Vue` `Nuxt` `TypeScript` `Tailwind` `GraphQL` `Node` `Prisma` `PostgreSQL`
- Node visual: small bone circle (`6px`), label in mono to the side
- Path: hand-designed SVG, animated via `stroke-dashoffset` tied to scroll progress
- Section label above (small mono): `SYSTEM · TECHNOLOGIES`
- **Explicitly not included:** proficiency bars, years-of-experience numbers, star ratings

#### 5. Contact (100vh)

- Center: single giant word in Instrument Serif italic — *available*.
- Below: three mono links (email, GitHub, LinkedIn). Hover slides a 1px underline in from the left.
- Bottom: live UTC+6:30 clock, mark bottom-left. No form, no CTA button, no exclamation marks.

---

### `/work/[slug]` — Case study

One per project, 4 total at launch, all written to full depth.

#### 1. Header (100vh)
- Giant project number (`01`) — this is the shared-element target from the reel panel.
- Project name in serif.
- Meta line in mono: role · timeframe · context (e.g., `SENIOR FRONTEND · 2023–PRESENT · BETTER HR`).

#### 2. Context slab (~80vh)
Two columns. Left header: *"The problem."* Right: 3–4 short paragraphs of prose. No sub-headings inside — editorial pacing.

#### 3. Work grid (variable height)
A vertical rhythm of full-bleed panels. **Rule: no two adjacent panels are the same type.** Types:

- **Pull-quote panel** (100vh) — one idea in huge serif italic
- **Screenshot panel** — tight-cropped to one interaction, bone frame, subtle drop shadow, grain preserved. Not a raw dashboard on a white card.
- **Diagram panel** — one hand-drawn-feeling SVG per case study (permissions matrix, pipeline flow, system schematic). This is the one custom visual per project.
- **Numbers panel** — concrete metrics as giant mono type (e.g., `48 pipeline stages · 9 role permissions · 12 email templates`)

Sequence per case study is designed individually — no template.

#### 4. Reflection (~60vh)
One short paragraph. What you'd change, what you learned. Recruiters and peers both actually read this section; missing it makes the case study feel shallow.

#### 5. Next project (~40vh)
Bottom-right, huge serif link: `NEXT → 02 / PERFORMANCE APPRAISAL`. Clicking triggers shared-element transition to the next case study's header.

---

## Transitions

### Global

- **Lenis smooth scroll** sitewide. Disabled for `prefers-reduced-motion`.
- **Route change base:** page fades and translates `y: 8px` on exit; incoming page reverses. 400ms.

### Reel panel → case study (shared element)

The signature transition:

1. User clicks a reel panel.
2. The giant project number (e.g., `01`) is a Framer Motion `layoutId` element.
3. Rest of the reel fades out. The case study header slides in from below.
4. The number continuously resizes and repositions from its reel spot (mid-right, ~40vw tall) to the case study header spot (top-left, ~24vw tall). No cut, no separate animation — one continuous element crossing the route change.
5. Duration: 700ms `power4.inOut`.

Reversed on back navigation.

Same mechanism between adjacent case studies via `NEXT →` link — the current case study's number continues into the next slug's header (both use `layoutId="project-number-0X"`).

### Scroll patterns

- **Section transitions:** No hard boundaries. Sections flow into each other via shared scroll timelines. Skills path starts drawing before the reel fully exits.
- **First-visit hero:** Loader is a 1s bone bar filling left-to-right at the top of the viewport, then the mark draw begins. Total time-to-interactive target: <2s on 4G.

---

## Content model

Content lives in `content/` as MDX or TypeScript objects — decide during scaffolding.

Per project (needed for reel + case study):

```ts
{
  slug: 'better-hr-ats',
  number: '01',
  name: 'Applicant Tracking System',
  client: 'Better HR',
  role: 'Senior Frontend',
  timeframe: '2023–present',
  reelPullQuote?: string, // for panels that use pull-quotes (Panel 03 style)
  reelMetrics?: string[], // for panels with tickers (Panel 01 style)
  editorialStatement?: string, // for Panel 04 style
  problem: string, // 3–4 paragraphs
  workPanels: WorkPanel[], // sequence of pull-quote / screenshot / diagram / numbers
  reflection: string, // one paragraph
  next: { slug: string, name: string, number: string }
}
```

---

## Open questions

Not blocking, but note for later:

- **Mark geometry:** 3 SVG options to be sketched.
- **Screenshot treatment specifics:** duotone or grayscale? Same treatment across all projects, or per-project accent? Currently leaning grayscale + grain, no color tint.
- **Panel 04 imagery:** since the Monitoring Platform is your side project, is the reel treatment enough or does it deserve a small teaser visual there?
- **`SEE ALL WORK →` endcap:** does it link to `/work` (an index page) or is the endcap purely a scroll release? If an index, we need to design it.
- **Case study screenshots:** how many exist that can be shown without NDA issues for Better HR products?
- **Blog / writing:** not in scope for v1 but should the site architecture leave room for `/writing` later?
