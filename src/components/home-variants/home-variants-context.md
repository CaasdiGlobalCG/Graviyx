# Home Variants — Context

## What This Feature Does

Holds five competing design directions for the GRAVIYX home page so the direction can be chosen
before it is rolled across the other eighteen pages. Each variant renders the **complete** v2.0 Home
content, so the only variable is design.

This directory is **temporary**. At adoption the winner is ported into `src/routes/index.tsx`, its
components are promoted to `src/components/home/`, and everything here is deleted.

## How It Connects

- **Depends on:** `src/styles.css` (the brand token layer — the only place tokens are defined),
  `public/brand/*` (logo assets), `motion/react`.
- **Used by:** the five preview routes `src/routes/home-variant-{a1,a2,b,c,d}.tsx`. Nothing else.
- **Reads from:** `@/components/site/IndustryChips` (`INDUSTRIES`) and `@/components/site/types` (`To`).
- **Does not touch:** `src/routes/index.tsx`, `src/routeTree.gen.ts`, or any page outside this feature.

## Key Files

| File | Purpose |
| --- | --- |
| `home-variants-context.md` | This file. |
| `index.ts` | Barrel — the public API of the feature. |
| `shared/home-variants.constants.ts` | **All** v2.0 Home copy plus the variant registry. Single source. |
| `shared/VariantPreviewBar.tsx` | Jump links to all five variants + a reduced-motion toggle. |
| `shared/LedgerRow.tsx` | The shared-language numbered hairline row. |
| `shared/MonoIndex.tsx` | The 01 / 02 / 03 mono caption index. |
| `shared/HairlineStack.tsx` | The shared-language hairline list. |
| `shared/SystemDiagram.tsx` | The shared "four sides, one centre" graphic. |
| `HomeVariantA1Ledger.tsx` | Shared language · document-like single column. |
| `HomeVariantA2Manifest.tsx` | Shared language · editorial grid, same components, different IA. |
| `HomeVariantBDiagonalCut.tsx` | Independent · the 65° cut as the organising device. |
| `HomeVariantCOversizedSymbol.tsx` | Independent · brand background 03, the H1 inside the G. |
| `HomeVariantDControlRoom.tsx` | Independent · instrument-panel density. |

## Data Flow

There is none. This site has **no data layer** — no `fetch`, no API calls, no endpoints. Every
variant renders static copy from `shared/home-variants.constants.ts`. There is nothing to mock and
nothing to fabricate.

## The business-logic firewall

> The live page's state, effects, handlers, API calls, validation and routing are **byte-identical**
> throughout the variant phase. Only `return` JSX and imports may change, and only at adoption.

`src/routes/index.tsx` has no state, effects, handlers, validation or routing at all — it is
`createFileRoute` plus a pure JSX component — so the firewall is trivially satisfiable. It is still
proven mechanically at adoption, against baseline commit `154db2a`.

## Design rules for every variant

1. **Consume the tokens in `src/styles.css`. Never add a new one.** The palette is
   Ink `#000000` / Paper `#FAFAF7` / Steel 90–15 / Paper 2. There is no accent colour; the brand book
   says "no decorative accents are introduced". Colour carries meaning only.
2. **Structure with hairlines**, not shadows or heavy borders.
3. **Animate `transform` and `opacity` only.** Never `height`, `width`, `top`, `left`, `margin`,
   `padding` or `background-position`.
4. **Respect `prefers-reduced-motion`.** The root route wraps the app in
   `<MotionConfig reducedMotion="user">`, which covers every `motion.*` animation. SMIL
   `<animateMotion>` is **not** covered — gate it with `useReducedMotion()`.
5. **Every variant must be fully legible and usable with animation disabled.**
6. **Never fabricate data** — no invented numbers, names, statuses or percentages.
7. **Sharp corners.** Radii are 2px. Do not reintroduce pills or circles on surfaces (dots are fine).
8. **Breakpoints are Tailwind v4 defaults** — `sm:640 md:768 lg:1024 xl:1280 2xl:1536`. The site's
   desktop nav switches at `xl:` (1280px), so treat 1024–1279 as a real layout case.
9. **Import depth:** a file directly in `home-variants/` reaches `src/` with `../../`; a file in
   `home-variants/shared/` needs `../../../`. A wrong depth still parses and only fails at transform.
   **Safer: use the `@/` alias for anything outside your own folder** and a relative import only for
   your own sibling file.

