import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createDpiaExport_Body = z
  .object({
    period: z.string(),
    networkId: z
      .string()
      .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    includeHashMap: z.boolean().optional().default(true),
    includeErasureDrills: z.boolean().optional().default(true),
    includeViolations: z.boolean().optional().default(true),
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
const FabricComplianceReport = z
  .object({
    period: z.string(),
    networkId: z
      .string()
      .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    proposalsBlocked: z.number().int().gte(0),
    pdcFlags: z.number().int().gte(0),
    encryptOnChainFlags: z.number().int().gte(0).optional(),
    clientCertPdFlags: z.number().int().gte(0).optional(),
    erasuresCompleted: z.number().int().gte(0),
    orphanedHashes: z.number().int().gte(0),
    erasureDrillPassRate: z.number().gte(0).lte(1).optional(),
    peersQuarantined: z.number().int().gte(0).optional(),
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
const FabricComplianceReportResponse = z
  .object({
    data: z
      .object({
        period: z.string(),
        networkId: z
          .string()
          .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        proposalsBlocked: z.number().int().gte(0),
        pdcFlags: z.number().int().gte(0),
        encryptOnChainFlags: z.number().int().gte(0).optional(),
        clientCertPdFlags: z.number().int().gte(0).optional(),
        erasuresCompleted: z.number().int().gte(0),
        orphanedHashes: z.number().int().gte(0),
        erasureDrillPassRate: z.number().gte(0).lte(1).optional(),
        peersQuarantined: z.number().int().gte(0).optional(),
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
const DpiaExportCreateRequest = z
  .object({
    period: z.string(),
    networkId: z
      .string()
      .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    includeHashMap: z.boolean().optional().default(true),
    includeErasureDrills: z.boolean().optional().default(true),
    includeViolations: z.boolean().optional().default(true),
  })
  .passthrough();
const DpiaExportJobId = z.string();
const JobStatus = z.enum(['queued', 'running', 'done', 'failed']);
const DpiaExportJob = z
  .object({
    jobId: z.string().regex(/^dpi_[0-9A-HJKMNP-TV-Z]{26}$/),
    period: z.string(),
    networkId: z
      .string()
      .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    status: z.enum(['queued', 'running', 'done', 'failed']),
    downloadUrl: z.string().url().optional(),
    errorMessage: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    completedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const DpiaExportJobResponse = z
  .object({
    data: z
      .object({
        jobId: z.string().regex(/^dpi_[0-9A-HJKMNP-TV-Z]{26}$/),
        period: z.string(),
        networkId: z
          .string()
          .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        status: z.enum(['queued', 'running', 'done', 'failed']),
        downloadUrl: z.string().url().optional(),
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

export const schemas: any = {
  createDpiaExport_Body,
  NetworkId,
  Problem,
  FabricComplianceReport,
  ResponseMeta,
  FabricComplianceReportResponse,
  DpiaExportCreateRequest,
  DpiaExportJobId,
  JobStatus,
  DpiaExportJob,
  DpiaExportJobResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/reports/compliance',
    alias: 'getFabricComplianceReport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'period',
        type: 'Query',
        schema: z.string().optional(),
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
            period: z.string(),
            networkId: z
              .string()
              .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            proposalsBlocked: z.number().int().gte(0),
            pdcFlags: z.number().int().gte(0),
            encryptOnChainFlags: z.number().int().gte(0).optional(),
            clientCertPdFlags: z.number().int().gte(0).optional(),
            erasuresCompleted: z.number().int().gte(0),
            orphanedHashes: z.number().int().gte(0),
            erasureDrillPassRate: z.number().gte(0).lte(1).optional(),
            peersQuarantined: z.number().int().gte(0).optional(),
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
    path: '/v1/reports/dpia-export',
    alias: 'createDpiaExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createDpiaExport_Body,
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
            jobId: z.string().regex(/^dpi_[0-9A-HJKMNP-TV-Z]{26}$/),
            period: z.string(),
            networkId: z
              .string()
              .regex(/^net_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            status: z.enum(['queued', 'running', 'done', 'failed']),
            downloadUrl: z.string().url().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
