# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

Portfolio site for Htet Lin Ko (`htetlinko.com`). Dark, cinematic, editorial. Next.js App Router app that will replace the current portfolio at that domain.

The repo also still ships the GitHub profile README at `README.md` — GitHub renders it on the owner's profile page at https://github.com/HtetLin27. Leave that file's structure alone unless the user asks to reorganize it.

**Read `DESIGN.md` before touching UI code.** It is the source of truth for palette, typography, motion primitives, section-by-section layout, interactions, transitions, and the content model. Do not re-derive design decisions from scratch — update `DESIGN.md` when they change.

## Commands

- `pnpm dev` — Next.js dev server with Turbopack (default in Next 16)
- `pnpm build` — production build
- `pnpm start` — serve production build
- `pnpm add <pkg>` — add a runtime dep (pnpm, not npm)

There is no ESLint config in the scaffold; if you add lint, add it as a first-class task rather than silently expanding scope.

## Stack notes

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS v4** — configured entirely via `@theme` in `app/globals.css`. There is no `tailwind.config.ts`. Color tokens (`bg`, `bone`, `muted`, `ink`) become utility classes automatically (`bg-bg`, `text-bone`, etc.).
- **Fonts** wired via `next/font/google` in `app/layout.tsx`. Three families: Instrument Serif (display), Inter (body), Geist Mono (labels/numbers). Exposed as CSS vars via the `@theme` block: `font-serif`, `font-sans`, `font-mono`.
- **Motion:** `gsap` (+ ScrollTrigger, imported at use-site) for scroll timelines and SVG path draws. `motion` (successor package to `framer-motion`, import from `motion/react`) for layout/shared-element transitions and gestures.
- **Smooth scroll:** `lenis`, initialized in `components/LenisProvider.tsx` (client component wrapping the body in `layout.tsx`). Respects `prefers-reduced-motion`.
- **Text splitting:** `split-type` for glyph/word/line splitting used in reveals and scramble effects.

## Architecture

- `app/` — routes. `/` is the single-page home (hero → about → work reel → skills → contact). `/work/[slug]` will host the case studies (not yet built).
- `components/` — shared components. `LenisProvider` and `GrainOverlay` are mounted in `app/layout.tsx` so grain and smooth scroll are sitewide. `YangonClock` is a client component that renders the live UTC+6:30 time.
- `app/globals.css` — Tailwind entry + design tokens. Single-mode (currently milk-light after the pivot from dark); no theme toggle. Do not add `@media (prefers-color-scheme)` rules.

## Design invariants (from `DESIGN.md`)

Keep these in mind — violating them makes the site drift toward "AI-generated portfolio":

- Palette is exactly four tokens: `#FCF9EC bg` (bright warm ivory) · `#0B0B0C bone` (near-black text/marks) · `#6B665C muted` (warm dusty grey) · `#050505 ink` (deepest contrast blocks). No greys added, no accent colors. Grain overlay ~6% at `mix-blend: multiply` sitewide adds print-paper texture. Note: token names predate the light-mode pivot — `bone` is now the primary text/mark color, not literally bone-cream.
- No badge walls. No `%` skill bars. No years-of-experience numbers. Skills render as an editorial ledger (grouped rows: category label in mono, tech names in serif) — not a grid of logos.
- Instrument Serif is single-weight 400; italic is used for emotional beats only (hero tagline hit words, `available` on contact, pull-quotes). Never for section labels.
- Mono is uppercase + tracked (`+0.14em`) for section labels; mixed-case for meta and tickers.
- Live clock (`components/YangonClock.tsx`) is intentional — it signals the site is *on*, not shipped and forgotten. Keep it.
