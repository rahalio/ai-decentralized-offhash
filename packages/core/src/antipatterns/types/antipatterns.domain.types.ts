/**
 * Antipatterns Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/antipatterns.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AntiPatternFlag = components["schemas"]["AntiPatternFlag"];
export type AntiPatternFlagListData = components["schemas"]["AntiPatternFlagListData"];
export type AntiPatternType = components["schemas"]["AntiPatternType"];
export type AcceptAntiPatternRiskRequest = components["schemas"]["AcceptAntiPatternRiskRequest"];
export type AntiPatternFlagCreateRequest = components["schemas"]["AntiPatternFlagCreateRequest"];
export type AntiPattern = operations["listAntiPatternFlags"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type FlagAntiPatternRequestInput = NonNullable<operations["flagAntiPattern"]["requestBody"]>["content"]["application/json"];
export type AcceptAntiPatternRiskRequestInput = NonNullable<operations["acceptAntiPatternRisk"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListAntiPatternFlagsParams = NonNullable<operations["listAntiPatternFlags"]["parameters"]["query"]>;
export type GetAntiPatternFlagParams = operations["getAntiPatternFlag"]["parameters"]["path"];
export type AcceptAntiPatternRiskParams = operations["acceptAntiPatternRisk"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListAntiPatternFlagsResponse = operations["listAntiPatternFlags"]["responses"]["200"]["content"]["application/json"];
export type FlagAntiPatternResponse = operations["flagAntiPattern"]["responses"]["201"]["content"]["application/json"];
export type GetAntiPatternFlagResponse = operations["getAntiPatternFlag"]["responses"]["200"]["content"]["application/json"];
export type AcceptAntiPatternRiskResponse = operations["acceptAntiPatternRisk"]["responses"]["200"]["content"]["application/json"];


