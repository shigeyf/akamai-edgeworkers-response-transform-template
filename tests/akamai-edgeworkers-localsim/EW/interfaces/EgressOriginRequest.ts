/**
 * akamai-edgeworkers-localsim/EW/interfaces/EgressOriginRequest.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

import { ReadsHeaders } from "./ReadsHeaders";
import { ReadsVariables } from "./ReadsVariables";
import { Request } from "./Request";
import { HasRespondWith } from "./HasRespondWith";
import { MutatesVariables } from "./MutatesVariables"
 
// onOriginResponse
export interface EgressOriginRequest extends ReadsHeaders, ReadsVariables, Request, HasRespondWith, MutatesVariables {}
