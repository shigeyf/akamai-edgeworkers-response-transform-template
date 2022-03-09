/**
 * akamai-edgeworkers-localsim/EW/interfaces/MutableRequest.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

import { MutatesHeaders } from "./MutatesHeaders";
import { ReadsHeaders } from "./ReadsHeaders";
import { ReadsVariables } from "./ReadsVariables";
import { Request } from "./Request";

// Legacy interfaces for backwards compatability
export interface MutableRequest extends MutatesHeaders, ReadsHeaders, ReadsVariables, Request {}
