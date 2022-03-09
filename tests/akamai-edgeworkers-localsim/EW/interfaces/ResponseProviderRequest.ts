/**
 * akamai-edgeworkers-localsim/EW/interfaces/ResponseProviderRequest.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

import { Request } from "./Request";
import { ReadsHeaders } from "./ReadsHeaders";
import { ReadAllHeader } from "./ReadAllHeaders";

export interface ResponseProviderRequest extends Request, ReadsHeaders, ReadAllHeader {}
