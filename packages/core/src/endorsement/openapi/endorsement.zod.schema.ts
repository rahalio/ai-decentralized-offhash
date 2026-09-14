import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const OrgId = z.string();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const PeerId = z.string();
const PeerHookStatus = z.enum(['healthy', 'missing', 'quarantined']);
const NetworkId = z.string();
const PeerHook = z
  .object({
    peerId: z.string().regex(/^peer_[0-9A-HJKMNP-TV-Z]{26}$/),
    orgId: z.string().regex(/^org_[0-9A-HJKMNP-TV-Z]{26}$/),
    pluginVersion: z.string(),
    lastHeartbeatAt: z.string().datetime({ offset: true }).optional(),
    status: z.enum(['healthy', 'missing', 'quarantined']),
    networkId: z
      .string()
      .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    quarantineReason: z.string().optional(),
    quarantinedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const PeerHookListData = z
  .object({
    items: z.array(
      z
        .object({
          peerId: z.string().regex(/^peer_[0-9A-HJKMNP-TV-Z]{26}$/),
          orgId: z.string().regex(/^org_[0-9A-HJKMNP-TV-Z]{26}$/),
          pluginVersion: z.string(),
          lastHeartbeatAt: z.string().datetime({ offset: true }).optional(),
          status: z.enum(['healthy', 'missing', 'quarantined']),
          networkId: z
            .string()
            .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          quarantineReason: z.string().optional(),
          quarantinedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const PeerHookListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              peerId: z.string().regex(/^peer_[0-9A-HJKMNP-TV-Z]{26}$/),
              orgId: z.string().regex(/^org_[0-9A-HJKMNP-TV-Z]{26}$/),
              pluginVersion: z.string(),
              lastHeartbeatAt: z.string().datetime({ offset: true }).optional(),
              status: z.enum(['healthy', 'missing', 'quarantined']),
              networkId: z
                .string()
                .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              quarantineReason: z.string().optional(),
              quarantinedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const PeerHookResponse = z
  .object({
    data: z
      .object({
        peerId: z.string().regex(/^peer_[0-9A-HJKMNP-TV-Z]{26}$/),
        orgId: z.string().regex(/^org_[0-9A-HJKMNP-TV-Z]{26}$/),
        pluginVersion: z.string(),
        lastHeartbeatAt: z.string().datetime({ offset: true }).optional(),
        status: z.enum(['healthy', 'missing', 'quarantined']),
        networkId: z
          .string()
          .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        quarantineReason: z.string().optional(),
        quarantinedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const QuarantinePeerRequest = z
  .object({ reason: z.string().min(1).max(500) })
  .passthrough();
const EndorsementDecisionId = z.string();
const ScanId = z.string();
const EndorsementDecision = z
  .object({
    decisionId: z.string().regex(/^end_[0-9A-HJKMNP-TV-Z]{26}$/),
    peerId: z.string().regex(/^peer_[0-9A-HJKMNP-TV-Z]{26}$/),
    scanId: z
      .string()
      .regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    proposalRef: z.string(),
    decision: z.enum(['allow', 'deny']),
    reason: z.string().optional(),
    decidedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const EndorsementDecisionListData = z
  .object({
    items: z.array(
      z
        .object({
          decisionId: z.string().regex(/^end_[0-9A-HJKMNP-TV-Z]{26}$/),
          peerId: z.string().regex(/^peer_[0-9A-HJKMNP-TV-Z]{26}$/),
          scanId: z
            .string()
            .regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          proposalRef: z.string(),
          decision: z.enum(['allow', 'deny']),
          reason: z.string().optional(),
          decidedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const EndorsementDecisionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              decisionId: z.string().regex(/^end_[0-9A-HJKMNP-TV-Z]{26}$/),
              peerId: z.string().regex(/^peer_[0-9A-HJKMNP-TV-Z]{26}$/),
              scanId: z
                .string()
                .regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              proposalRef: z.string(),
              decision: z.enum(['allow', 'deny']),
              reason: z.string().optional(),
              decidedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  OrgId,
  Problem,
  PeerId,
  PeerHookStatus,
  NetworkId,
  PeerHook,
  PeerHookListData,
  ResponseMeta,
  PeerHookListResponse,
  PeerHookResponse,
  QuarantinePeerRequest,
  EndorsementDecisionId,
  ScanId,
  EndorsementDecision,
  EndorsementDecisionListData,
  EndorsementDecisionListResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/endorsement/decisions',
    alias: 'listEndorsementDecisions',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'decision',
        type: 'Query',
        schema: z.enum(['allow', 'deny']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  decisionId: z.string().regex(/^end_[0-9A-HJKMNP-TV-Z]{26}$/),
                  peerId: z.string().regex(/^peer_[0-9A-HJKMNP-TV-Z]{26}$/),
                  scanId: z
                    .string()
                    .regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  proposalRef: z.string(),
                  decision: z.enum(['allow', 'deny']),
                  reason: z.string().optional(),
                  decidedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/endorsement/peers',
    alias: 'listEndorsementPeers',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['healthy', 'missing', 'quarantined']).optional(),
      },
      {
        name: 'orgId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^org_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  peerId: z.string().regex(/^peer_[0-9A-HJKMNP-TV-Z]{26}$/),
                  orgId: z.string().regex(/^org_[0-9A-HJKMNP-TV-Z]{26}$/),
                  pluginVersion: z.string(),
                  lastHeartbeatAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  status: z.enum(['healthy', 'missing', 'quarantined']),
                  networkId: z
                    .string()
                    .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  quarantineReason: z.string().optional(),
                  quarantinedAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/endorsement/peers/:peerId',
    alias: 'getEndorsementPeer',
    requestFormat: 'json',
    parameters: [
      {
        name: 'peerId',
        type: 'Path',
        schema: z.string().regex(/^peer_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            peerId: z.string().regex(/^peer_[0-9A-HJKMNP-TV-Z]{26}$/),
            orgId: z.string().regex(/^org_[0-9A-HJKMNP-TV-Z]{26}$/),
            pluginVersion: z.string(),
            lastHeartbeatAt: z.string().datetime({ offset: true }).optional(),
            status: z.enum(['healthy', 'missing', 'quarantined']),
            networkId: z
              .string()
              .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            quarantineReason: z.string().optional(),
            quarantinedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/endorsement/peers/:peerId/quarantine',
    alias: 'quarantineEndorsementPeer',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ reason: z.string().min(1).max(500) }).passthrough(),
      },
      {
        name: 'peerId',
        type: 'Path',
        schema: z.string().regex(/^peer_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            peerId: z.string().regex(/^peer_[0-9A-HJKMNP-TV-Z]{26}$/),
            orgId: z.string().regex(/^org_[0-9A-HJKMNP-TV-Z]{26}$/),
            pluginVersion: z.string(),
            lastHeartbeatAt: z.string().datetime({ offset: true }).optional(),
            status: z.enum(['healthy', 'missing', 'quarantined']),
            networkId: z
              .string()
              .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            quarantineReason: z.string().optional(),
            quarantinedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
