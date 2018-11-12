import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify-es'
import pkg from './package.json'

export default [{
  entry: 'src/index.js',
  dest: pkg.browser,
  format: 'umd',
  moduleName: 'MagicGrid',
  plugins: [
    resolve(),
    commonjs(),
    buble({ // transpile ES2015+ to ES5
      exclude: ['node_modules/**'],
      transforms: { forOf: false }
    }),
    uglify()
  ]
}, {
  entry: 'src/index.js',
  targets: [
    { dest: pkg.main, format: 'cjs' },
    { dest: pkg.module, format: 'es' }
  ],
  plugins: [
    buble({
      exclude: ['node_modules/**'],
      transforms: { forOf: false }
    })
  ]
}]
