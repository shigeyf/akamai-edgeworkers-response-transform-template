/**
 * akamai-edgeworkers-localsim/EW/interfaces/MutatesVariables.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

export interface MutatesVariables {
    /**
     * Sets the value of a metadata variable,
     */
    /**
     * Sets the value of a Property Manager user-defined variable.
     * Only variables that start with a PMUSER_ prefix are available.
     * The name of the variable must be UPPERCASE.
     *
     * The total size limit when creating Property Manager user-defined variables is 1024 characters.
     * This limit includes the name and value of the variable and only applies to EdgeWorkers added or modified using the JavaScript API.
     * The 1024 character limit is a modification limit that only applies to setVariable, not getVariable.
     * For example, if you use advanced metadata to create a PMUSER_ variable in a property with a value that exceeds 1024 characters,
     * the EdgeWorkers function can still read the value.
     *
     * If however, you then wanted to modify that variable,
     * you could do so up to 1024 characters (including the name and value of the variable).
     * This 1024 limit is cumulative for all setVariable calls in the execution of a given event.
     * If you exceed the limit, setVariable will throw an exception.
     * If the variable name does not start with 'PMUSER_', setVariable will throw an exception.
     *
     * @param name Names of the user-defined variables to set
     * @param value Value to assign to the variable
     */
    setVariable(name: string, value: string): void;
}
