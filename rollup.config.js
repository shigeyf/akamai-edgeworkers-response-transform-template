/*
 * rollup.config.js
 */

import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.ts",
  output: {
    dir: "dist",
    format: "es"
  },
  external: ['create-response', 'http-request', 'log', 'streams', 'text-encode-transform'],
  plugins: [typescript(), commonjs(), resolve()],
};