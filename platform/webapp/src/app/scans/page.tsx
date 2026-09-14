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
import { FabricFieldHeatmap } from '@/components/fabric-field-heatmap';
import { RemediationHintRow } from '@/components/remediation-hint-row';

const DEMO_NETWORK_ID = 'net_01HZYXK8J0M0W5N6P7Q8R9S0T1V2';

type PdHit = { fieldPath: string; fabricSurface: string; hint?: string };

type PdScanResult = {
  scanId: string;
  proposalRef: string;
  decision: 'allow' | 'block' | 'remediate' | string;
  endorsementAllowed: boolean;
  pdHits?: PdHit[];
  remediationHints?: string[];
  createdAt: string;
};

function errMessage(err: unknown) {
  return err instanceof Error ? err.message : 'Request failed';
}

function decisionTone(d: string): 'assay' | 'amber' | 'coral' | 'steel' {
  if (d === 'allow') return 'assay';
  if (d === 'block') return 'coral';
  if (d === 'remediate') return 'amber';
  return 'steel';
}

function splitCsv(value: string) {
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function ScansPage() {
  const { ready, session } = useAuth();
  const [items, setItems] = useState<PdScanResult[]>([]);
  const [selected, setSelected] = useState<PdScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [proposalRef, setProposalRef] = useState('sample-proposal');
  const [networkId, setNetworkId] = useState(DEMO_NETWORK_ID);
  const [channelId, setChannelId] = useState('mychannel');
  const [proposalPayload, setProposalPayload] = useState(
    '{"fcn":"createUser","args":["alice@example.com"]}'
  );
  const [clientCertificate, setClientCertificate] = useState('CN=alice@example.com,O=Org1');
  const [stateKeys, setStateKeys] = useState('user:alice@example.com');
  const [stateValues, setStateValues] = useState('{"email":"alice@example.com"}');
  const [events, setEvents] = useState('UserCreated');
  const [chaincodeResponse, setChaincodeResponse] = useState('{"ok":true}');

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await apiFetch<{ data?: { items?: PdScanResult[] } }>('/v1/scans');
      const next = res.data?.items ?? [];
      setItems(next);
      setSelected((cur) => cur ?? next[0] ?? null);
    } catch (err) {
      setError(errMessage(err));
    }
  }, []);

  useEffect(() => {
    if (!ready || !session) return;
    void load();
  }, [ready, session, load]);

  async function onScan(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await apiFetch<{ data?: PdScanResult }>('/v1/scans', {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey() },
        body: JSON.stringify({
          proposalRef,
          networkId,
          channelId,
          fields: {
            proposalPayload,
            clientCertificate,
            stateKeys: splitCsv(stateKeys),
            stateValues: splitCsv(stateValues),
            events: splitCsv(events),
            chaincodeResponse,
          },
        }),
      });
      if (res.data) setSelected(res.data);
      await load();
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setBusy(false);
    }
  }

  const hints =
    selected?.remediationHints?.length
      ? selected.remediationHints
      : (selected?.pdHits ?? [])
          .map((h) => h.hint)
          .filter((h): h is string => Boolean(h));

  return (
    <div>
      <PageHeader
        title="Proposal scan desk"
        subtitle="Pre-endorsement field scan. Hits should say which Fabric surface to move off-chain and salt."
      />
      {error ? <ErrorBox message={error} /> : null}
      <Panel className="mb-6">
        <h2 className="mb-3 text-sm font-medium text-ink">Sample proposal</h2>
        <form onSubmit={onScan} className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-steel">Proposal ref</span>
            <input className={fieldClass} value={proposalRef} onChange={(e) => setProposalRef(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="text-steel">Channel</span>
            <input className={fieldClass} value={channelId} onChange={(e) => setChannelId(e.target.value)} />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="text-steel">Network id</span>
            <input className={fieldClass} value={networkId} onChange={(e) => setNetworkId(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="text-steel">proposalPayload</span>
            <textarea
              className={fieldClass}
              rows={2}
              value={proposalPayload}
              onChange={(e) => setProposalPayload(e.target.value)}
            />
          </label>
          <label className="block text-sm">
            <span className="text-steel">clientCertificate</span>
            <input
              className={fieldClass}
              value={clientCertificate}
              onChange={(e) => setClientCertificate(e.target.value)}
            />
          </label>
          <label className="block text-sm">
            <span className="text-steel">stateKeys (comma)</span>
            <input className={fieldClass} value={stateKeys} onChange={(e) => setStateKeys(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="text-steel">stateValues (comma)</span>
            <input className={fieldClass} value={stateValues} onChange={(e) => setStateValues(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="text-steel">events (comma)</span>
            <input className={fieldClass} value={events} onChange={(e) => setEvents(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="text-steel">chaincodeResponse</span>
            <input
              className={fieldClass}
              value={chaincodeResponse}
              onChange={(e) => setChaincodeResponse(e.target.value)}
            />
          </label>
          <div className="sm:col-span-2">
            <PrimaryButton type="submit" disabled={busy}>
              {busy ? 'Scanning…' : 'Scan proposal'}
            </PrimaryButton>
          </div>
        </form>
      </Panel>
      <Panel className="mb-6">
        <h2 className="mb-3 text-sm font-medium text-ink">Field heatmap</h2>
        <FabricFieldHeatmap hits={selected?.pdHits} scanned={Boolean(selected)} />
        {selected ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <StatusPill tone={decisionTone(selected.decision)}>{selected.decision}</StatusPill>
            <span className="text-sm text-steel">
              Endorse {selected.endorsementAllowed ? 'allowed' : 'blocked'}
            </span>
          </div>
        ) : null}
        {hints.length ? (
          <div className="mt-3">
            {hints.map((hint) => (
              <RemediationHintRow key={hint} hint={hint} />
            ))}
          </div>
        ) : selected ? (
          <p className="mt-3 text-sm text-steel">No remediation hints on this scan.</p>
        ) : null}
      </Panel>
      <DataTable
        columns={['Scan', 'Proposal', 'Decision', 'Endorse', 'Hits', '']}
        empty="Paste a sample proposal and scan — empty desk until the first result."
        rows={items.map((row) => [
          <span key="id" className="font-mono text-xs">
            {row.scanId}
          </span>,
          <span key="ref" className="font-mono text-xs">
            {row.proposalRef}
          </span>,
          <StatusPill key="d" tone={decisionTone(row.decision)}>
            {row.decision}
          </StatusPill>,
          row.endorsementAllowed ? 'yes' : 'no',
          String(row.pdHits?.length ?? 0),
          <button
            key="sel"
            type="button"
            className="text-sm text-assay"
            onClick={() => setSelected(row)}
          >
            Inspect
          </button>,
        ])}
      />
    </div>
  );
}
