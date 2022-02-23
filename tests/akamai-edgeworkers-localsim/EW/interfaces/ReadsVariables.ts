/**
 * akamai-edgeworkers-localsim/EW/interfaces/ReadsVariables.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

export interface ReadsVariables {
    /**
     * Gets the value of a Property Manager user-defined variable.
     * Only variables that start with a PMUSER_ prefix are available.
     * The name of the variable must be UPPERCASE.
     *
     * @param name Names of the user-defined variables If no variables exist, a value of undefined is returned.
     * @returns
     */
    getVariable(name: string): string | undefined;
}
