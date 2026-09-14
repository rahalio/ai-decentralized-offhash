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

type ErasureJob = {
  jobId: string;
  hashId: string;
  erasureReason: string;
  status: 'queued' | 'running' | 'done' | 'failed' | string;
  createdAt: string;
  errorMessage?: string;
};

type ErasureDrill = {
  drillId: string;
  networkId: string;
  result: 'pass' | 'fail' | 'pending' | string;
  notes?: string;
  createdAt: string;
};

function errMessage(err: unknown) {
  return err instanceof Error ? err.message : 'Request failed';
}

function jobTone(status: string): 'assay' | 'amber' | 'coral' | 'steel' {
  if (status === 'done') return 'assay';
  if (status === 'failed') return 'coral';
  return 'amber';
}

function drillTone(result: string): 'assay' | 'amber' | 'coral' | 'steel' {
  if (result === 'pass') return 'assay';
  if (result === 'fail') return 'coral';
  return 'amber';
}

export default function ErasuresPage() {
  const { ready, session } = useAuth();
  const [jobs, setJobs] = useState<ErasureJob[]>([]);
  const [drills, setDrills] = useState<ErasureDrill[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [hashId, setHashId] = useState('');
  const [erasureReason, setErasureReason] = useState('Article 17 erasure request');
  const [networkId, setNetworkId] = useState(DEMO_NETWORK_ID);
  const [drillNotes, setDrillNotes] = useState('Scheduled DPIA drill');

  const load = useCallback(async () => {
    setError(null);
    try {
      const [jobRes, drillRes] = await Promise.all([
        apiFetch<{ data?: { items?: ErasureJob[] } }>('/v1/erasures'),
        apiFetch<{ data?: { items?: ErasureDrill[] } }>('/v1/erasure-drills'),
      ]);
      setJobs(jobRes.data?.items ?? []);
      setDrills(drillRes.data?.items ?? []);
    } catch (err) {
      setError(errMessage(err));
    }
  }, []);

  useEffect(() => {
    if (!ready || !session) return;
    void load();
  }, [ready, session, load]);

  async function onErase(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await apiFetch('/v1/erasures', {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey() },
        body: JSON.stringify({ hashId, erasureReason }),
      });
      await load();
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function onDrill(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await apiFetch('/v1/erasure-drills', {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey() },
        body: JSON.stringify({
          networkId,
          notes: drillNotes,
          ...(hashId ? { hashId } : {}),
        }),
      });
      await load();
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setBusy(false);
    }
  }

  const failedDrill = drills.some((d) => d.result === 'fail');

  return (
    <div>
      <PageHeader
        title="Erasures"
        subtitle="Delete off-chain PD, orphan the salted hash, then prove Article 17 with a drill."
      />
      {error ? <ErrorBox message={error} /> : null}
      {failedDrill ? (
        <div
          role="alert"
          className="mb-4 rounded-md border border-coral bg-coral/15 px-3 py-2 text-sm text-coral"
        >
          An erasure drill failed. Re-run after replica deletes complete.
        </div>
      ) : null}
      <Panel className="mb-6">
        <h2 className="mb-3 text-sm font-medium text-ink">Start erasure job</h2>
        <form onSubmit={onErase} className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-steel">Hash id</span>
            <input
              className={fieldClass}
              value={hashId}
              onChange={(e) => setHashId(e.target.value)}
              placeholder="hsh_…"
              required
            />
          </label>
          <label className="block text-sm">
            <span className="text-steel">Reason</span>
            <input
              className={fieldClass}
              value={erasureReason}
              onChange={(e) => setErasureReason(e.target.value)}
            />
          </label>
          <div className="sm:col-span-2">
            <PrimaryButton type="submit" disabled={busy}>
              {busy ? 'Queuing…' : 'Run erasure'}
            </PrimaryButton>
          </div>
        </form>
      </Panel>
      <DataTable
        columns={['Job', 'Hash', 'Reason', 'Status']}
        empty="No erasure jobs."
        rows={jobs.map((job) => [
          <span key="id" className="font-mono text-xs">
            {job.jobId}
          </span>,
          <span key="h" className="font-mono text-xs">
            {job.hashId}
          </span>,
          job.erasureReason,
          <StatusPill key="s" tone={jobTone(job.status)}>
            {job.status}
          </StatusPill>,
        ])}
      />
      <Panel className="my-6">
        <h2 className="mb-3 text-sm font-medium text-ink">Erasure drills</h2>
        <form onSubmit={onDrill} className="mb-4 grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-steel">Network id</span>
            <input className={fieldClass} value={networkId} onChange={(e) => setNetworkId(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="text-steel">Notes</span>
            <input className={fieldClass} value={drillNotes} onChange={(e) => setDrillNotes(e.target.value)} />
          </label>
          <div className="sm:col-span-2">
            <PrimaryButton type="submit" disabled={busy}>
              {busy ? 'Starting…' : 'Start drill'}
            </PrimaryButton>
          </div>
        </form>
        <DataTable
          columns={['Drill', 'Network', 'Result', 'Created']}
          empty="No drills yet — run one for DPIA evidence."
          rows={drills.map((d) => [
            <span key="id" className="font-mono text-xs">
              {d.drillId}
            </span>,
            <span key="n" className="font-mono text-xs">
              {d.networkId}
            </span>,
            <StatusPill key="r" tone={drillTone(d.result)}>
              {d.result}
            </StatusPill>,
            d.createdAt,
          ])}
        />
      </Panel>
    </div>
  );
}
