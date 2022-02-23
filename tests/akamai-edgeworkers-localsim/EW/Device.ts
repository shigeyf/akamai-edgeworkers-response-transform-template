/**
 * tests/akamai-edgeworkers-localsim/EW/Device.ts
 *
 * Copyright (c) 2021 Shigeyuki Fukushima <shigeyf@outlook.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

/**
 * Notes:
 * * If device properties can not be supplied for any reason,
 *   undefined is returned for each property
 */
export class Device {
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

    constructor(
        brandName?: string,
        modelName?: string,
        marketingName?: string,
        isWireless?: boolean,
        isTablet?: boolean,
        os?: string,
        osVersion?: string,
        mobileBrowser?: string,
        mobileBrowserVersion?: string,
        resolutionWidth?: number,
        resolutionHeight?: number,
        physicalScreenHeight?: number,
        physicalScreenWidth?: number,
        hasCookieSupport?: boolean,
        hasAjaxSupport?: boolean,
        hasFlashSupport?: boolean,
        acceptsThirdPartyCookie?: boolean,
        xhtmlSupportLevel?: number,
        isMobile?: boolean
    ) {
        this.brandName = brandName;
        this.modelName = modelName;
        this.marketingName = marketingName;
        this.isWireless = isWireless;
        this.isTablet = isTablet;
        this.os = os;
        this.osVersion = osVersion;
        this.mobileBrowser = mobileBrowser;
        this.mobileBrowserVersion = mobileBrowserVersion;
        this.resolutionWidth = resolutionWidth;
        this.resolutionHeight = resolutionHeight;
        this.physicalScreenWidth = physicalScreenWidth;
        this.physicalScreenHeight = physicalScreenHeight;
        this.hasCookieSupport = hasCookieSupport;
        this.hasAjaxSupport = hasAjaxSupport;
        this.hasFlashSupport = hasFlashSupport;
        this.acceptsThirdPartyCookie = acceptsThirdPartyCookie;
        this.xhtmlSupportLevel = xhtmlSupportLevel;
        this.isMobile = isMobile;
    }
}
