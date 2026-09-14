/**
 * Hashes Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/hashes.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type SaltedHashRecord = components["schemas"]["SaltedHashRecord"];
export type SaltedHashRecordListData = components["schemas"]["SaltedHashRecordListData"];
export type SaltedHashStatus = components["schemas"]["SaltedHashStatus"];
export type SaltedHashRegisterRequest = components["schemas"]["SaltedHashRegisterRequest"];
export type HashRecord = operations["listSaltedHashRecords"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterSaltedHashRequestInput = NonNullable<operations["registerSaltedHash"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListSaltedHashRecordsParams = NonNullable<operations["listSaltedHashRecords"]["parameters"]["query"]>;
export type GetSaltedHashRecordParams = operations["getSaltedHashRecord"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListSaltedHashRecordsResponse = operations["listSaltedHashRecords"]["responses"]["200"]["content"]["application/json"];
export type RegisterSaltedHashResponse = operations["registerSaltedHash"]["responses"]["201"]["content"]["application/json"];
export type GetSaltedHashRecordResponse = operations["getSaltedHashRecord"]["responses"]["200"]["content"]["application/json"];


