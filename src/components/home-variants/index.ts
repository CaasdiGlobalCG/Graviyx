// ============================================================
// FILE: index.ts
// PURPOSE: Public API for the Home variants feature. Preview routes import from here,
//          never from the internal files.
// CONNECTS TO: the five HomeVariant*.tsx files and shared/VariantPreviewBar.tsx.
// ============================================================

export { HomeVariantA1Ledger } from "./HomeVariantA1Ledger";
export { HomeVariantA2Manifest } from "./HomeVariantA2Manifest";
export { HomeVariantBDiagonalCut } from "./HomeVariantBDiagonalCut";
export { HomeVariantCOversizedSymbol } from "./HomeVariantCOversizedSymbol";
export { HomeVariantDControlRoom } from "./HomeVariantDControlRoom";
export { VariantPreviewBar } from "./shared/VariantPreviewBar";
