/**
 * ID Generator Service Implementation — Offhash prefixes.
 */

import type { DomainCode } from '@offhash/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@offhash/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@offhash/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  polId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.policy);
  }
  scnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.scan);
  }
  hshId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.hash);
  }
  ersId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.erasure);
  }
  apnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.antipattern);
  }
  endId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.endorsement);
  }
  cfgId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.configcert);
  }
  rptId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.reporting);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
