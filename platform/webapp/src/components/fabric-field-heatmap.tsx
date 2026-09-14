'use client';

import clsx from 'clsx';

export const FABRIC_SURFACES = [
  { key: 'proposalPayload', label: 'Proposal payload' },
  { key: 'clientCertificate', label: 'Client cert' },
  { key: 'stateKeys', label: 'State keys' },
  { key: 'stateValues', label: 'State values' },
  { key: 'events', label: 'Events' },
  { key: 'chaincodeResponse', label: 'Chaincode response' },
] as const;

export type FabricSurfaceKey = (typeof FABRIC_SURFACES)[number]['key'];

export function FabricFieldHeatmap({
  hits,
  scanned = false,
}: {
  hits?: { fabricSurface?: string }[];
  scanned?: boolean;
}) {
  const counts = Object.fromEntries(
    FABRIC_SURFACES.map((s) => [s.key, 0])
  ) as Record<FabricSurfaceKey, number>;
  for (const hit of hits ?? []) {
    const key = hit.fabricSurface as FabricSurfaceKey;
    if (key in counts) counts[key] += 1;
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
      {FABRIC_SURFACES.map((surface) => {
        const n = counts[surface.key];
        const tone = n > 0 ? 'hit' : scanned ? 'clean' : 'idle';
        return (
          <div
            key={surface.key}
            className={clsx(
              'rounded-md border px-2 py-3 text-center transition duration-150 ease-out',
              tone === 'hit' && 'border-coral bg-coral/20 text-coral',
              tone === 'clean' && 'border-assay/40 bg-assay/10 text-assay',
              tone === 'idle' && 'border-steel-700 bg-steel-900 text-steel'
            )}
          >
            <div className="font-mono text-[10px] uppercase tracking-wide">{surface.label}</div>
            <div className="mt-1 font-display text-lg">
              {n > 0 ? n : scanned ? '0' : '—'}
            </div>
          </div>
        );
      })}
    </div>
  );
}
