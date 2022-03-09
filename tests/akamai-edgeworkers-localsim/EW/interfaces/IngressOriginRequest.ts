/**
 * akamai-edgeworkers-localsim/EW/interfaces/IngressOriginRequest.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

import { MutatesHeaders } from "./MutatesHeaders";
import { ReadsHeaders } from "./ReadsHeaders";
import { ReadsVariables } from "./ReadsVariables";
import { Request } from "./Request";
import { MutatesVariables } from "./MutatesVariables";

// onOriginRequest
export interface IngressOriginRequest extends MutatesHeaders, ReadsHeaders, ReadsVariables, Request, MutatesVariables {}
