// ============================================================
// FILE: home-variants.constants.ts
// PURPOSE: The single source of v2.0 Home copy and the variant registry, shared by
//          all five Home variants so the comparison is fair — the only variable
//          between variants is design, never wording.
// CONNECTS TO: every HomeVariant*.tsx, shared/VariantPreviewBar.tsx,
//          @/components/site/IndustryChips (INDUSTRIES).
// ============================================================
//
// Source: "GRAVIYX — Website Content v2.0 (Plain-language edition)", section 1 (Home).
// The live page still carries v1.0 wording. These strings are the first appearance of v2.0.
//
// NOTE: the per-section motion cues from the content doc are reproduced verbatim in
// `motionCue` so each variant can honour them without re-reading the source document.

import { INDUSTRIES } from "@/components/site/IndustryChips";

export const HOME_META = {
  title: "GRAVIYX — Buy Industrial Goods from Verified Suppliers",
  description:
    "Post what you need, compare quotes from verified suppliers and track every order to delivery. One platform, one record, a specialist on your account.",
} as const;

export const HERO = {
  eyebrow: "VERIFIED B2B PROCUREMENT",
  headline: "Industrial buying, without the chase.",
  subhead:
    "Post what you need. Compare quotes from verified suppliers. Track the order to delivery. One platform, one record, one specialist on your account.",
  primaryCta: { label: "Marketplace", to: "/for-buyers" },
  secondaryCta: { label: "Post a Requirement", to: "/post-a-requirement" },
  scopeLine:
    "Live now: finished goods. MRO, industrial and commercial items from verified suppliers.",
  motionCue: "A slow-moving grid behind the headline. The headline fades in on load.",
} as const;

export const PROBLEM = {
  heading: "Sound familiar?",
  items: [
    "\u201CCan we actually trust this supplier?\u201D",
    "Three quotes. Three formats. One messy spreadsheet.",
    "Chasing updates on WhatsApp and email.",
    "No idea where the order is once the PO goes out.",
    "Every deal starts from zero.",
  ],
  closing:
    "That\u2019s not bad luck. It\u2019s how procurement works today. We built Graviyx to change it.",
  motionCue: "Each line slides in on scroll and is gently struck through as the next arrives.",
} as const;

export const HOW_IT_WORKS = {
  heading: "Post it. Compare it. Order it. Track it.",
  steps: [
    {
      key: "Post",
      body: "Tell us what you need. We turn it into a clear request.",
    },
    {
      key: "Compare",
      body: "Verified suppliers quote. You see every quote side by side.",
    },
    {
      key: "Order",
      body: "A specialist negotiates the hard lines. You approve.",
    },
    {
      key: "Track",
      body: "Follow dispatch and delivery in one shared view.",
    },
  ],
  link: { label: "See how it works", to: "/how-it-works" },
  motionCue: "The four steps light up one by one as a line travels across.",
} as const;

export const SPEED_AND_JUDGEMENT = {
  heading: "AI does the legwork. A person makes the call.",
  body: "Our AI builds shortlists, lines up quotes and flags anything unusual. A named specialist handles negotiation, tricky orders and follow-through. You get speed, and someone accountable.",
  link: { label: "See the Intelligence Layer", to: "/intelligence-layer" },
} as const;

export const TRUST = {
  heading: "Verified before they quote.",
  items: [
    "Every supplier is checked before they can receive a request.",
    "Every deal adds to their track record.",
    "Every step is logged, so you can audit it.",
  ],
  link: { label: "See how trust works", to: "/trust" },
} as const;

export const TWO_WAYS_IN = {
  heading: "Two ways in.",
  cards: [
    {
      audience: "For buyers",
      body: "Compare verified quotes side by side and follow every order to delivery.",
      to: "/for-buyers",
      cta: "For Buyers",
    },
    {
      audience: "For suppliers",
      body: "Reach buyers who are actively sourcing, with verification that builds trust for you.",
      to: "/for-suppliers",
      cta: "For Suppliers",
    },
  ],
} as const;

export const INDUSTRIES_SECTION = {
  heading: "Industries.",
  items: INDUSTRIES,
  to: "/industries",
} as const;

export const THE_SYSTEM = {
  heading: "Buyers, suppliers and logistics. One system.",
  centre: "GRAVIYX",
  sides: [
    { key: "Buyers", body: "Post requests, place orders, see live status" },
    { key: "Suppliers", body: "Verified listings, quotes, delivery commitments" },
    { key: "Logistics", body: "Shipment tracking and delivery estimates" },
    { key: "Intelligence", body: "AI and specialists: forecasts, advice and supplier scores" },
  ],
  caption: "Not a list of products. A system that runs the deal.",
  motionCue:
    "Best slot on the page: pulses travel between the four sides and the centre, so it looks live.",
} as const;

export const CLOSING = {
  heading: "Source with specification. Deliver with proof.",
  body: "Browse verified supply, or post what you need today.",
  primaryCta: { label: "Marketplace", to: "/for-buyers" },
  secondaryCta: { label: "Post a Requirement", to: "/post-a-requirement" },
} as const;

/** The six directions, in preview-bar order.
 *  A2 and E are the two kept from the earlier sets. J and K explore monochrome neumorphism
 *  (a scoped exception to the hairline rule — see src/styles.css). L and M explore a
 *  monochrome futuristic / HUD read, where the style comes from geometry, ruled telemetry
 *  and type at scale rather than from a glow colour. */
export const VARIANTS = [
  { id: "a2", slug: "home-variant-a2", label: "A2 · The Manifest", family: "shared" },
  { id: "e", slug: "home-variant-e", label: "E · Scrubbed Draw", family: "motion" },
  { id: "j", slug: "home-variant-j", label: "J · Soft Machine", family: "neumorphic" },
  { id: "k", slug: "home-variant-k", label: "K · Inset Console", family: "neumorphic" },
  { id: "l", slug: "home-variant-l", label: "L · Heads-Up Display", family: "futuristic" },
  { id: "m", slug: "home-variant-m", label: "M · Signal Wireframe", family: "futuristic" },
] as const;

export type VariantId = (typeof VARIANTS)[number]["id"];
