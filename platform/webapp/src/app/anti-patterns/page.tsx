'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { apiFetch, idempotencyKey } from '@/lib/api';
import { useAuth } from '@/contexts/auth-context';
import {
  DataTable,
  ErrorBox,
  PageHeader,
  PrimaryButton,
  StatusPill,
  fieldClass,
} from '@/components/ui';
import { AntiPatternCitationCard } from '@/components/anti-pattern-citation-card';

type AntiPatternFlag = {
  flagId: string;
  patternType: string;
  fabricReference?: string;
  proposalRef?: string;
  compliant: boolean;
  riskAccepted: boolean;
  riskAcceptanceExpiresAt?: string;
  createdAt: string;
};

function errMessage(err: unknown) {
  return err instanceof Error ? err.message : 'Request failed';
}

function plusDaysIso(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export default function AntiPatternsPage() {
  const { ready, session } = useAuth();
  const [items, setItems] = useState<AntiPatternFlag[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('Time-boxed exception pending remediation.');
  const [expiresAt, setExpiresAt] = useState(plusDaysIso(30).slice(0, 10));

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await apiFetch<{ data?: { items?: AntiPatternFlag[] } }>('/v1/anti-patterns');
      setItems(res.data?.items ?? []);
    } catch (err) {
      setError(errMessage(err));
    }
  }, []);

  useEffect(() => {
    if (!ready || !session) return;
    void load();
  }, [ready, session, load]);

  async function onAccept(e: FormEvent, flagId: string) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await apiFetch(`/v1/anti-patterns/${flagId}/accept-risk`, {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey() },
        body: JSON.stringify({
          expiresAt: `${expiresAt}T23:59:59.000Z`,
          note,
        }),
      });
      await load();
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Anti-pattern catalog"
        subtitle="PDC (FAB-1151) and encrypt-on-chain are flagged, never silently allowed."
      />
      {error ? <ErrorBox message={error} /> : null}
      {!items.length ? (
        <p className="mb-6 text-sm text-steel">Healthy — no anti-patterns flagged.</p>
      ) : (
        <div className="mb-6 grid gap-3 lg:grid-cols-2">
          {items.map((flag) => (
            <AntiPatternCitationCard
              key={flag.flagId}
              patternType={flag.patternType}
              fabricReference={flag.fabricReference}
            >
              <form className="mt-3 flex flex-wrap items-end gap-2" onSubmit={(e) => void onAccept(e, flag.flagId)}>
                <label className="block text-sm">
                  <span className="text-steel">Expires</span>
                  <input
                    type="date"
                    className={fieldClass}
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                  />
                </label>
                <label className="min-w-[12rem] flex-1 text-sm">
                  <span className="text-steel">Note</span>
                  <input className={fieldClass} value={note} onChange={(e) => setNote(e.target.value)} />
                </label>
                <PrimaryButton type="submit" disabled={busy || flag.riskAccepted}>
                  {flag.riskAccepted ? 'Accepted' : 'Accept risk'}
                </PrimaryButton>
              </form>
            </AntiPatternCitationCard>
          ))}
        </div>
      )}
      <DataTable
        columns={['Flag', 'Type', 'Citation', 'Compliant', 'Risk']}
        empty="No anti-pattern flags."
        rows={items.map((flag) => [
          <span key="id" className="font-mono text-xs">
            {flag.flagId}
          </span>,
          flag.patternType,
          flag.fabricReference || '—',
          <StatusPill key="c" tone={flag.compliant ? 'assay' : 'coral'}>
            {flag.compliant ? 'yes' : 'open'}
          </StatusPill>,
          flag.riskAccepted ? (
            <StatusPill key="r" tone="amber">
              until {flag.riskAcceptanceExpiresAt?.slice(0, 10) || 'expiry'}
            </StatusPill>
          ) : (
            '—'
          ),
        ])}
      />
    </div>
  );
}
