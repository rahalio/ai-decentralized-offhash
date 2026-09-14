# Dynamo Local

```bash
docker compose up -d
TABLE_NAME=offhash-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
TABLE_NAME=offhash-core-local AWS_ENDPOINT_URL=http://localhost:8000 AWS_REGION=us-east-1 pnpm --filter @offhash/api-server dev
```

Sandbox identity adapters use in-memory Maps by default. Point `TABLE_NAME` + `AWS_ENDPOINT_URL` at Dynamo Local when you wire real DDB repositories.
