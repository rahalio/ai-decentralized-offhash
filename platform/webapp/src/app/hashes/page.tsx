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
  fieldClass,
} from '@/components/ui';
import { FailClosedBanner } from '@/components/fail-closed-banner';
import { HashLifecycleChip } from '@/components/hash-lifecycle-chip';

const DEMO_NETWORK_ID = 'net_01HZYXK8J0M0W5N6P7Q8R9S0T1V2';
const DEMO_PD_RECORD_ID = 'pdr_01HZYXK8J0M0W5N6P7Q8R9S0T1V2';

type HashRecord = {
  hashId: string;
  saltedHash: string;
  offChainStoreRef: string;
  pdRecordId: string;
  status: 'linked' | 'orphaned' | string;
  networkId?: string;
  channelId?: string;
  createdAt: string;
  orphanedAt?: string;
};

function errMessage(err: unknown) {
  return err instanceof Error ? err.message : 'Request failed';
}

export default function HashesPage() {
  const { ready, session } = useAuth();
  const [items, setItems] = useState<HashRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [saltedHash, setSaltedHash] = useState('');
  const [offChainStoreRef, setOffChainStoreRef] = useState('store://pd/records/demo');
  const [pdRecordId, setPdRecordId] = useState(DEMO_PD_RECORD_ID);
  const [networkId, setNetworkId] = useState(DEMO_NETWORK_ID);
  const [channelId, setChannelId] = useState('mychannel');

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await apiFetch<{ data?: { items?: HashRecord[] } }>('/v1/hash-records');
      setItems(res.data?.items ?? []);
    } catch (err) {
      setError(errMessage(err));
    }
  }, []);

  useEffect(() => {
    if (!ready || !session) return;
    void load();
  }, [ready, session, load]);

  async function onRegister(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await apiFetch('/v1/hash-records', {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey() },
        body: JSON.stringify({
          saltedHash,
          offChainStoreRef,
          pdRecordId,
          networkId,
          channelId,
        }),
      });
      setSaltedHash('');
      await load();
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setBusy(false);
    }
  }

  const storeDown = Boolean(error && /store|unavailable|fail-?closed|503/i.test(error));

  return (
    <div>
      <PageHeader
        title="Hash registry"
        subtitle="Salted on-chain references linked to off-chain PD. Linked hashes are still pseudonymous personal data."
      />
      {storeDown ? <FailClosedBanner /> : null}
      {error ? <ErrorBox message={error} /> : null}
      <Panel className="mb-6">
        <h2 className="mb-3 text-sm font-medium text-ink">Register salted hash</h2>
        <form onSubmit={onRegister} className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm sm:col-span-2">
            <span className="text-steel">Salted hash</span>
            <input
              className={fieldClass}
              value={saltedHash}
              onChange={(e) => setSaltedHash(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm">
            <span className="text-steel">Off-chain store ref</span>
            <input
              className={fieldClass}
              value={offChainStoreRef}
              onChange={(e) => setOffChainStoreRef(e.target.value)}
            />
          </label>
          <label className="block text-sm">
            <span className="text-steel">PD record id</span>
            <input className={fieldClass} value={pdRecordId} onChange={(e) => setPdRecordId(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="text-steel">Network id</span>
            <input className={fieldClass} value={networkId} onChange={(e) => setNetworkId(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="text-steel">Channel</span>
            <input className={fieldClass} value={channelId} onChange={(e) => setChannelId(e.target.value)} />
          </label>
          <div className="sm:col-span-2">
            <PrimaryButton type="submit" disabled={busy}>
              {busy ? 'Registering…' : 'Register hash'}
            </PrimaryButton>
          </div>
        </form>
      </Panel>
      <DataTable
        columns={['Hash id', 'Salted hash', 'Store', 'PD record', 'Lifecycle']}
        empty="No hashes yet — register a salted reference after an off-chain write."
        rows={items.map((row) => [
          <span key="id" className="font-mono text-xs">
            {row.hashId}
          </span>,
          <span key="h" className="font-mono text-xs">
            {row.saltedHash.length > 24 ? `${row.saltedHash.slice(0, 24)}…` : row.saltedHash}
          </span>,
          <span key="s" className="font-mono text-xs">
            {row.offChainStoreRef}
          </span>,
          <span key="p" className="font-mono text-xs">
            {row.pdRecordId}
          </span>,
          <HashLifecycleChip key="c" status={row.status} />,
        ])}
      />
    </div>
  );
}
