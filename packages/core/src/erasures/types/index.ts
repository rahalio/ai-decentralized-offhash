/**
 * Erasures Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/erasures.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DrillResult = components["schemas"]["DrillResult"];
export type ErasureDrill = components["schemas"]["ErasureDrill"];
export type ErasureDrillListData = components["schemas"]["ErasureDrillListData"];
export type ErasureJob = components["schemas"]["ErasureJob"];
export type ErasureJobListData = components["schemas"]["ErasureJobListData"];
export type ErasureJobStatus = components["schemas"]["ErasureJobStatus"];
export type OrphanizationProof = components["schemas"]["OrphanizationProof"];
export type ErasureDrillCreateRequest = components["schemas"]["ErasureDrillCreateRequest"];
export type ErasureJobCreateRequest = components["schemas"]["ErasureJobCreateRequest"];
export type Erasure = operations["listErasureJobs"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type ExecutePdErasureRequestInput = NonNullable<operations["executePdErasure"]["requestBody"]>["content"]["application/json"];
export type CreateErasureDrillRequestInput = NonNullable<operations["createErasureDrill"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListErasureJobsParams = NonNullable<operations["listErasureJobs"]["parameters"]["query"]>;
export type GetErasureJobParams = operations["getErasureJob"]["parameters"]["path"];
export type ListErasureDrillsParams = NonNullable<operations["listErasureDrills"]["parameters"]["query"]>;
export type GetErasureDrillParams = operations["getErasureDrill"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListErasureJobsResponse = operations["listErasureJobs"]["responses"]["200"]["content"]["application/json"];
export type ExecutePdErasureResponse = operations["executePdErasure"]["responses"]["202"]["content"]["application/json"];
export type GetErasureJobResponse = operations["getErasureJob"]["responses"]["200"]["content"]["application/json"];
export type ListErasureDrillsResponse = operations["listErasureDrills"]["responses"]["200"]["content"]["application/json"];
export type CreateErasureDrillResponse = operations["createErasureDrill"]["responses"]["201"]["content"]["application/json"];
export type GetErasureDrillResponse = operations["getErasureDrill"]["responses"]["200"]["content"]["application/json"];


