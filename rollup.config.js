const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const babel = require("@rollup/plugin-babel");
const terser = require("@rollup/plugin-terser");
const pkg = require("./package.json");

module.exports = [{
  input: "src/index.js",
  output: {
    file: pkg.browser,
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