## Ink surfaces — required in every variant

Operon's brand system rations Ink: **55% Paper / 25% Cloud / 15% Ink / 05% signal**, with Ink reserved
for *"nav, footer, select heroes"*. The site was previously ~100% light, which is why it read flat.

Every variant must therefore carry **two Ink bands**:

1. **An Ink hero.** The hero section is an Ink surface. This is the strongest move and the main reason
   the variants are being rebuilt.
2. **An Ink closing.** The CLOSING section is an Ink surface.

The Footer is already Ink globally — do not add another one.

### How to build an Ink surface

Add the `surface-ink` utility to the section. It sets the background to Ink **and re-points the
semantic tokens locally**, so `eyebrow`, `lead`, `body-copy`, `panel` and `hairline` all resolve to
on-ink tones automatically. It also sets `color`, so headings **inherit Paper**.

```tsx
<section className="surface-ink section-y">
  <div className="container-x">
    <p className="eyebrow">Works — resolves to on-ink-muted</p>
    <h1 className="display-xl">Works — inherits Paper, no colour class needed</h1>
    <p className="lead">Works — resolves to on-ink-muted</p>
    <a className="btn btn-on-ink">Primary on ink</a>
    <a className="btn btn-ghost-on-ink">Secondary on ink</a>
  </div>
</section>
```

**Critical rules inside an Ink surface:**

- **Do NOT use `text-ink`, `text-fg` is fine** (`--fg` is re-pointed), but `text-ink` resolves to
  `#000000` and will vanish. Omit colour classes and let inheritance work.
- **Do NOT use `btn-primary`** — it is Ink-on-Ink and invisible. Use `btn-on-ink`.
- **Do NOT use `btn-secondary`** — use `btn-ghost-on-ink`.
- Secondary text on ink: `text-on-ink-muted` (70%) or `text-on-ink-meta` (55%).
- Hairlines on ink: `border-on-ink-rule` (14%) or `border-on-ink-rule-soft` (30%). Or just
  `border-border`, which is re-pointed.
- `bg-grid`, `bg-diagonal`, `grid-veil`, `wip-stripes` and `mark-dot` all draw with `currentColor` or
  a re-pointed `--mark`, so they work on Ink with no changes. Use them freely.

**Ink is rationed — never dominant.** Two bands per page plus the footer. Do not make the middle of
the page dark.

## Neumorphic variants (J, K) — a scoped exception

Neumorphism is made of paired soft shadows, which is the opposite of this repo's rule *"structure
with hairlines, not shadows"*. It is permitted **only** in the neumorphic variants, and it must stay
strictly monochrome. The design system already provides it:

| Utility | Use |
| --- | --- |
| `neu-canvas` | Sets a section's background to the neumorphic canvas. **Required on the parent** — see below. |
| `neu-raised` | An extruded surface. |
| `neu-flat` | A shallower extruded surface. |
| `neu-pressed` | A pressed / recessed control. |
| `neu-inset` | A recessed well. |

**The one rule that makes or breaks it:** an element's background must match its parent canvas
**exactly**, or the paired shadows read as a drop-shadowed box rather than a surface pushed out of
the page. So a section using `neu-raised` cards must itself carry `neu-canvas`. Never place a
neumorphic surface on `bg-paper` or `bg-bg`.

Other constraints:
- **No new colour.** The highlight is Paper at high alpha, the shadow is Ink at low alpha
  (`--neu-light`, `--neu-dark`, `--neu-dark-deep`). Do not introduce a hue, and do not use
  Tailwind's `shadow-*` scale — those are blue-black and will read as a different system.
- **Radius:** the neumorphic surfaces use `--neu-radius` (14px). Soft shadows on 2px corners look
  like a mistake. This is part of the same scoped exception — do not apply it to anything outside
  a neumorphic surface.
- **Accessibility is not negotiable.** Never place body text on a shaded edge, never communicate
  state through shadow alone, and always keep a visible `:focus-visible` ring. A pressed state must
  also change something other than shadow (position, weight or an explicit label) so it survives
  being printed or viewed in greyscale.
- Use the neumorphic depth for **surfaces and controls**, not for structure. Hairlines still do the
  dividing.

## Futuristic variants (L, M) — a monochrome HUD

