import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import buble from "rollup-plugin-buble";
import uglify from "rollup-plugin-uglify-es";
import pkg from "./package.json";

export default [{
  input: "src/index.js",
  output: {
    file: pkg.browser,
    format: "umd",
    name: "MagicGrid"
  },
  plugins: [
    resolve(),
    commonjs(),
    buble({ // transpile ES2015+ to ES5
      exclude: ["node_modules/**"],
      transforms: { forOf: false }
    }),
    uglify()
  ]
}, {
  input: "src/index.js",
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" }
  ],
  plugins: [
    buble({
      exclude: ["node_modules/**"],
      transforms: { forOf: false }
    })
  ]
}];
