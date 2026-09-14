import clsx from 'clsx';
import type { ReactNode } from 'react';

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 max-w-2xl text-sm text-steel">{subtitle}</p>
        ) : null}
      </div>
      {actions}
    </div>
  );
}

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'rounded-md border border-steel-700 bg-steel-900/80 p-4 shadow-sm',
        className
      )}
    >
      {children}
    </div>
  );
}

export function StatusPill({
  tone,
  children,
}: {
  tone: 'assay' | 'amber' | 'coral' | 'steel';
  children: ReactNode;
}) {
  const tones = {
    assay: 'bg-assay/15 text-assay',
    amber: 'bg-amber/15 text-amber',
    coral: 'bg-coral/15 text-coral',
    steel: 'bg-white/5 text-steel',
  };
  return (
    <span
      className={clsx(
        'inline-flex rounded-sm px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide',
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

export function PrimaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className={clsx(
        'rounded-md bg-assay px-3 py-2 text-sm font-medium text-ink-950 transition hover:bg-brand disabled:opacity-50',
        props.className
      )}
    />
  );
}

export function SecondaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className={clsx(
        'rounded-md border border-steel-700 bg-transparent px-3 py-2 text-sm text-ink hover:bg-white/5 disabled:opacity-50',
        props.className
      )}
    />
  );
}

export function DataTable({
  columns,
  rows,
  empty,
}: {
  columns: string[];
  rows: ReactNode[][];
  empty?: string;
}) {
  if (!rows.length) {
    return (
      <div className="rounded-md border border-dashed border-steel-700 px-4 py-8 text-center text-sm text-steel">
        {empty ?? 'No rows'}
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-md border border-steel-700">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-steel">
          <tr>
            {columns.map((c) => (
              <th key={c} className="px-3 py-2 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-steel-700">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 align-top text-ink/90">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div className="mb-4 rounded-md border border-coral/40 bg-coral/10 px-3 py-2 text-sm text-coral">
      {message}
    </div>
  );
}

export function FailClosedBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="mb-4 rounded-md border border-coral bg-coral/15 px-3 py-2 text-sm text-coral"
    >
      {message}
    </div>
  );
}

export const fieldClass =
  'mt-1 w-full rounded-md border border-steel-700 bg-ink-950 px-3 py-2 font-mono text-sm text-ink placeholder:text-steel/60';
