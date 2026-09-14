import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const scanTransactionProposal_Body = z
  .object({
    proposalRef: z.string().min(1).max(256),
    policyId: z
      .string()
      .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    networkId: z
      .string()
      .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    channelId: z.string().min(1).max(128).optional(),
    fields: z
      .object({
        proposalPayload: z.string(),
        clientCertificate: z.string(),
        stateKeys: z.array(z.string()),
        stateValues: z.array(z.string()),
        events: z.array(z.string()),
        chaincodeResponse: z.string(),
        readSets: z.array(z.string()),
      })
      .partial()
      .passthrough(),
  })
  .passthrough();
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
const ScanId = z.string();
const ScanDecision = z.enum(['allow', 'block', 'remediate']);
const FabricSurface = z.enum([
  'proposalPayload',
  'clientCertificate',
  'stateKeys',
  'stateValues',
  'events',
  'chaincodeResponse',
  'readSets',
  'privateDataCollection',
  'transientData',
]);
const PdHit = z
  .object({
    fieldPath: z.string(),
    fabricSurface: z.enum([
      'proposalPayload',
      'clientCertificate',
      'stateKeys',
      'stateValues',
      'events',
      'chaincodeResponse',
      'readSets',
      'privateDataCollection',
      'transientData',
    ]),
    hint: z.string().optional(),
  })
  .passthrough();
