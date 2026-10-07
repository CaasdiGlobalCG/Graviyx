// ============================================================
// FILE: index.ts
// PURPOSE: Public API for the Home variants feature. Preview routes import from here,
//          never from the internal files.
// CONNECTS TO: the seven HomeVariant*.tsx files and shared/VariantPreviewBar.tsx.
// ============================================================

export { HomeVariantA1Ledger } from "./HomeVariantA1Ledger";
export { HomeVariantA2Manifest } from "./HomeVariantA2Manifest";
export { HomeVariantEScrubDraw } from "./HomeVariantEScrubDraw";
export { HomeVariantFPinnedRail } from "./HomeVariantFPinnedRail";
export { HomeVariantGSpotlight } from "./HomeVariantGSpotlight";
export { HomeVariantHMarquee } from "./HomeVariantHMarquee";
export { HomeVariantIFloatShadow } from "./HomeVariantIFloatShadow";
export { VariantPreviewBar } from "./shared/VariantPreviewBar";