There is no accent colour, so the futuristic read has to come from **geometry, ruled telemetry and
type at scale**, not from a glow. The system provides:

| Utility | Use |
| --- | --- |
| `hud-scanlines` | A repeating hairline sweep. |
| `hud-corners` | Corner brackets as four L-shapes — no extra elements needed. |

Both draw through the shared `--veil` / `--veil-strong` tokens, which are **re-pointed on Ink
surfaces**, so they render correctly on Paper **and** on Ink with no variant and no extra work —
the same approach as `bg-grid`, `bg-diagonal` and `grid-veil`.

Do **not** write `color-mix(in oklab, currentColor 5%, transparent)` yourself. The compiler
cannot resolve `currentColor` at build time, so it silently drops the percentage and emits a
**solid** line — which is roughly 20× heavier than intended. That is exactly the bug these tokens
exist to avoid.

- Lean on the brand caption (`eyebrow`) and `tabular-nums` for readouts; mono at scale is the
  strongest futuristic signal available without colour.
- Ink bands are the natural "screen" surfaces here — a HUD reads well on Ink.
- Everything still obeys the global rules: hairlines for structure, transform/opacity only, the
  resting state correct with animation off, and no fabricated data. A readout must carry real copy
  from the constants module — never an invented number, percentage or status.
- `hud-corners` is a `background-image`, so the element needs padding for the brackets to have room;
  do not put them on a bare text node.

## Two sections that must appear in EVERY variant, unchanged

Every variant must render these two sections, with exactly this copy and these components. They are
carried over verbatim from the live Home page (`src/routes/index.tsx:32-33`) so the variants match it.
Do not reword, restyle into something else, or substitute your own graphic.

```tsx
import { Section, SectionHead } from "@/components/site/Section";
import { IndiaCoverageMap } from "@/components/site/IndiaCoverageMap";
import { EcosystemDiagram } from "@/components/site/EcosystemDiagram";

<Section tone="surface">
  <SectionHead
    eyebrow="Where we serve"
    title="Connected across India's industrial corridors."
    lead="Our technology-enabled network coordinates demand, verified supply and fulfilment across the country's major metropolitan centres."
  />
  <IndiaCoverageMap />
</Section>

<Section tone="warm">
  <SectionHead eyebrow="The ecosystem" title="Four sides. One orchestrator." align="center" />
  <EcosystemDiagram />
  <p className="mt-6 text-center text-sm text-meta">
    Orchestrated trade, not just listed products.
  </p>
</Section>
```

Notes:

- **Exact page order — CLOSING comes last.** The two required sections go between
  THE_SYSTEM and CLOSING, so the page ends on the closing call to action rather than
  trailing off into a light section:

  ```
  HERO → PROBLEM → HOW_IT_WORKS → SPEED_AND_JUDGEMENT → TRUST → TWO_WAYS_IN
       → INDUSTRIES_SECTION → THE_SYSTEM
       → Where we serve → The ecosystem
       → CLOSING
       → VariantPreviewBar
  ```

  An earlier revision of this file said "after the v2.0 content sections", which two
  variants read as "after CLOSING". CLOSING is a CTA band and must close the page.
- `Section` and `SectionHead` are **allowed** for these two sections only. Do not use them anywhere
  else — the rest of your page is your own layout.
- `IndiaCoverageMap` and `EcosystemDiagram` are being reworked in place by the sequencer (the map's
  outline is being corrected). Import them; do not copy their internals or fork them.
- Both sections are light surfaces. Do not convert them to Ink — Ink stays rationed to your two bands.

## Important Notes

- **Copy is v2.0 (plain-language).** The live Home page still carries v1.0 wording; these variants
  are the first place the v2.0 copy appears. Do not carry v1.0 strings across.
- **`IndiaCoverageMap` is deliberately absent.** The v2.0 Home copy has no "Where we serve" section,
  so the map has no slot here. It stays in `src/components/site/` untouched. Open item D10.
- **`EcosystemDiagram` is deliberately absent.** Its job — four sides around one centre — is taken by
  `shared/SystemDiagram.tsx`, which the shared-language variants use. The independent variants may
  build their own.
- **The Marketplace button points at `/for-buyers`.** There is no `/marketplace` route. This is
  intentional and matches the live site.
- **Only Finished Goods is live.** The scope line on the hero must stay: "Live now: finished goods."
