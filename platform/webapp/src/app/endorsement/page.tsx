'use client';

import { useCallback, useEffect, useState } from 'react';
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
import { FailClosedBanner } from '@/components/fail-closed-banner';

type PeerHook = {
  peerId: string;
  orgId: string;
  pluginVersion: string;
  lastHeartbeatAt?: string;
  status: 'healthy' | 'missing' | 'quarantined' | string;
  quarantineReason?: string;
};

function errMessage(err: unknown) {
  return err instanceof Error ? err.message : 'Request failed';
}

function peerTone(status: string): 'assay' | 'amber' | 'coral' | 'steel' {
  if (status === 'healthy') return 'assay';
  if (status === 'missing') return 'coral';
  if (status === 'quarantined') return 'amber';
  return 'steel';
}

export default function EndorsementPage() {
  const { ready, session } = useAuth();
  const [items, setItems] = useState<PeerHook[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [reason, setReason] = useState('Missing or stale Offhash hook — fail closed.');

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await apiFetch<{ data?: { items?: PeerHook[] } }>('/v1/endorsement/peers');
      setItems(res.data?.items ?? []);
    } catch (err) {
      setError(errMessage(err));
    }
  }, []);

  useEffect(() => {
    if (!ready || !session) return;
    void load();
  }, [ready, session, load]);

  async function onQuarantine(peerId: string) {
    setBusy(true);
    setError(null);
    try {
      await apiFetch(`/v1/endorsement/peers/${peerId}/quarantine`, {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey() },
        body: JSON.stringify({ reason }),
      });
      await load();
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setBusy(false);
    }
  }

  const missing = items.some((p) => p.status === 'missing');

  return (
    <div>
      <PageHeader
        title="Endorsement health"
        subtitle="Org × peer plugin coverage. A missing hook is a bypass — quarantine until redeployed."
      />
      {missing ? (
        <FailClosedBanner message="At least one peer is missing the Offhash endorsement hook. Policy can be bypassed until it is quarantined or restored." />
      ) : null}
      {error ? <ErrorBox message={error} /> : null}
      <Panel className="mb-6">
        <label className="block text-sm">
          <span className="text-steel">Quarantine reason</span>
          <input className={fieldClass} value={reason} onChange={(e) => setReason(e.target.value)} />
        </label>
      </Panel>
      <DataTable
        columns={['Org', 'Peer', 'Plugin', 'Heartbeat', 'Status', '']}
        empty="No peer hooks reported — endorsement coverage unknown."
        rows={items.map((peer) => [
          <span key="o" className="font-mono text-xs">
            {peer.orgId}
          </span>,
          <span key="p" className="font-mono text-xs">
            {peer.peerId}
          </span>,
          peer.pluginVersion,
          peer.lastHeartbeatAt || '—',
          <StatusPill key="s" tone={peerTone(peer.status)}>
            {peer.status}
          </StatusPill>,
          peer.status === 'quarantined' ? (
            '—'
          ) : (
            <PrimaryButton
              key="q"
              type="button"
              disabled={busy}
              onClick={() => void onQuarantine(peer.peerId)}
            >
              Quarantine
            </PrimaryButton>
          ),
        ])}
      />
    </div>
  );
}
