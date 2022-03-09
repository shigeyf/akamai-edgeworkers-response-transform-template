/**
 * akamai-edgeworkers-localsim/EW/interfaces/ImmutableRequest.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

import { ReadsHeaders } from "./ReadsHeaders";
import { ReadsVariables } from "./ReadsVariables";

// Legacy interfaces for backwards compatability
export interface ImmutableRequest extends ReadsHeaders, ReadsVariables, Request {}
