// ============================================================
// FILE: index.ts
// PURPOSE: Public API for the Home variants feature. Preview routes import from here,
//          never from the internal files.
// CONNECTS TO: the six HomeVariant*.tsx files and shared/VariantPreviewBar.tsx.
// ============================================================

export { HomeVariantA2Manifest } from "./HomeVariantA2Manifest";
export { HomeVariantEScrubDraw } from "./HomeVariantEScrubDraw";
export { HomeVariantJSoftMachine } from "./HomeVariantJSoftMachine";
export { HomeVariantKInsetConsole } from "./HomeVariantKInsetConsole";
export { HomeVariantLFuturisticHud } from "./HomeVariantLFuturisticHud";
export { HomeVariantMFuturisticWireframe } from "./HomeVariantMFuturisticWireframe";
export { VariantPreviewBar } from "./shared/VariantPreviewBar";
