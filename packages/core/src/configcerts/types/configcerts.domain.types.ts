/**
 * Configcerts Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/configcerts.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ConfigCertFinding = components["schemas"]["ConfigCertFinding"];
export type ConfigCertReview = components["schemas"]["ConfigCertReview"];
export type ConfigCertReviewListData = components["schemas"]["ConfigCertReviewListData"];
export type ConfigCertReviewStatus = components["schemas"]["ConfigCertReviewStatus"];
export type CompleteConfigCertReviewRequest = components["schemas"]["CompleteConfigCertReviewRequest"];
export type ConfigCertReviewCreateRequest = components["schemas"]["ConfigCertReviewCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateConfigCertReviewRequestInput = NonNullable<operations["createConfigCertReview"]["requestBody"]>["content"]["application/json"];
export type CompleteConfigCertReviewRequestInput = NonNullable<operations["completeConfigCertReview"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListConfigCertReviewsParams = NonNullable<operations["listConfigCertReviews"]["parameters"]["query"]>;
export type GetConfigCertReviewParams = operations["getConfigCertReview"]["parameters"]["path"];
export type CompleteConfigCertReviewParams = operations["completeConfigCertReview"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListConfigCertReviewsResponse = operations["listConfigCertReviews"]["responses"]["200"]["content"]["application/json"];
export type CreateConfigCertReviewResponse = operations["createConfigCertReview"]["responses"]["201"]["content"]["application/json"];
export type GetConfigCertReviewResponse = operations["getConfigCertReview"]["responses"]["200"]["content"]["application/json"];
export type CompleteConfigCertReviewResponse = operations["completeConfigCertReview"]["responses"]["200"]["content"]["application/json"];


