'use client';

import { FailClosedBanner as UiFailClosedBanner } from '@/components/ui';

const DEFAULT_MESSAGE =
  'Off-chain store or endorsement plugin unreachable. Fail-closed: new proposals will not be endorsed until the path recovers.';

export function FailClosedBanner({ message = DEFAULT_MESSAGE }: { message?: string }) {
  return <UiFailClosedBanner message={message} />;
}
