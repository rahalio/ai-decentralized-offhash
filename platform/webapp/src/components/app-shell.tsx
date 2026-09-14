'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import clsx from 'clsx';
import { KeyRound, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

const NAV = [
  { href: '/', label: 'Architect home' },
  { href: '/policies', label: 'Fabric policies' },
  { href: '/scans', label: 'Proposal scans' },
  { href: '/anti-patterns', label: 'Anti-patterns' },
  { href: '/hashes', label: 'Hash registry' },
  { href: '/erasures', label: 'Erasures' },
  { href: '/endorsement', label: 'Endorsement health' },
  { href: '/config-certs', label: 'Config certs' },
  { href: '/reporting', label: 'Reporting' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, ready, signOut } = useAuth();
  const isLogin = pathname === '/login';

  useEffect(() => {
    if (!ready || isLogin) return;
    if (!session) router.replace('/login');
  }, [ready, session, isLogin, router]);

  if (isLogin) return <>{children}</>;
  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-steel">
        Loading console…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-950 text-ink">
      <header className="border-b border-steel-700 bg-steel-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-baseline gap-3">
            <Link href="/" className="font-display text-xl tracking-tight text-brand">
              Offhash
            </Link>
            <span className="hidden text-xs text-steel sm:inline">
              Keep personal data off the ledger
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-steel">
            {session?.mode === 'apiKey' ? (
              <span className="inline-flex items-center gap-1">
                <KeyRound className="h-3.5 w-3.5" /> Peer / API key
              </span>
            ) : (
              <span>{session?.displayName || session?.email || 'Operator'}</span>
            )}
            <button
              type="button"
              onClick={() => {
                signOut();
                router.push('/login');
              }}
              className="inline-flex items-center gap-1 rounded border border-steel-700 px-2 py-1 hover:border-assay hover:text-ink"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        <nav className="hidden w-52 shrink-0 flex-col gap-1 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'rounded px-3 py-2 text-sm transition',
                  active
                    ? 'bg-steel-700/60 text-ink'
                    : 'text-steel hover:bg-steel-900 hover:text-ink'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
