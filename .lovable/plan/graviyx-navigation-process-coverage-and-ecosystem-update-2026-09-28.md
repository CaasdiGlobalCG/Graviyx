# Graviyx navigation, process, coverage, and ecosystem update

## What will change
- Replace the header’s “Get Demo” action with “Marketplace,” linked to the buyer page.
- Add “Intelligence Layer” to the main navigation while keeping the mobile menu usable.
- Expand the shared platform flow to eight stages: Discovery, RFQ, PO, Fulfillment, Analytics, Forecast, Warranty, and Future Recommendations.
- Remove “Post a Requirement” from the supplier page’s opening actions.
- Replace supplier pricing content with a logistics and supply-chain section describing coordinated movement, fulfillment visibility, and delivery evidence.
- Add a homepage India coverage section with a custom animated map and markers for major metropolitan cities.
- Strengthen homepage language so Graviyx is clearly described as a tech-enabled ecosystem.
- Rebuild the ecosystem graphic using the selected orbital network direction, adapted to Graviyx’s existing black/deep-teal and neon-green visual system.

## Experience details
- Map and ecosystem graphics will use accessible SVG labels, calm continuous motion, and reduced-motion fallbacks.
- The eight-stage process will remain readable on phones and desktops without cramping.
- Existing dark styling, exact brand tokens, typography, and shared page structure will be preserved.

## Technical details
- Add focused reusable components for India coverage and supplier logistics rather than embedding complex graphics in route files.
- Keep all visuals local and CSS/SVG-driven; no map API, external data source, or backend is required.
- Verify the changed pages at mobile and desktop sizes, and resolve any build or runtime errors before completion.
