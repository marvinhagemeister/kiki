const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const globals = require('rollup-plugin-node-globals');
const nodeResolve = require('rollup-plugin-node-resolve');

let plugins = [
  globals(),
  nodeResolve({
    jsnext: true,
    main: true,
    browser: true,
    preferBuiltins: false
  }),
  commonjs({
    include: ['node_modules/**', 'scripts/vendor/**'],
    exclude: ['node_modules/moment/**'],
    namedExports: {
      'node_modules/jquery/dist/jquery.min.js': ['jquery'],
      'node_modules/handlebars/dist/handlebars.min.js': ['handlebars'],
    }
  }),
  babel({
    exclude: ['node_modules/**', 'scripts/vendor/**'],
    runtimeHelpers: true
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(uglify());
}

export default {
  entry: 'scripts/main.js',
  dest: 'sites/_default/public/assets/js/bundle.js',
  format: 'iife',
  external: [
    'ai'
  ],
  moduleName: 'app',
  sourceMap: true,
  globals: {
    ai: 'ai'
  },
  plugins
}
