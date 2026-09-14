'use client';

export function RemediationHintRow({ hint }: { hint: string }) {
  return (
    <div className="flex gap-2 border-b border-steel-700 py-2 last:border-0">
      <span className="shrink-0 font-mono text-assay">→</span>
      <p className="font-mono text-xs text-ink">{hint}</p>
    </div>
  );
}
