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

type FabricPolicy = {
  policyId: string;
  networkId: string;
  channelId: string;
  fabricVersion: string;
  failClosed: boolean;
  saltRequired?: boolean;
  status: 'draft' | 'published' | 'archived' | string;
  createdAt: string;
};

function errMessage(err: unknown) {
  return err instanceof Error ? err.message : 'Request failed';
}

function statusTone(status: string): 'assay' | 'amber' | 'coral' | 'steel' {
  if (status === 'published') return 'assay';
  if (status === 'archived') return 'amber';
  return 'steel';
}

export default function PoliciesPage() {
  const { ready, session } = useAuth();
  const [items, setItems] = useState<FabricPolicy[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [networkId, setNetworkId] = useState(DEMO_NETWORK_ID);
  const [channelId, setChannelId] = useState('mychannel');
  const [fabricVersion, setFabricVersion] = useState('2.5');

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await apiFetch<{ data?: { items?: FabricPolicy[] } }>('/v1/policies');
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
      await apiFetch(
        '/v1/policies',
        {
          method: 'POST',
          headers: { 'Idempotency-Key': idempotencyKey() },
          body: JSON.stringify({
            networkId,
            channelId,
            fabricVersion,
            failClosed: true,
          }),
        }
      );
      await load();
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function onPublish(policyId: string) {
    setBusy(true);
    setError(null);
    try {
      await apiFetch(`/v1/policies/${policyId}/publish`, {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey() },
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
        title="Fabric policies"
        subtitle="Version PD enforcement against Fabric release. Unpublished drafts cannot attach to the endorsement plugin."
      />
      {error ? <ErrorBox message={error} /> : null}
      <Panel className="mb-6">
        <h2 className="mb-3 text-sm font-medium text-ink">Create draft</h2>
        <form onSubmit={onCreate} className="grid gap-3 sm:grid-cols-3">
          <label className="block text-sm">
            <span className="text-steel">Network id</span>
            <input className={fieldClass} value={networkId} onChange={(e) => setNetworkId(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="text-steel">Channel</span>
            <input className={fieldClass} value={channelId} onChange={(e) => setChannelId(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="text-steel">Fabric version</span>
            <input
              className={fieldClass}
              value={fabricVersion}
              onChange={(e) => setFabricVersion(e.target.value)}
              placeholder="2.5"
            />
          </label>
          <div className="sm:col-span-3">
            <PrimaryButton type="submit" disabled={busy}>
              {busy ? 'Saving…' : 'Create fail-closed policy'}
            </PrimaryButton>
          </div>
        </form>
      </Panel>
      <DataTable
        columns={['Policy', 'Network / channel', 'Fabric', 'Fail-closed', 'Status', '']}
        empty="No policies yet — create a draft for your Fabric version."
        rows={items.map((p) => [
          <span key="id" className="font-mono text-xs">
            {p.policyId}
          </span>,
          <span key="net" className="font-mono text-xs">
            {p.networkId} / {p.channelId}
          </span>,
          p.fabricVersion,
          p.failClosed ? 'yes' : 'no',
          <StatusPill key="st" tone={statusTone(p.status)}>
            {p.status}
          </StatusPill>,
          p.status === 'draft' ? (
            <PrimaryButton
              key="pub"
              type="button"
              disabled={busy}
              onClick={() => void onPublish(p.policyId)}
            >
              Publish
            </PrimaryButton>
          ) : (
            '—'
          ),
        ])}
      />
    </div>
  );
}
