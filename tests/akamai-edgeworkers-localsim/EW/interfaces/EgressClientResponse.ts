/**
 * akamai-edgeworkers-localsim/EW/interfaces/EgressClientResponse.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

import { MutatesHeaders } from "./MutatesHeaders";
import { ReadsHeaders } from "./ReadsHeaders";
import { HasStatus } from "./HasStatus";

// onClientResponse
export interface EgressClientResponse extends MutatesHeaders, ReadsHeaders, HasStatus {}
