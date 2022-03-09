/**
 * akamai-edgeworkers-localsim/EW/interfaces/IngressClientRequest.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

import { MutatesHeaders } from "./MutatesHeaders";
import { ReadsHeaders } from "./ReadsHeaders";
import { ReadsVariables } from "./ReadsVariables";
import { Request } from "./Request";
import { HasRespondWith } from "./HasRespondWith";
import { HasRoute } from "./HasRoute";
import { HasCacheKey } from "./HasCacheKey";
import { MutatesVariables } from "./MutatesVariables";

// onClientRequest
export interface IngressClientRequest
    extends MutatesHeaders,
        ReadsHeaders,
        ReadsVariables,
        Request,
        HasRespondWith,
        HasRoute,
        HasCacheKey,
        MutatesVariables {}
