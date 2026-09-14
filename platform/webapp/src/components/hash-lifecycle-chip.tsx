'use client';

import { StatusPill } from '@/components/ui';

export function HashLifecycleChip({ status }: { status: 'linked' | 'orphaned' | string }) {
  if (status === 'orphaned') {
    return <StatusPill tone="assay">orphaned</StatusPill>;
  }
  return (
    <span className="inline-flex flex-col items-start gap-0.5">
      <StatusPill tone="amber">linked</StatusPill>
      <span className="max-w-[12rem] text-[10px] leading-tight text-amber">
        Salted hashes remain pseudonymous PD until orphaned
      </span>
    </span>
  );
}
