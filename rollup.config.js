import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import prettier from "rollup-plugin-prettier";
import terser from "@rollup/plugin-terser";
import pkg from "./package.json" assert { type: "json" };

export default [{
  input: "src/index.js",
  output: {
    file: pkg.browser,
    format: "umd",
    name: "MagicGrid",
    sourcemap: true
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled"
    }),
    terser({
      format: {
        comments: true,
      },
      mangle: {
        keep_classnames: true,
        keep_fnames: true,
      }
    }) // Only terser for UMD minification
  ]
}, {
  input: "src/index.js",
  output: [
    { file: pkg.main, format: "cjs", sourcemap: true },
    { file: pkg.module, format: "es", sourcemap: true }
  ],
  plugins: [
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled"
    }),
    prettier({
      tabWidth: 2,
      singleQuote: true,
      bracketSpacing: true,
      jsxBracketSameLine: false,
      parser: "babel",
      trailingComma: "none",
      arrowParens: "always",
      semi: true,
      proseWrap: "always",
      endOfLine: "lf"
    })
  ]
}];
