<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep geographic coverage and ecosystem visuals as local SVG/Motion components; they must not depend on third-party map services so the marketing site stays fast and deterministic.
- Build route metadata through `src/lib/seo.ts` so every content page consistently includes description, Open Graph, and Twitter fields.
