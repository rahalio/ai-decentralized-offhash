'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { ErrorBox, PrimaryButton, SecondaryButton } from '@/components/ui';

export default function LoginPage() {
  const { signInWithApiKey, signInWithPassword } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<'password' | 'apiKey'>('apiKey');
  const [apiKey, setApiKey] = useState('offhash_demo_local_dev_key');
  const [email, setEmail] = useState('admin@demo.local');
  const [password, setPassword] = useState('sandbox-admin-8');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === 'apiKey') await signInWithApiKey(apiKey.trim());
      else await signInWithPassword(email.trim(), password);
      router.replace('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="block-grid w-full max-w-md rounded-md border border-steel-700 bg-steel-900/90 p-8 shadow-2xl">
        <div className="mb-6 flex items-center gap-3">
          <KeyRound className="h-8 w-8 text-brand" />
          <div>
            <div className="font-display text-xl font-semibold text-brand">Offhash</div>
            <p className="text-sm text-steel">Keep personal data off the ledger</p>
          </div>
        </div>
        <div className="mb-4 flex gap-2">
          <SecondaryButton
            type="button"
            onClick={() => setMode('apiKey')}
            className={mode === 'apiKey' ? 'border-assay text-assay' : ''}
          >
            API key
          </SecondaryButton>
          <SecondaryButton
            type="button"
            onClick={() => setMode('password')}
            className={mode === 'password' ? 'border-assay text-assay' : ''}
          >
            Operator
          </SecondaryButton>
        </div>
        {error ? <ErrorBox message={error} /> : null}
        <form onSubmit={onSubmit} className="space-y-3">
          {mode === 'apiKey' ? (
            <label className="block text-sm">
              <span className="text-steel">X-API-Key</span>
              <input
                className="mt-1 w-full rounded-md border border-steel-700 bg-ink-950 px-3 py-2 font-mono text-sm"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </label>
          ) : (
            <>
              <label className="block text-sm">
                <span className="text-steel">Email</span>
                <input
                  className="mt-1 w-full rounded-md border border-steel-700 bg-ink-950 px-3 py-2 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="block text-sm">
                <span className="text-steel">Password</span>
                <input
                  type="password"
                  className="mt-1 w-full rounded-md border border-steel-700 bg-ink-950 px-3 py-2 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </>
          )}
          <PrimaryButton type="submit" disabled={busy} className="w-full">
            {busy ? 'Signing in…' : 'Enter console'}
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
