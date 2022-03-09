/**
 * akamai-edgeworkers-localsim/EW/interfaces/Response.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

import { HasStatus } from "./HasStatus";
import { MutatesHeaders } from "./MutatesHeaders";
import { ReadsHeaders } from "./ReadsHeaders";

export interface Response extends HasStatus, MutatesHeaders, ReadsHeaders {}
