# Offhash

Hyperledger Fabric personal-data architecture guard. Blocks PD on-chain, enforces
off-chain stores with salted hash proofs, and flags PDC / encrypt-on-chain anti-patterns.

OpenAPI-first DDD monorepo based on `zero-apps-codegen-scaffold`.

**Product docs:** [PRODUCT.md](./PRODUCT.md) · [USER_STORIES.md](./USER_STORIES.md) · [WEBAPP.md](./WEBAPP.md)

Package scope: **`@offhash/*`**

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp  → API clients + features (Next.js)
```

## Quick start

```bash
# If .codegen/ is missing (gitignored), rehydrate from the scaffold first:
#   rsync -a --delete /Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold/.codegen/ ./.codegen/
#   # then ensure package_scope=@offhash and product domains are registered

pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: offhash_demo_local_dev_key

pnpm dev:web   # Next.js console (after webapp package is present)
```

## `.codegen` — never commit

`.codegen/` is **local-only** (zero-codegen tool + configs). It is gitignored and must not be pushed to GitHub. See `.cursor/skills/offhash-codegen-local/SKILL.md`.

## Codegen rules (agents)

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.

See `.cursor/skills/` and `docs/CODEGEN.md`.
