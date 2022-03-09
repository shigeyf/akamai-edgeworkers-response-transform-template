/**
 * akamai-edgeworkers-localsim/EW/interfaces/EgressOriginResponse.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

import { MutatesHeaders } from "./MutatesHeaders";
import { ReadsHeaders } from "./ReadsHeaders";
import { HasStatus } from "./HasStatus";

// onOriginResponse
export interface EgressOriginResponse extends MutatesHeaders, ReadsHeaders, HasStatus {}
