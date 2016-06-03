const compileSass = require('broccoli-sass');
const compileES6  = require('broccoli-rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs    = require('rollup-plugin-commonjs');
const babel       = require('rollup-plugin-babel');
const replace     = require('rollup-plugin-replace');
const mergeTrees  = require('broccoli-merge-trees');
const funnel      = require('broccoli-funnel');

const SRC_DIR = 'src';

const html    = funnel(SRC_DIR, {include: ['index.html']});
const styles  = compileSass([SRC_DIR], 'index.scss', 'goban.css');
const scripts = compileES6(SRC_DIR, {
    inputFiles: ['**/*.js'],
    rollup: {
      entry: 'index.js',
      plugins: [
        nodeResolve({
          jsnext: true,
          main:   true
        }),
        commonjs(),
        babel(),
        replace({
          'process.env.NODE_ENV': JSON.stringify( 'production' )
        })
      ],
      dest: 'goban.js'
    }
  });

module.exports = mergeTrees([html, styles, scripts]);
