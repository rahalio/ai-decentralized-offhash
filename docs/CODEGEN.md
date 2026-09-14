# Codegen guide (Offhash)

## Modes

| Mode | When | Action |
|------|------|--------|
| **A — New domain** | First time a domain YAML has no layers | Full multi-layer `generate --domain X` |
| **B — YAML edit** | Domain already scaffolded | Bundle → `--layers core` → handwrite platform |

## Commands

```bash
# Rehydrate local tool if missing (never commit .codegen/)
# rsync -a --delete /Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold/.codegen/ ./.codegen/
# then set package_scope=@offhash and register product domains

pnpm codegen:paths
pnpm lint:openapi
pnpm bundle:openapi
pnpm codegen:core
pnpm codegen:identity   # full identity scaffold
```

Config: `.codegen/.zero-codegen-merged.json` (local-only)  
Tool: `PYTHONPATH=.codegen/codegen/src python3 -m zero_codegen.cli.main`

## Domains

`identity`, `policies`, `scans`, `hashes`, `erasures`, `antipatterns`, `endorsement`, `configcerts`, `reporting`

## OpenAPI layout

- `packages/openapi-core/src/common/` — envelopes, problem, security, parameters, primitives
- `packages/openapi-core/src/{domain}.yaml` + `{domain}.schemas.yaml`
- `.codegen/openapi-examples/` — teaching specs (not wired to Redocly)

## Related skills

- `offhash-codegen-local` — never commit `.codegen/`
- `ddd-platform` — architecture & anti-drift
- `ddd-codegen` — pipeline commands
- `ddd-identity` — auth blueprint
