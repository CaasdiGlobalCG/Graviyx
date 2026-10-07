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