const PdScanResult = z
  .object({
    scanId: z.string().regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/),
    proposalRef: z.string(),
    decision: z.enum(['allow', 'block', 'remediate']),
    endorsementAllowed: z.boolean(),
    pdHits: z
      .array(
        z
          .object({
            fieldPath: z.string(),
            fabricSurface: z.enum([
              'proposalPayload',
              'clientCertificate',
              'stateKeys',
              'stateValues',
              'events',
              'chaincodeResponse',
              'readSets',
              'privateDataCollection',
              'transientData',
            ]),
            hint: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
    remediationHints: z.array(z.string()).optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const PdScanResultListData = z
  .object({
    items: z.array(
      z
        .object({
          scanId: z.string().regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/),
          proposalRef: z.string(),
          decision: z.enum(['allow', 'block', 'remediate']),
          endorsementAllowed: z.boolean(),
          pdHits: z
            .array(
              z
                .object({
                  fieldPath: z.string(),
                  fabricSurface: z.enum([
                    'proposalPayload',
                    'clientCertificate',
                    'stateKeys',
                    'stateValues',
                    'events',
                    'chaincodeResponse',
                    'readSets',
                    'privateDataCollection',
                    'transientData',
                  ]),
                  hint: z.string().optional(),
                })
                .passthrough()
            )
            .optional(),
          remediationHints: z.array(z.string()).optional(),
          createdAt: z.string().datetime({ offset: true }),
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
const PdScanResultListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              scanId: z.string().regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/),
              proposalRef: z.string(),
              decision: z.enum(['allow', 'block', 'remediate']),
              endorsementAllowed: z.boolean(),
              pdHits: z
                .array(
                  z
                    .object({
                      fieldPath: z.string(),
                      fabricSurface: z.enum([
                        'proposalPayload',
                        'clientCertificate',
                        'stateKeys',
                        'stateValues',
                        'events',
                        'chaincodeResponse',
                        'readSets',
                        'privateDataCollection',
                        'transientData',
                      ]),
                      hint: z.string().optional(),
                    })
                    .passthrough()
                )
                .optional(),
              remediationHints: z.array(z.string()).optional(),
              createdAt: z.string().datetime({ offset: true }),
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
const PolicyId = z.string();
const NetworkId = z.string();
const ChannelId = z.string();
const ProposalScanFields = z
  .object({
    proposalPayload: z.string(),
    clientCertificate: z.string(),
    stateKeys: z.array(z.string()),
    stateValues: z.array(z.string()),
    events: z.array(z.string()),
    chaincodeResponse: z.string(),
    readSets: z.array(z.string()),
  })
  .partial()
  .passthrough();
const ProposalScanRequest = z
  .object({
    proposalRef: z.string().min(1).max(256),
    policyId: z
      .string()
      .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    networkId: z
      .string()
      .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    channelId: z.string().min(1).max(128).optional(),
    fields: z
      .object({
        proposalPayload: z.string(),
        clientCertificate: z.string(),
        stateKeys: z.array(z.string()),
        stateValues: z.array(z.string()),
        events: z.array(z.string()),
        chaincodeResponse: z.string(),
        readSets: z.array(z.string()),
      })
      .partial()
      .passthrough(),
  })
  .passthrough();
const PdScanResultResponse = z
  .object({
    data: z
      .object({
        scanId: z.string().regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/),
        proposalRef: z.string(),
        decision: z.enum(['allow', 'block', 'remediate']),
        endorsementAllowed: z.boolean(),
        pdHits: z
          .array(
            z
              .object({
                fieldPath: z.string(),
                fabricSurface: z.enum([
                  'proposalPayload',
                  'clientCertificate',
                  'stateKeys',
                  'stateValues',
                  'events',
                  'chaincodeResponse',
                  'readSets',
                  'privateDataCollection',
                  'transientData',
                ]),
                hint: z.string().optional(),
              })
              .passthrough()
          )
          .optional(),
        remediationHints: z.array(z.string()).optional(),
        createdAt: z.string().datetime({ offset: true }),
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
  scanTransactionProposal_Body,
  Problem,
  ScanId,
  ScanDecision,
  FabricSurface,
  PdHit,
  PdScanResult,
  PdScanResultListData,
  ResponseMeta,
  PdScanResultListResponse,
  PolicyId,
  NetworkId,
  ChannelId,
  ProposalScanFields,
  ProposalScanRequest,
  PdScanResultResponse,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/v1/scans',
    alias: 'scanTransactionProposal',
    description: `Preferred auth is ApiKey (peer endorsement plugin); Bearer also accepted.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: scanTransactionProposal_Body,
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
            scanId: z.string().regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/),
            proposalRef: z.string(),
            decision: z.enum(['allow', 'block', 'remediate']),
            endorsementAllowed: z.boolean(),
            pdHits: z
              .array(
                z
                  .object({
                    fieldPath: z.string(),
                    fabricSurface: z.enum([
                      'proposalPayload',
                      'clientCertificate',
                      'stateKeys',
                      'stateValues',
                      'events',
                      'chaincodeResponse',
                      'readSets',
                      'privateDataCollection',
                      'transientData',
                    ]),
                    hint: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            remediationHints: z.array(z.string()).optional(),
            createdAt: z.string().datetime({ offset: true }),
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
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
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
    path: '/v1/scans',
    alias: 'listPdScans',
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
        schema: z.enum(['allow', 'block', 'remediate']).optional(),
      },
      {
        name: 'proposalRef',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  scanId: z.string().regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/),
                  proposalRef: z.string(),
                  decision: z.enum(['allow', 'block', 'remediate']),
                  endorsementAllowed: z.boolean(),
                  pdHits: z
                    .array(
                      z
                        .object({
                          fieldPath: z.string(),
                          fabricSurface: z.enum([
                            'proposalPayload',
                            'clientCertificate',
                            'stateKeys',
                            'stateValues',
                            'events',
                            'chaincodeResponse',
                            'readSets',
                            'privateDataCollection',
                            'transientData',
                          ]),
                          hint: z.string().optional(),
                        })
                        .passthrough()
                    )
                    .optional(),
                  remediationHints: z.array(z.string()).optional(),
                  createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/scans/:scanId',
    alias: 'getPdScanResult',
    requestFormat: 'json',
    parameters: [
      {
        name: 'scanId',
        type: 'Path',
        schema: z.string().regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            scanId: z.string().regex(/^scn_[0-9A-HJKMNP-TV-Z]{26}$/),
            proposalRef: z.string(),
            decision: z.enum(['allow', 'block', 'remediate']),
            endorsementAllowed: z.boolean(),
            pdHits: z
              .array(
                z
                  .object({
                    fieldPath: z.string(),
                    fabricSurface: z.enum([
                      'proposalPayload',
                      'clientCertificate',
                      'stateKeys',
                      'stateValues',
                      'events',
                      'chaincodeResponse',
                      'readSets',
                      'privateDataCollection',
                      'transientData',
                    ]),
                    hint: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            remediationHints: z.array(z.string()).optional(),
            createdAt: z.string().datetime({ offset: true }),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
