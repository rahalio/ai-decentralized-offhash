'use client';

import type { ReactNode } from 'react';
import { Panel, StatusPill } from '@/components/ui';

const CITATIONS: Record<string, { ticket: string; title: string; body: string }> = {
  private_data_collection: {
    ticket: 'FAB-1151',
    title: 'Private data collections',
    body: 'Private writesets persist like blockchain storage and cannot be deleted except via blockToLive. Offhash never treats PDC as silently compliant.',
  },
  encrypt_on_chain: {
    ticket: 'Encrypt-on-chain',
    title: 'Encrypt on-chain',
    body: 'Encrypted ledger bytes remain pseudonymous PD. Unproven for Article 17; any exception must be a time-boxed risk acceptance.',
  },
  client_cert_pd: {
    ticket: 'Client cert PD',
    title: 'Subject-bound client certificates',
    body: 'Enrollment certs bound to a data subject can embed PD in every block. Replace with org-level or ZK-derived credentials.',
  },
};

export function AntiPatternCitationCard({
  patternType,
  fabricReference,
  children,
}: {
  patternType: string;
  fabricReference?: string;
  children?: ReactNode;
}) {
  const copy = CITATIONS[patternType] ?? {
    ticket: fabricReference || patternType,
    title: patternType.replace(/_/g, ' '),
    body: 'Documented Fabric PD anti-pattern — remediate or accept residual risk with an expiry.',
  };

  return (
    <Panel>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <StatusPill tone="amber">{fabricReference || copy.ticket}</StatusPill>
        <h3 className="font-display text-sm text-ink">{copy.title}</h3>
      </div>
      <p className="text-sm text-steel">{copy.body}</p>
      {children}
    </Panel>
  );
}
