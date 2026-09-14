'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/contexts/auth-context';
import { ErrorBox, PageHeader, Panel, StatusPill } from '@/components/ui';
import { FailClosedBanner } from '@/components/fail-closed-banner';
import { FabricFieldHeatmap } from '@/components/fabric-field-heatmap';

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

function errMessage(err: unknown) {
  return err instanceof Error ? err.message : 'Request failed';
}

function Kpi({
  label,
  value,
  tone,
  hint,
}: {
  label: string;
  value: string | number;
  tone: 'assay' | 'amber' | 'coral' | 'steel';
  hint: string;
}) {
  return (
    <Panel>
      <div className="text-xs uppercase tracking-wide text-steel">{label}</div>
      <div className="mt-2 font-display text-3xl text-ink">{value}</div>
      <div className="mt-2">
        <StatusPill tone={tone}>{hint}</StatusPill>
      </div>
    </Panel>
  );
}

export default function HomePage() {
  const { ready, session } = useAuth();
  const [report, setReport] = useState<ComplianceReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await apiFetch<{ data?: ComplianceReport }>('/v1/reports/compliance?period=last_30d');
      setReport(res.data ?? null);
    } catch (err) {
      setReport(null);
      setError(errMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!ready || !session) return;
    void load();
  }, [ready, session, load]);

  const empty = !loading && !error && !report;

  return (
    <div>
      <PageHeader
        title="Architect home"
        subtitle="Are we still writing personal data into Fabric blocks?"
        actions={
          <Link
            href="/reporting"
            className="rounded-md border border-assay/40 px-3 py-2 text-sm text-assay"
          >
            Export DPIA slice
          </Link>
        }
      />
      {error ? (
        <>
          <FailClosedBanner />
          <ErrorBox message={error} />
        </>
      ) : null}
      {loading ? <p className="mb-4 text-sm text-steel">Loading compliance…</p> : null}
      {empty ? (
        <Panel className="mb-6">
          <h2 className="font-display text-lg text-ink">First policy</h2>
          <p className="mt-1 text-sm text-steel">
            No compliance snapshot yet. Publish a Fabric-versioned PD policy so endorsement
            plugins can fail closed.
          </p>
          <Link href="/policies" className="mt-3 inline-block text-sm text-assay">
            Open Fabric policies →
          </Link>
        </Panel>
      ) : null}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi
          label="PD blocked"
          value={report ? report.proposalsBlocked : '—'}
          tone="coral"
          hint="pre-endorsement"
        />
        <Kpi
          label="PDC flags"
          value={report ? report.pdcFlags : '—'}
          tone="amber"
          hint="FAB-1151"
        />
        <Kpi
          label="Erasures completed"
          value={report ? report.erasuresCompleted : '—'}
          tone="assay"
          hint="orphan proof"
        />
        <Kpi
          label="Orphaned hashes"
          value={report ? report.orphanedHashes : '—'}
          tone="assay"
          hint="Article 17"
        />
      </div>
      {report ? (
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Panel>
            <div className="text-xs uppercase tracking-wide text-steel">Encrypt-on-chain</div>
            <div className="mt-1 font-display text-xl">{report.encryptOnChainFlags ?? 0}</div>
          </Panel>
          <Panel>
            <div className="text-xs uppercase tracking-wide text-steel">Client cert PD</div>
            <div className="mt-1 font-display text-xl">{report.clientCertPdFlags ?? 0}</div>
          </Panel>
          <Panel>
            <div className="text-xs uppercase tracking-wide text-steel">Erasure drill pass</div>
            <div className="mt-1 font-display text-xl">
              {report.erasureDrillPassRate != null
                ? `${Math.round(report.erasureDrillPassRate * 100)}%`
                : '—'}
            </div>
          </Panel>
          <Panel>
            <div className="text-xs uppercase tracking-wide text-steel">Peers quarantined</div>
            <div className="mt-1 font-display text-xl">{report.peersQuarantined ?? 0}</div>
          </Panel>
        </div>
      ) : null}
      <Panel className="mb-6">
        <h2 className="mb-2 text-sm font-medium text-ink">Fabric field surfaces</h2>
        <p className="mb-3 text-sm text-steel">
          Proposal payload, client cert, keys/values, events, and responses are the PD risk
          surfaces Offhash scans before endorsement.
        </p>
        <FabricFieldHeatmap />
      </Panel>
      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/policies" className="text-assay">
          Fabric policies
        </Link>
        <Link href="/scans" className="text-assay">
          Proposal scan desk
        </Link>
        <Link href="/anti-patterns" className="text-assay">
          Anti-pattern catalog
        </Link>
        <Link href="/reporting" className="text-assay">
          Reporting
        </Link>
      </div>
      {report?.period ? (
        <p className="mt-4 font-mono text-xs text-steel">Period {report.period}</p>
      ) : null}
    </div>
  );
}
