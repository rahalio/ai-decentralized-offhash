import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createConfigCertReview_Body = z
  .object({
    networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
    scheduledAt: z.string().datetime({ offset: true }),
    notes: z.string().max(1000).optional(),
  })
  .passthrough();
const completeConfigCertReview_Body = z
  .object({
    subjectBoundCertCount: z.number().int().gte(0),
    findings: z
      .array(
        z
          .object({
            severity: z.enum(['info', 'warn', 'critical']),
            message: z.string(),
            subjectDn: z.string().optional(),
            attribute: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
    notes: z.string().max(2000).optional(),
  })
  .passthrough();
const NetworkId = z.string();
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
const ConfigCertReviewId = z.string();
const ConfigCertReviewStatus = z.enum([
  'scheduled',
  'in_progress',
  'completed',
  'overdue',
]);
const ConfigCertFinding = z
  .object({
    severity: z.enum(['info', 'warn', 'critical']),
    message: z.string(),
    subjectDn: z.string().optional(),
    attribute: z.string().optional(),
  })
  .passthrough();
const ConfigCertReview = z
  .object({
    reviewId: z.string().regex(/^cfg_[0-9A-HJKMNP-TV-Z]{26}$/),
    networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
    scheduledAt: z.string().datetime({ offset: true }),
    status: z.enum(['scheduled', 'in_progress', 'completed', 'overdue']),
    subjectBoundCertCount: z.number().int().gte(0),
    findings: z
      .array(
        z
          .object({
            severity: z.enum(['info', 'warn', 'critical']),
            message: z.string(),
            subjectDn: z.string().optional(),
            attribute: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
    completedAt: z.string().datetime({ offset: true }).optional(),
    notes: z.string().optional(),
  })
  .passthrough();
const ConfigCertReviewListData = z
  .object({
    items: z.array(
      z
        .object({
          reviewId: z.string().regex(/^cfg_[0-9A-HJKMNP-TV-Z]{26}$/),
          networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
          scheduledAt: z.string().datetime({ offset: true }),
          status: z.enum(['scheduled', 'in_progress', 'completed', 'overdue']),
          subjectBoundCertCount: z.number().int().gte(0),
          findings: z
            .array(
              z
                .object({
                  severity: z.enum(['info', 'warn', 'critical']),
                  message: z.string(),
                  subjectDn: z.string().optional(),
                  attribute: z.string().optional(),
                })
                .passthrough()
            )
            .optional(),
          completedAt: z.string().datetime({ offset: true }).optional(),
          notes: z.string().optional(),
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
const ConfigCertReviewListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              reviewId: z.string().regex(/^cfg_[0-9A-HJKMNP-TV-Z]{26}$/),
              networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
              scheduledAt: z.string().datetime({ offset: true }),
              status: z.enum([
                'scheduled',
                'in_progress',
                'completed',
                'overdue',
              ]),
              subjectBoundCertCount: z.number().int().gte(0),
              findings: z
                .array(
                  z
                    .object({
                      severity: z.enum(['info', 'warn', 'critical']),
                      message: z.string(),
                      subjectDn: z.string().optional(),
                      attribute: z.string().optional(),
                    })
                    .passthrough()
                )
                .optional(),
              completedAt: z.string().datetime({ offset: true }).optional(),
              notes: z.string().optional(),
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
const ConfigCertReviewCreateRequest = z
  .object({
    networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
    scheduledAt: z.string().datetime({ offset: true }),
    notes: z.string().max(1000).optional(),
  })
  .passthrough();
const ConfigCertReviewResponse = z
  .object({
    data: z
      .object({
        reviewId: z.string().regex(/^cfg_[0-9A-HJKMNP-TV-Z]{26}$/),
        networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
        scheduledAt: z.string().datetime({ offset: true }),
        status: z.enum(['scheduled', 'in_progress', 'completed', 'overdue']),
        subjectBoundCertCount: z.number().int().gte(0),
        findings: z
          .array(
            z
              .object({
                severity: z.enum(['info', 'warn', 'critical']),
                message: z.string(),
                subjectDn: z.string().optional(),
                attribute: z.string().optional(),
              })
              .passthrough()
          )
          .optional(),
        completedAt: z.string().datetime({ offset: true }).optional(),
        notes: z.string().optional(),
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
const CompleteConfigCertReviewRequest = z
  .object({
    subjectBoundCertCount: z.number().int().gte(0),
    findings: z
      .array(
        z
          .object({
            severity: z.enum(['info', 'warn', 'critical']),
            message: z.string(),
            subjectDn: z.string().optional(),
            attribute: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
    notes: z.string().max(2000).optional(),
  })
  .passthrough();

export const schemas: any = {
  createConfigCertReview_Body,
  completeConfigCertReview_Body,
  NetworkId,
  Problem,
  ConfigCertReviewId,
  ConfigCertReviewStatus,
  ConfigCertFinding,
  ConfigCertReview,
  ConfigCertReviewListData,
  ResponseMeta,
  ConfigCertReviewListResponse,
  ConfigCertReviewCreateRequest,
  ConfigCertReviewResponse,
  CompleteConfigCertReviewRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/config-cert-reviews',
    alias: 'listConfigCertReviews',
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
        schema: z
          .enum(['scheduled', 'in_progress', 'completed', 'overdue'])
          .optional(),
      },
      {
        name: 'networkId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
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
                  reviewId: z.string().regex(/^cfg_[0-9A-HJKMNP-TV-Z]{26}$/),
                  networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
                  scheduledAt: z.string().datetime({ offset: true }),
                  status: z.enum([
                    'scheduled',
                    'in_progress',
                    'completed',
                    'overdue',
                  ]),
                  subjectBoundCertCount: z.number().int().gte(0),
                  findings: z
                    .array(
                      z
                        .object({
                          severity: z.enum(['info', 'warn', 'critical']),
                          message: z.string(),
                          subjectDn: z.string().optional(),
                          attribute: z.string().optional(),
                        })
                        .passthrough()
                    )
                    .optional(),
                  completedAt: z.string().datetime({ offset: true }).optional(),
                  notes: z.string().optional(),
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
    path: '/v1/config-cert-reviews',
    alias: 'createConfigCertReview',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createConfigCertReview_Body,
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
            reviewId: z.string().regex(/^cfg_[0-9A-HJKMNP-TV-Z]{26}$/),
            networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
            scheduledAt: z.string().datetime({ offset: true }),
            status: z.enum([
              'scheduled',
              'in_progress',
              'completed',
              'overdue',
            ]),
            subjectBoundCertCount: z.number().int().gte(0),
            findings: z
              .array(
                z
                  .object({
                    severity: z.enum(['info', 'warn', 'critical']),
                    message: z.string(),
                    subjectDn: z.string().optional(),
                    attribute: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            completedAt: z.string().datetime({ offset: true }).optional(),
            notes: z.string().optional(),
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
    path: '/v1/config-cert-reviews/:reviewId',
    alias: 'getConfigCertReview',
    requestFormat: 'json',
    parameters: [
      {
        name: 'reviewId',
        type: 'Path',
        schema: z.string().regex(/^cfg_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            reviewId: z.string().regex(/^cfg_[0-9A-HJKMNP-TV-Z]{26}$/),
            networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
            scheduledAt: z.string().datetime({ offset: true }),
            status: z.enum([
              'scheduled',
              'in_progress',
              'completed',
              'overdue',
            ]),
            subjectBoundCertCount: z.number().int().gte(0),
            findings: z
              .array(
                z
                  .object({
                    severity: z.enum(['info', 'warn', 'critical']),
                    message: z.string(),
                    subjectDn: z.string().optional(),
                    attribute: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            completedAt: z.string().datetime({ offset: true }).optional(),
            notes: z.string().optional(),
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
    path: '/v1/config-cert-reviews/:reviewId/complete',
    alias: 'completeConfigCertReview',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: completeConfigCertReview_Body,
      },
      {
        name: 'reviewId',
        type: 'Path',
        schema: z.string().regex(/^cfg_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            reviewId: z.string().regex(/^cfg_[0-9A-HJKMNP-TV-Z]{26}$/),
            networkId: z.string().regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/),
            scheduledAt: z.string().datetime({ offset: true }),
            status: z.enum([
              'scheduled',
              'in_progress',
              'completed',
              'overdue',
            ]),
            subjectBoundCertCount: z.number().int().gte(0),
            findings: z
              .array(
                z
                  .object({
                    severity: z.enum(['info', 'warn', 'critical']),
                    message: z.string(),
                    subjectDn: z.string().optional(),
                    attribute: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            completedAt: z.string().datetime({ offset: true }).optional(),
            notes: z.string().optional(),
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
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
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
