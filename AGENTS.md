> [!IMPORTANT]
> This repo is deployed to GitHub Pages from `main` by
> `.github/workflows/deploy.yml`. The site is a client-rendered SPA, so it builds to static
> files — there is no server to deploy.
>
> **`vite.config.ts` sets `base: "/"`** because the site is served from a custom domain at the
> root. Moving it to a project subpath without changing that value makes every asset 404.

- Keep geographic coverage and ecosystem visuals as local SVG/Motion components; they must not depend on third-party map services so the marketing site stays fast and deterministic.
- Build route metadata through `src/lib/seo.ts` so every content page consistently includes description, Open Graph, and Twitter fields.

## Verified commands

Run from the repo root. All of these have been used and confirmed in this project.

| Purpose | Command |
| --- | --- |
| Type-check | `npx tsc --noEmit` |
| Production build | `npm run build` |
| Dev server | `npm run dev` (port 8080) |
| Lint | `npx eslint <files>` |

**Clear `node_modules/.vite` before verifying** — stale-cache bugs have shipped here twice.
`git init` was already run in this directory; the nested repo is what makes the file tools work
(the parent `C:\Caasdi\.gitignore` is a whitelist that does not include this folder).

## The design system

Brand tokens live in `src/styles.css` (Tailwind v4, CSS-first — there is **no**
`tailwind.config.js`). Breakpoints are Tailwind v4 defaults: `sm:640 md:768 lg:1024 xl:1280
2xl:1536`.

**Palette — monochrome, no accent.** `#36f4a4` was removed and must not return.

| Token | Value |
| --- | --- |
| `--ink` | `#000000` |
| `--paper` | `#FAFAF7` (brand-published) |
| `--paper-2` | `#F2F2EE` |
| steel 90 / 70 / 50 / 30 / 15 | `#1c1c1a` / `#3d3d3a` / `#6b6b66` / `#9c9c97` / `#d8d8d3` |

Type: Space Grotesk (display), Inter (body), JetBrains Mono (`--font-mono`, used via `eyebrow`
and `tabular-nums`).

### Neumorphism — a scoped exception

The repo rule is *"structure with hairlines, not shadows"*. Neumorphism is made of shadows, so
it is permitted but constrained. Read `src/components/home/home-context.md` before touching it.

- `neu-canvas` (Paper-2) and `neu-canvas-dark` (steel-90) each re-point `--neu-surface`,
  `--neu-light`, `--neu-dark` and `--neu-dark-deep`. One set of surfaces works on both:
  `neu-raised`, `neu-flat`, `neu-pressed`, `neu-inset`, plus `neu-control` (button) and
  `neu-field` (input).
- **The dark canvas is a dark grey, never pure Ink** — black leaves no room for a darker
  shadow, so the effect collapses.
- **A surface's background must equal its parent canvas exactly**, or it reads as a
  drop-shadowed box. Every section rendering a `neu-*` surface must carry `neu-canvas` or
  `neu-canvas-dark`.
- **Never use Tailwind `shadow-*`.** That scale is blue-black and reads as a second system.
- **Never animate `box-shadow`** — swap the surface class instead.
- **Contrast is the failure mode.** On the light canvas `neu-canvas` re-points `--muted` to
  steel-70 (~9.4:1) and `--meta` to steel-50 (~4.7:1). steel-30 is ~2.5:1 on a mid-tone and
  fails; the token re-point also covers SVG `fill="var(--meta)"`.

### Two traps that have already bitten this repo

1. **`color-mix(in oklab, currentColor N%, transparent)` compiles to a SOLID colour.** The
   compiler cannot resolve `currentColor` at build time, so it silently drops the percentage.
   Every grid and veil was ~20× too heavy because of this. Use the `--veil` / `--veil-strong`
   tokens instead.
2. **Do not gate content behind `initial={{ opacity: 0 }}`.** `Reveal` is CSS scroll-driven
   with a visible base state for this reason — content must render with JavaScript disabled.
   Note a `pathLength: 0` draw-on leaves a `fill="none"` stroke invisible.

