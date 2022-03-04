/**
 * akamai-edgeworkers-localsim/EdgeGrid/edgerc.ts
 *
 * Copyright 2014 Akamai Technologies, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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

import * as fs from "fs";
import os from "os";
import path from "path";

function resolveHomeDir(filePath: string) {
    if (filePath[0] === "~") {
        return path.join(os.homedir(), filePath.slice(1));
    }
    return filePath;
}

function getSection(lines: string[], sectionName: string): string[] {
    const match = /^\s*\[(.*)]/;
    const section: string[] = [];

    lines.some(function (line, i) {
        const lineMatch = line.match(match),
            isMatch = lineMatch !== null && lineMatch[1] === sectionName;

        if (isMatch) {
            // go through section until we find a new one
            lines.slice(i + 1, lines.length).some(function (line) {
                const isMatch = line.match(match) !== null;
                if (!isMatch) {
                    section.push(line);
                }
                return isMatch;
            });
        }
        return isMatch;
    });
    return section;
}

function validatedConfig(config: { [key: string]: string }): { [key: string]: string } {
    if (!(config.host && config.access_token && config.client_secret && config.client_token)) {
        /*
        let errorMessage = "";
        const tokens = ["client_token", "client_secret", "access_token", "host"];
        tokens.forEach(function (token) {
            if (!config[token]) {
                errorMessage += "\nMissing: " + token;
            }
        });
        //console.log("Missing part of the configuration:\n" + errorMessage);
        */
        return {};
    }

    if (config.host.indexOf("https://") > -1) {
        return config;
    }
    config.host = "https://" + config.host;
    return config;
}

function buildConfig(configs: string[]): { [key: string]: string } {
    const result: { [key: string]: string } = {};
    let index: number, key: string, val: string, parsedValue: string, isComment: boolean;

    configs.forEach(function (config) {
        config = config.trim();
        isComment = config.indexOf(";") === 0;
        index = config.indexOf("=");
        if (index > -1 && !isComment) {
            key = config.substr(0, index);
            val = config.substring(index + 1);
            // remove inline comments
            parsedValue = val.replace(/^\s*(['"])((?:\\\1|.)*?)\1\s*(?:;.*)?$/, "$2");
            if (parsedValue === val) {
                // the value is not contained in matched quotation marks
                parsedValue = val.replace(/\s*([^;]+)\s*;?.*$/, "$1");
            }
            // Remove trailing slash as if often found in the host property
            if (parsedValue.endsWith("/")) {
                parsedValue = parsedValue.substr(0, parsedValue.length - 1);
            }
            result[key.trim()] = parsedValue;
        }
    });

    return validatedConfig(result);
}

function readEnvironmentVariables(section: string) {
    const requiredKeys = ["HOST", "ACCESS_TOKEN", "CLIENT_TOKEN", "CLIENT_SECRET"];
    const prefix = !section || section === "default" ? "AKAMAI_" : "AKAMAI_" + section.toUpperCase() + "_";
    const envConfig: { [key: string]: string } = {};

    for (const key of requiredKeys) {
        const varName = prefix + key;
        if (!process.env[varName]) {
            //logger.debug("Environment variable not set: " + varName);
            continue;
        }
        envConfig[key.toLowerCase()] = process.env[prefix + key] || "";
    }
    if (Object.keys(envConfig).length < requiredKeys.length) {
        return {};
    }
    //console.log("Using configuration from environment variables");
    return validatedConfig(envConfig);
}

export const edgerc = function (path: string, section: string): { [key: string]: string } {
    const configSection = section || "default";
    const configDataEnv = readEnvironmentVariables(configSection);
    if (configDataEnv["host"]) {
        return configDataEnv;
    }
    if (!path) {
        throw new Error(
            "Either path to '.edgerc' or environment variables with edgerc configuration has to be provided."
        );
    }
    path = resolveHomeDir(path);
    const edgerc = fs.readFileSync(path).toString().split("\n");
    const configDataFile = getSection(edgerc, configSection);

    if (!configDataFile.length) {
        throw new Error("An error occurred parsing the .edgerc file. You probably specified an invalid section name.");
    }

    return buildConfig(configDataFile);
};
