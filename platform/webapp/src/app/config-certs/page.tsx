'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { apiFetch, idempotencyKey } from '@/lib/api';
import { useAuth } from '@/contexts/auth-context';
import {
  DataTable,
  ErrorBox,
  PageHeader,
  Panel,
  PrimaryButton,
  StatusPill,
  fieldClass,
} from '@/components/ui';

const DEMO_NETWORK_ID = 'net_01HZYXK8J0M0W5N6P7Q8R9S0T1V2';

type ConfigCertReview = {
  reviewId: string;
  networkId: string;
  scheduledAt: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'overdue' | string;
  subjectBoundCertCount: number;
  notes?: string;
};

function errMessage(err: unknown) {
  return err instanceof Error ? err.message : 'Request failed';
}

function reviewTone(status: string): 'assay' | 'amber' | 'coral' | 'steel' {
  if (status === 'completed') return 'assay';
  if (status === 'overdue') return 'amber';
  if (status === 'in_progress') return 'amber';
  return 'steel';
}

function defaultSchedule() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().slice(0, 16);
}

export default function ConfigCertsPage() {
  const { ready, session } = useAuth();
  const [items, setItems] = useState<ConfigCertReview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [networkId, setNetworkId] = useState(DEMO_NETWORK_ID);
  const [scheduledAt, setScheduledAt] = useState(defaultSchedule);
  const [notes, setNotes] = useState('Quarterly config-block certificate review');
  const [subjectBoundCertCount, setSubjectBoundCertCount] = useState(0);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await apiFetch<{ data?: { items?: ConfigCertReview[] } }>('/v1/config-cert-reviews');
      setItems(res.data?.items ?? []);
    } catch (err) {
      setError(errMessage(err));
    }
  }, []);

  useEffect(() => {
    if (!ready || !session) return;
    void load();
  }, [ready, session, load]);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await apiFetch('/v1/config-cert-reviews', {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey() },
        body: JSON.stringify({
          networkId,
          scheduledAt: new Date(scheduledAt).toISOString(),
          notes,
        }),
      });
      await load();
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function onComplete(reviewId: string) {
    setBusy(true);
    setError(null);
    try {
      await apiFetch(`/v1/config-cert-reviews/${reviewId}/complete`, {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey() },
        body: JSON.stringify({
          subjectBoundCertCount,
          notes,
        }),
      });
      await load();
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setBusy(false);
    }
  }

  const overdue = items.some((r) => r.status === 'overdue');

  return (
    <div>
      <PageHeader
        title="Config cert reviews"
        subtitle="Config blocks also carry certificates. Schedule reviews outside the endorsement hot path."
      />
      {overdue ? (
        <div className="mb-4 rounded-md border border-amber bg-amber/15 px-3 py-2 text-sm text-amber">
          A config cert review is overdue — subject-bound enrollment certs may still be PD.
        </div>
      ) : null}
      {error ? <ErrorBox message={error} /> : null}
      <Panel className="mb-6">
        <h2 className="mb-3 text-sm font-medium text-ink">Schedule review</h2>
        <form onSubmit={onCreate} className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-steel">Network id</span>
            <input className={fieldClass} value={networkId} onChange={(e) => setNetworkId(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="text-steel">Scheduled at</span>
            <input
              type="datetime-local"
              className={fieldClass}
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
            />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="text-steel">Notes</span>
            <input className={fieldClass} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>
          <div className="sm:col-span-2">
            <PrimaryButton type="submit" disabled={busy}>
              {busy ? 'Scheduling…' : 'Schedule review'}
            </PrimaryButton>
          </div>
        </form>
      </Panel>
      <Panel className="mb-6">
        <label className="block max-w-xs text-sm">
          <span className="text-steel">Subject-bound cert count (on complete)</span>
          <input
            type="number"
            min={0}
            className={fieldClass}
            value={subjectBoundCertCount}
            onChange={(e) => setSubjectBoundCertCount(Number(e.target.value))}
          />
        </label>
      </Panel>
      <DataTable
        columns={['Review', 'Network', 'Scheduled', 'Subject-bound', 'Status', '']}
        empty="No reviews scheduled."
        rows={items.map((row) => [
          <span key="id" className="font-mono text-xs">
            {row.reviewId}
          </span>,
          <span key="n" className="font-mono text-xs">
            {row.networkId}
          </span>,
          row.scheduledAt,
          String(row.subjectBoundCertCount),
          <StatusPill key="s" tone={reviewTone(row.status)}>
            {row.status}
          </StatusPill>,
          row.status === 'completed' ? (
            '—'
          ) : (
            <PrimaryButton
              key="c"
              type="button"
              disabled={busy}
              onClick={() => void onComplete(row.reviewId)}
            >
              Complete
            </PrimaryButton>
          ),
        ])}
      />
    </div>
  );
}
