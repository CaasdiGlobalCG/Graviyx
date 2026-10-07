# Home Page Context

## What This Feature Does

Renders the live Home page: the complete v2.0 Home content in the documented order, in the
adopted design direction **"Soft Machine"** — monochrome neumorphism.

## How It Connects

- **Depends on:** `src/styles.css` (the brand tokens, plus the neumorphic `neu-*` and
  `--neu-*` layer), `@/components/site/Reveal`, `@/components/site/Section` + `SectionHead`,
  `@/components/site/IndiaCoverageMap`, `@/components/site/EcosystemDiagram`,
  `@/components/site/IndustryChips` (the `INDUSTRIES` list).
- **Used by:** `src/routes/index.tsx` only.
- **API base:** none. The site has no data layer.

## Key Files

| File | Purpose |
| --- | --- |
| `home-context.md` | This file. |
| `index.ts` | Barrel — `HomePage` and `HOME_META`. The route imports from here. |
| `home-content.constants.ts` | **All** Home copy, plus the content doc's motion cues as notes. Single source. |
| `HomePage.tsx` | The section assembler: nine v2.0 sections, the coverage + ecosystem sections, then the closing. |
| `soft-machine.parts.tsx` | The neumorphic primitives — surfaces, controls, cards, the system core. |

## Data Flow

There is none. Every string comes from `home-content.constants.ts`; nothing is fetched,
derived or computed. There is nothing to mock and nothing to fabricate.

## The design direction

Chosen from six explored variants (A2 The Manifest, E Scrubbed Draw, J Soft Machine, K Inset
Console, L Heads-Up Display, M Signal Wireframe). Soft Machine was adopted.

It is the **accessible** form of neumorphism. The `ui-ux-pro-max` design database carries three
neumorphism entries and flags the classic form **"⚠ Low contrast"**, offering *"Soft UI
Evolution"* (**WCAG AA+**) as the modern form. Three things follow from that and must not be
regressed:

1. **Contrast.** A neumorphic canvas is a mid-tone — the worst background for muted grey text.
   The UX guidance is severity-High on *"don't use gray text on gray background"* and a 4.5:1
   minimum. `neu-canvas` therefore re-points `--muted` to `steel-70` (~9.4:1 on the canvas), and
   **`text-meta` (steel-30) must never appear on a neumorphic surface.**
2. **The press carries more than shadow.** `scale(0.97)` — the value the database specifies —
   plus a 1px drop and a weight change, so the state survives greyscale, print and a
   low-contrast display.
3. **`box-shadow` is never animated.** The surface class is swapped instead.

## The neumorphic contract

- **A surface's background must equal its parent canvas exactly**, or the paired shadows read as
  a drop-shadowed box rather than a surface pushed out of the page. Every section rendering a
  `neu-*` surface carries `neu-canvas`; the two Ink bands and the two carried-over sections
  deliberately do not, because they render no neumorphic surface.
- **No Tailwind `shadow-*`.** That scale is blue-black and would read as a second system.
- **Depth is for surfaces and controls.** Hairlines still do the dividing.
- **Ink stays rationed** to the hero and the closing — the two bands where neumorphism does not
  read and the page goes flat. Ink must never become dominant.

## Important Notes

- **The page alternates grounds through its middle.** Section 03, 05 and 07 are dark; 02, 04,
  06 and 08 are light; the hero is `surface-ink` and the closing is `neu-canvas-dark`:

  ```
  01 HERO              surface-ink        (flat — neumorphism does not read on Ink)
  02 Problem           neu-canvas
  03 How it works      neu-canvas-dark
  04 Speed             neu-canvas
  05 Trust             neu-canvas-dark
  06 Two ways in       neu-canvas
  07 Industries        neu-canvas-dark
  08 The system        neu-canvas
  09 Where we serve    neu-canvas        (map on a neu-raised panel)
  10 The ecosystem     neu-canvas        (diagram on a neu-raised panel)
  11 Closing           neu-canvas-dark   (CTA on a neu-raised console)
  ```

- **The coverage and ecosystem sections are neumorphic too**, so `IndiaCoverageMap` and
  `EcosystemDiagram` were neutralised: their own backgrounds were removed so the raised
  surface shows through, and the diagram's node rects fill with `var(--neu-surface)` so they
  match the canvas rather than sitting a shade lighter. Neither component's copy changed.
- **The page order ends on CLOSING.** The coverage and ecosystem sections sit between
  THE_SYSTEM and CLOSING, so the page finishes on the call to action.
- **`text-fg` on `body-copy` is redundant but harmless.** `neu-canvas` already re-points
  `--muted`, so `body-copy` alone renders dark enough. The explicit class is belt-and-braces and
  does not depend on CSS emission order.
- **The 1–11 mono indices are positional**, not data — the same convention as the other pages.
  Nothing on this page invents a number, percentage, status or name.
- **The Marketplace button points at `/for-buyers`.** There is no `/marketplace` route; this
  matches the rest of the site and is an open pre-launch item.
