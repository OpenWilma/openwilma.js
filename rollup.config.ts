import json from "rollup-plugin-json";
import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import uglify from "@lopatnov/rollup-plugin-uglify";

import pkg from "./package.json";

export default [
  {
    input: `lib/${pkg.libraryFile}.ts`,
    output: [
      {
        file: pkg.main,
        format: "umd",
        name: pkg.umdName,
        sourcemap: true
      }
    ],
    external: [
      ...Object.keys(pkg.devDependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      json(),
      typescript({
        typescript: require("typescript")
      }),
      resolve(),
      commonjs()
    ]
  },
  {
    input: `lib/${pkg.libraryFile}.ts`,
    output: {
      file: `dist/${pkg.libraryFile}.min.js`,
      name: pkg.umdName,
      format: "umd",
      sourcemap: true
    },
    external: [
      ...Object.keys(pkg.devDependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      json(),
      typescript({
        typescript: require("typescript")
      }),
      resolve(),
      commonjs(),
      uglify()
    ]
  }
];
