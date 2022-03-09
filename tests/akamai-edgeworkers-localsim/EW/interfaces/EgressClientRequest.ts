/**
 * akamai-edgeworkers-localsim/EW/interfaces/EgressOriginRequest.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

import { ReadsHeaders } from "./ReadsHeaders";
import { ReadsVariables } from "./ReadsVariables";
import { Request } from "./Request";
import { MutatesVariables } from "./MutatesVariables";

// onClientResponse
export interface EgressClientRequest extends ReadsHeaders, ReadsVariables, Request, MutatesVariables {}
