/**
 * Policies Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/policies.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Fab5097PdcMode = components["schemas"]["Fab5097PdcMode"];
export type FabricPolicy = components["schemas"]["FabricPolicy"];
export type FabricPolicyListData = components["schemas"]["FabricPolicyListData"];
export type FabricPolicySimulateFields = components["schemas"]["FabricPolicySimulateFields"];
export type FabricPolicyStatus = components["schemas"]["FabricPolicyStatus"];
export type FieldCoverage = components["schemas"]["FieldCoverage"];
export type PolicySimulatePdHit = components["schemas"]["PolicySimulatePdHit"];
export type PolicySimulateSummary = components["schemas"]["PolicySimulateSummary"];
export type FabricPolicyCreateRequest = components["schemas"]["FabricPolicyCreateRequest"];
export type FabricPolicySimulateRequest = components["schemas"]["FabricPolicySimulateRequest"];
export type FabricPolicyUpdateRequest = components["schemas"]["FabricPolicyUpdateRequest"];
export type Policy = operations["listFabricPolicies"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateFabricPolicyRequestInput = NonNullable<operations["createFabricPolicy"]["requestBody"]>["content"]["application/json"];
export type UpdateFabricPolicyRequestInput = NonNullable<operations["updateFabricPolicy"]["requestBody"]>["content"]["application/json"];
export type UpdateFabricPolicyRequest = UpdateFabricPolicyRequestInput;
export type SimulateFabricPolicyRequestInput = NonNullable<operations["simulateFabricPolicy"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListFabricPoliciesParams = NonNullable<operations["listFabricPolicies"]["parameters"]["query"]>;
export type GetFabricPolicyParams = operations["getFabricPolicy"]["parameters"]["path"];
export type UpdateFabricPolicyParams = operations["updateFabricPolicy"]["parameters"]["path"];
export type PublishFabricPolicyParams = operations["publishFabricPolicy"]["parameters"]["path"];
export type SimulateFabricPolicyParams = operations["simulateFabricPolicy"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListFabricPoliciesResponse = operations["listFabricPolicies"]["responses"]["200"]["content"]["application/json"];
export type CreateFabricPolicyResponse = operations["createFabricPolicy"]["responses"]["201"]["content"]["application/json"];
export type GetFabricPolicyResponse = operations["getFabricPolicy"]["responses"]["200"]["content"]["application/json"];
export type UpdateFabricPolicyResponse = operations["updateFabricPolicy"]["responses"]["200"]["content"]["application/json"];
export type PublishFabricPolicyResponse = operations["publishFabricPolicy"]["responses"]["200"]["content"]["application/json"];
export type SimulateFabricPolicyResponse = operations["simulateFabricPolicy"]["responses"]["200"]["content"]["application/json"];


