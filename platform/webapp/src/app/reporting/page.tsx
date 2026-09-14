'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { apiFetch, idempotencyKey } from '@/lib/api';
import { useAuth } from '@/contexts/auth-context';
import {
  ErrorBox,
  PageHeader,
  Panel,
  PrimaryButton,
  StatusPill,
  fieldClass,
} from '@/components/ui';

type ComplianceReport = {
  period: string;
  networkId?: string;
  proposalsBlocked: number;
  pdcFlags: number;
  encryptOnChainFlags?: number;
  clientCertPdFlags?: number;
  erasuresCompleted: number;
  orphanedHashes: number;
  erasureDrillPassRate?: number;
  peersQuarantined?: number;
};

type DpiaExportJob = {
  jobId: string;
  period: string;
  status: 'queued' | 'running' | 'done' | 'failed' | string;
  downloadUrl?: string;
  errorMessage?: string;
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

export default function ReportingPage() {
  const { ready, session } = useAuth();
  const [report, setReport] = useState<ComplianceReport | null>(null);
  const [job, setJob] = useState<DpiaExportJob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [period, setPeriod] = useState('last_30d');

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await apiFetch<{ data?: ComplianceReport }>(
        `/v1/reports/compliance?period=${encodeURIComponent(period)}`
      );
      setReport(res.data ?? null);
    } catch (err) {
      setError(errMessage(err));
    }
  }, [period]);

  useEffect(() => {
    if (!ready || !session) return;
    void load();
  }, [ready, session, load]);

  async function onExport(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await apiFetch<{ data?: DpiaExportJob }>('/v1/reports/dpia-export', {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey() },
        body: JSON.stringify({
          period,
          includeHashMap: true,
          includeErasureDrills: true,
          includeViolations: true,
        }),
      });
      setJob(res.data ?? null);
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Reporting"
        subtitle="Block-level PD attempts vs blocks, plus hash→store→erasure evidence for DPIA."
      />
      {error ? <ErrorBox message={error} /> : null}
      <Panel className="mb-6">
        <form onSubmit={onExport} className="flex flex-wrap items-end gap-3">
          <label className="block text-sm">
            <span className="text-steel">Period</span>
            <input className={fieldClass} value={period} onChange={(e) => setPeriod(e.target.value)} />
          </label>
          <PrimaryButton type="button" disabled={busy} onClick={() => void load()}>
            Refresh summary
          </PrimaryButton>
          <PrimaryButton type="submit" disabled={busy}>
            {busy ? 'Queuing…' : 'Generate DPIA export'}
          </PrimaryButton>
        </form>
      </Panel>
      {!report && !error ? (
        <p className="mb-6 text-sm text-steel">No scans in this period.</p>
      ) : null}
      {report ? (
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Panel>
            <div className="text-xs uppercase tracking-wide text-steel">Proposals blocked</div>
            <div className="mt-1 font-display text-2xl">{report.proposalsBlocked}</div>
          </Panel>
          <Panel>
            <div className="text-xs uppercase tracking-wide text-steel">PDC flags</div>
            <div className="mt-1 font-display text-2xl">{report.pdcFlags}</div>
          </Panel>
          <Panel>
            <div className="text-xs uppercase tracking-wide text-steel">Erasures completed</div>
            <div className="mt-1 font-display text-2xl">{report.erasuresCompleted}</div>
          </Panel>
          <Panel>
            <div className="text-xs uppercase tracking-wide text-steel">Orphaned hashes</div>
            <div className="mt-1 font-display text-2xl">{report.orphanedHashes}</div>
          </Panel>
        </div>
      ) : null}
      {job ? (
        <Panel>
          <div className="mb-2 flex items-center gap-2">
            <StatusPill tone={jobTone(job.status)}>{job.status}</StatusPill>
            <span className="font-mono text-xs text-steel">{job.jobId}</span>
          </div>
          {job.downloadUrl ? (
            <a href={job.downloadUrl} className="text-sm text-assay">
              Download pack
            </a>
          ) : (
            <p className="text-sm text-steel">Export queued for {job.period}.</p>
          )}
          {job.errorMessage ? <p className="mt-2 text-sm text-coral">{job.errorMessage}</p> : null}
        </Panel>
      ) : null}
    </div>
  );
}
