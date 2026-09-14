# Offhash — User stories

**Product:** [PRODUCT.md](./PRODUCT.md)


### Fabric chaincode developer

- As a developer, I want pre-commit feedback when my chaincode puts email in a state key, so that I fix design before production.
- As a developer, I want templates for salted hash + off-chain PD storage, so that I implement the only compliant pattern from the deck.

### Platform architect

- As an architect, I want PDC and encrypt-on-chain designs auto-flagged with FAB-1151 citations, so that teams do not ship known non-compliant shortcuts.
- As an architect, I want erasure drills proving hash orphanization, so that Article 17 requests are demonstrably satisfiable.

### Privacy engineer

- As a privacy engineer, I want off-chain store delete webhooks tied to hash IDs, so that erasure propagates consistently across replicas.
- As a privacy engineer, I want warnings that salted hashes remain pseudonymous PD, so that legal narratives stay accurate.

### DevOps / peer operator

- As DevOps, I want endorsement hooks deployed consistently on all org peers, so that policy bypass via a single rogue peer is impossible.

### Auditor

- As an auditor, I want a block-level report of PD violations attempted vs blocked, so that control effectiveness is measurable.

### Platform administrator

- As a platform administrator, I want fail-closed rejection when the off-chain PD store is unavailable, so that proposals cannot spill PD onto chain as fallback.
- As a platform administrator, I want negative-path quarantine for scanned PDF/binary payloads in proposals, echoing IBM GNQZVQR3 accidental-upload concerns.
