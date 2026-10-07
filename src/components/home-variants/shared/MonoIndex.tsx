// ============================================================
// FILE: MonoIndex.tsx
// PURPOSE: The brand caption index — "01", "02", "03" — in mono, uppercase, +22% tracking.
// CONNECTS TO: src/styles.css (--font-mono, --tracking-caption). Used by LedgerRow and
//          the shared-language variants.
// ============================================================

/**
 * Renders a brand-caption index number.
 *
 * @param props.n - A number (zero-padded to two digits) or a pre-formatted string.
 * @param props.className - Extra classes, merged onto the span.
 *
 * @connects src/styles.css (--font-mono, --tracking-caption)
 */
export function MonoIndex({ n, className = "" }: { n: number | string; className?: string }) {
  return (
    <span
      className={`font-mono text-[11px] leading-none tracking-[0.22em] text-steel-50 ${className}`}
    >
      {typeof n === "number" ? String(n).padStart(2, "0") : n}
    </span>
  );
}
