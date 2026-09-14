import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const executePdErasure_Body = z
  .object({
    hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
    erasureReason: z.string().min(1).max(1000),
    pdRecordId: z
      .string()
      .regex(/^pdr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
  })
  .passthrough();
const createErasureDrill_Body = z
  .object({
    networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
    channelId: z.string().min(1).max(128).optional(),
    hashId: z
      .string()
      .regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    notes: z.string().max(1000).optional(),
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
const ErasureJobId = z.string();
const HashId = z.string();
const PdRecordId = z.string();
const ErasureJobStatus = z.enum(['queued', 'running', 'done', 'failed']);
const OrphanizationProof = z
  .object({
    jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
    hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
    offChainDeleted: z.boolean(),
    orphanedAt: z.string().datetime({ offset: true }),
    proofHash: z.string(),
  })
  .passthrough();
const ErasureJob = z
  .object({
    jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
    hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
    pdRecordId: z
      .string()
      .regex(/^pdr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    erasureReason: z.string(),
    status: z.enum(['queued', 'running', 'done', 'failed']),
    proof: z
      .object({
        jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
        hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
        offChainDeleted: z.boolean(),
        orphanedAt: z.string().datetime({ offset: true }),
        proofHash: z.string(),
      })
      .passthrough()
      .optional(),
    errorMessage: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    completedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ErasureJobListData = z
  .object({
    items: z.array(
      z
        .object({
          jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
          hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
          pdRecordId: z
            .string()
            .regex(/^pdr_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          erasureReason: z.string(),
          status: z.enum(['queued', 'running', 'done', 'failed']),
          proof: z
            .object({
              jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
              hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
              offChainDeleted: z.boolean(),
              orphanedAt: z.string().datetime({ offset: true }),
              proofHash: z.string(),
            })
            .passthrough()
            .optional(),
          errorMessage: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          completedAt: z.string().datetime({ offset: true }).optional(),
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
const ErasureJobListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
              hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
              pdRecordId: z
                .string()
                .regex(/^pdr_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              erasureReason: z.string(),
              status: z.enum(['queued', 'running', 'done', 'failed']),
              proof: z
                .object({
                  jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
                  hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
                  offChainDeleted: z.boolean(),
                  orphanedAt: z.string().datetime({ offset: true }),
                  proofHash: z.string(),
                })
                .passthrough()
                .optional(),
              errorMessage: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
              completedAt: z.string().datetime({ offset: true }).optional(),
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
const ErasureJobCreateRequest = z
  .object({
    hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
    erasureReason: z.string().min(1).max(1000),
    pdRecordId: z
      .string()
      .regex(/^pdr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
  })
  .passthrough();
const ErasureJobResponse = z
  .object({
    data: z
      .object({
        jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
        hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
        pdRecordId: z
          .string()
          .regex(/^pdr_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        erasureReason: z.string(),
        status: z.enum(['queued', 'running', 'done', 'failed']),
        proof: z
          .object({
            jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
            hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
            offChainDeleted: z.boolean(),
            orphanedAt: z.string().datetime({ offset: true }),
            proofHash: z.string(),
          })
          .passthrough()
          .optional(),
        errorMessage: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
        completedAt: z.string().datetime({ offset: true }).optional(),
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
const DrillId = z.string();
const NetworkId = z.string();
const ChannelId = z.string();
const DrillResult = z.enum(['pass', 'fail', 'pending']);
const ErasureDrill = z
  .object({
    drillId: z.string().regex(/^drl_[0-9A-HJKMNP-TV-Z]{26}$/),
    networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
    channelId: z.string().min(1).max(128).optional(),
    hashId: z
      .string()
      .regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    jobId: z
      .string()
      .regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    result: z.enum(['pass', 'fail', 'pending']),
    notes: z.string().optional(),
    proof: z
      .object({
        jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
        hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
        offChainDeleted: z.boolean(),
        orphanedAt: z.string().datetime({ offset: true }),
        proofHash: z.string(),
      })
      .passthrough()
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
    completedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ErasureDrillListData = z
  .object({
    items: z.array(
      z
        .object({
          drillId: z.string().regex(/^drl_[0-9A-HJKMNP-TV-Z]{26}$/),
          networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
          channelId: z.string().min(1).max(128).optional(),
          hashId: z
            .string()
            .regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          jobId: z
            .string()
            .regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          result: z.enum(['pass', 'fail', 'pending']),
          notes: z.string().optional(),
          proof: z
            .object({
              jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
              hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
              offChainDeleted: z.boolean(),
              orphanedAt: z.string().datetime({ offset: true }),
              proofHash: z.string(),
            })
            .passthrough()
            .optional(),
          createdAt: z.string().datetime({ offset: true }),
          completedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ErasureDrillListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              drillId: z.string().regex(/^drl_[0-9A-HJKMNP-TV-Z]{26}$/),
              networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
              channelId: z.string().min(1).max(128).optional(),
              hashId: z
                .string()
                .regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              jobId: z
                .string()
                .regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              result: z.enum(['pass', 'fail', 'pending']),
              notes: z.string().optional(),
              proof: z
                .object({
                  jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
                  hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
                  offChainDeleted: z.boolean(),
                  orphanedAt: z.string().datetime({ offset: true }),
                  proofHash: z.string(),
                })
                .passthrough()
                .optional(),
              createdAt: z.string().datetime({ offset: true }),
              completedAt: z.string().datetime({ offset: true }).optional(),
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
const ErasureDrillCreateRequest = z
  .object({
    networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
    channelId: z.string().min(1).max(128).optional(),
    hashId: z
      .string()
      .regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    notes: z.string().max(1000).optional(),
  })
  .passthrough();
const ErasureDrillResponse = z
  .object({
    data: z
      .object({
        drillId: z.string().regex(/^drl_[0-9A-HJKMNP-TV-Z]{26}$/),
        networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
        channelId: z.string().min(1).max(128).optional(),
        hashId: z
          .string()
          .regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        jobId: z
          .string()
          .regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        result: z.enum(['pass', 'fail', 'pending']),
        notes: z.string().optional(),
        proof: z
          .object({
            jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
            hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
            offChainDeleted: z.boolean(),
            orphanedAt: z.string().datetime({ offset: true }),
            proofHash: z.string(),
          })
          .passthrough()
          .optional(),
        createdAt: z.string().datetime({ offset: true }),
        completedAt: z.string().datetime({ offset: true }).optional(),
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
  executePdErasure_Body,
  createErasureDrill_Body,
  Problem,
  ErasureJobId,
  HashId,
  PdRecordId,
  ErasureJobStatus,
  OrphanizationProof,
  ErasureJob,
  ErasureJobListData,
  ResponseMeta,
  ErasureJobListResponse,
  ErasureJobCreateRequest,
  ErasureJobResponse,
  DrillId,
  NetworkId,
  ChannelId,
  DrillResult,
  ErasureDrill,
  ErasureDrillListData,
  ErasureDrillListResponse,
  ErasureDrillCreateRequest,
  ErasureDrillResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/erasure-drills',
    alias: 'listErasureDrills',
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
        name: 'result',
        type: 'Query',
        schema: z.enum(['pass', 'fail', 'pending']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  drillId: z.string().regex(/^drl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
                  channelId: z.string().min(1).max(128).optional(),
                  hashId: z
                    .string()
                    .regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  jobId: z
                    .string()
                    .regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  result: z.enum(['pass', 'fail', 'pending']),
                  notes: z.string().optional(),
                  proof: z
                    .object({
                      jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
                      hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
                      offChainDeleted: z.boolean(),
                      orphanedAt: z.string().datetime({ offset: true }),
                      proofHash: z.string(),
                    })
                    .passthrough()
                    .optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  completedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'post',
    path: '/v1/erasure-drills',
    alias: 'createErasureDrill',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createErasureDrill_Body,
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
            drillId: z.string().regex(/^drl_[0-9A-HJKMNP-TV-Z]{26}$/),
            networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
            channelId: z.string().min(1).max(128).optional(),
            hashId: z
              .string()
              .regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            jobId: z
              .string()
              .regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            result: z.enum(['pass', 'fail', 'pending']),
            notes: z.string().optional(),
            proof: z
              .object({
                jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
                hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
                offChainDeleted: z.boolean(),
                orphanedAt: z.string().datetime({ offset: true }),
                proofHash: z.string(),
              })
              .passthrough()
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
    ],
  },
  {
    method: 'get',
    path: '/v1/erasure-drills/:drillId',
    alias: 'getErasureDrill',
    requestFormat: 'json',
    parameters: [
      {
        name: 'drillId',
        type: 'Path',
        schema: z.string().regex(/^drl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            drillId: z.string().regex(/^drl_[0-9A-HJKMNP-TV-Z]{26}$/),
            networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
            channelId: z.string().min(1).max(128).optional(),
            hashId: z
              .string()
              .regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            jobId: z
              .string()
              .regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            result: z.enum(['pass', 'fail', 'pending']),
            notes: z.string().optional(),
            proof: z
              .object({
                jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
                hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
                offChainDeleted: z.boolean(),
                orphanedAt: z.string().datetime({ offset: true }),
                proofHash: z.string(),
              })
              .passthrough()
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'get',
    path: '/v1/erasures',
    alias: 'listErasureJobs',
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
        schema: z.enum(['queued', 'running', 'done', 'failed']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
                  hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
                  pdRecordId: z
                    .string()
                    .regex(/^pdr_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  erasureReason: z.string(),
                  status: z.enum(['queued', 'running', 'done', 'failed']),
                  proof: z
                    .object({
                      jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
                      hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
                      offChainDeleted: z.boolean(),
                      orphanedAt: z.string().datetime({ offset: true }),
                      proofHash: z.string(),
                    })
                    .passthrough()
                    .optional(),
                  errorMessage: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  completedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'post',
    path: '/v1/erasures',
    alias: 'executePdErasure',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: executePdErasure_Body,
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
            jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
            hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
            pdRecordId: z
              .string()
              .regex(/^pdr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            erasureReason: z.string(),
            status: z.enum(['queued', 'running', 'done', 'failed']),
            proof: z
              .object({
                jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
                hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
                offChainDeleted: z.boolean(),
                orphanedAt: z.string().datetime({ offset: true }),
                proofHash: z.string(),
              })
              .passthrough()
              .optional(),
            errorMessage: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
    ],
  },
  {
    method: 'get',
    path: '/v1/erasures/:jobId',
    alias: 'getErasureJob',
    requestFormat: 'json',
    parameters: [
      {
        name: 'jobId',
        type: 'Path',
        schema: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
            hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
            pdRecordId: z
              .string()
              .regex(/^pdr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            erasureReason: z.string(),
            status: z.enum(['queued', 'running', 'done', 'failed']),
            proof: z
              .object({
                jobId: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
                hashId: z.string().regex(/^hsh_[0-9A-HJKMNP-TV-Z]{26}$/),
                offChainDeleted: z.boolean(),
                orphanedAt: z.string().datetime({ offset: true }),
                proofHash: z.string(),
              })
              .passthrough()
              .optional(),
            errorMessage: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
