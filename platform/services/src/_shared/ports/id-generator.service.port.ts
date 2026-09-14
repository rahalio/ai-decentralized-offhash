/**
 * IdGeneratorService Port — Offhash domain prefixes.
 */

import type { DomainCode } from '@offhash/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  polId(): string;
  scnId(): string;
  hshId(): string;
  ersId(): string;
  apnId(): string;
  endId(): string;
  cfgId(): string;
  rptId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
