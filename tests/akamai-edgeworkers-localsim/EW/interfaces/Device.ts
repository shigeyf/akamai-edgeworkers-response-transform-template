/**
 * akamai-edgeworkers-localsim/EW/interfaces/Device.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

/**
 * Notes:
 * * If device properties can not be supplied for any reason,
 *   undefined is returned for each property
 */
export interface Device {
    /**
     * Brand name of the device.
     */
    readonly brandName: string | undefined;

    /**
     * Model name of the device.
     */
    readonly modelName: string | undefined;

    /**
     * Marketing name of the device.
     */
    readonly marketingName: string | undefined;

    /**
     * Indicates if the device is a wireless device.
     */
    readonly isWireless: boolean | undefined;

    /**
     * Indicates if the device is a tablet.
     */
    readonly isTablet: boolean | undefined;

    /**
     * The device operation system.
     */
    readonly os: string | undefined;

    /**
     * The device operating system version.
     */
    readonly osVersion: string | undefined;

    /**
     * The mobile browser name.
     */
    readonly mobileBrowser: string | undefined;

    /**
     * The mobile browser version.
     */
    readonly mobileBrowserVersion: string | undefined;

    /**
     * The screen resolution width, in pixels.
     */
    readonly resolutionWidth: number | undefined;

    /**
     * The screen resolution height, in pixels.
     */
    readonly resolutionHeight: number | undefined;

    /**
     * The physical screen height, in millimeters.
     */
    readonly physicalScreenHeight: number | undefined;

    /**
     * The physical screen width, in millimeters.
     */
    readonly physicalScreenWidth: number | undefined;

    /**
     * Indicates if the browser supports cookies.
     */
    readonly hasCookieSupport: boolean | undefined;

    /**
     * Indicates if the device supports all of the following
     * JavaScript functions: "alert confirm access form elements
     * setTimeout setInterval and document.location"
     */
    readonly hasAjaxSupport: boolean | undefined;

    /**
     * Indicates if the browser supports Flash.
     */
    readonly hasFlashSupport: boolean | undefined;

    /**
     * Indicates if the browser accepts third party cookies.
     */
    readonly acceptsThirdPartyCookie: boolean | undefined;

    /**
     * Indicates the level of support for XHTML.
     */
    readonly xhtmlSupportLevel: number | undefined;

    /**
     * Indicates if the device is a mobile device.
     */
    readonly isMobile: boolean | undefined;
}
