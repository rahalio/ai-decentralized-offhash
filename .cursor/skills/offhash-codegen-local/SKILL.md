---
name: offhash-codegen-local
description: >-
  Offhash local .codegen policy — never commit or push .codegen; rehydrate
  from zero-apps-codegen-scaffold when missing. Use when running codegen,
  zero-codegen, or when .codegen is missing.
---

# Offhash — `.codegen` is local-only

**Never commit or push `.codegen/` to GitHub.**

- Listed in `.gitignore` (`.codegen/`, `codegen/`, `**/zero_codegen/`).
- Contains the zero-codegen Python tool, merged JSON configs, and teaching examples.
- Do not `git add -f .codegen` or suggest committing it.

## Rehydrate when missing

```bash
SCAFFOLD=/Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold
rsync -a --delete "$SCAFFOLD/.codegen/" ./.codegen/
# package_scope must be @offhash
```

After rehydrate, ensure domains `identity`, `policies`, `scans`, `hashes`, `erasures`, `antipatterns`, `endorsement`, `configcerts`, `reporting` are registered in `.codegen/zero-codegen.json` and `.codegen/.zero-codegen-merged.json`, and `layers.webapp.services|features.enabled` is `true` when generating webapp skeletons.
