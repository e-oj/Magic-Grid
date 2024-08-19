const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const babel = require("@rollup/plugin-babel");
const terser = require("@rollup/plugin-terser");

module.exports = [{
  input: "src/index.js",
  output: {
    file: "dist/magic-grid.min.js",
    format: "umd",
    name: "MagicGrid"
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled"
    }),
    terser()
  ]
}];
