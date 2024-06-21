import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import pkg from "./package.json" assert { type: "json" };

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
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled"
    }),
    terser()
  ]
}, {
  input: "src/index.js",
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" }
  ],
  plugins: [
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled"
    })
  ]
}];
