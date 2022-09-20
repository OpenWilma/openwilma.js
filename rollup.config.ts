import { resolve } from "path";
import { defineConfig } from "rollup";
import cleaner from "rollup-plugin-cleaner";
import typescript from "rollup-plugin-typescript2";
import versionInjector from "rollup-plugin-version-injector";

export default defineConfig({
    input: "src/index.ts",
    output: [
        {
            file: "./dist/index.js",
            format: "cjs",
            exports: "named",
            sourcemap: true,
        },
        {
            file: "./dist/index.mjs",
            format: "es",
            exports: "named",
            sourcemap: true,
        },
        {
            file: "./dist/index.global.js",
            format: "iife",
            name: "OpenWilma",
            sourcemap: true,
            globals: {
                "cross-fetch": "fetch.bind(globalThis)",
            },
        },
    ],
    external: ["cross-fetch"],
    plugins: [
        cleaner({ targets: ["./dist"] }),
        versionInjector({ injectInTags: { fileRegexp: /\.(js|mjs)$/, tagId: "VI", dateFormat: "yyyy-mm-dd" }, logLevel: "warn" }),
        typescript({ tsconfig: resolve(process.cwd(), "src", "tsconfig.json") }),
    ],
});
