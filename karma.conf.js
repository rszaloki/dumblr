module.exports = function (config) {
  config.set({
    files: [
      /**
       * Make sure to disable Karma’s file watcher
       * because the preprocessor will use its own.
       */
      { pattern: 'external/libipfs.min.js', watched: false, served: true, included: true },
      { pattern: 'specs/**/*.js', watched: false }
    ],
    browsers: ['Chrome'],
    preprocessors: {
      'specs/**/*.js': ['rollup']
    },
    browserConsoleLogOptions: {
      level: 'debug',
      format: '%b %T: %m',
      terminal: true
    },
    frameworks: ['jasmine'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-rollup-preprocessor',
      'karma-coverage'
    ],
    reporters: ['coverage'],
    rollupPreprocessor: {
      /**
       * This is just a normal Rollup config object,
       * except that `input` is handled for you.
       */
      plugins: [
        require('rollup-plugin-node-resolve')(),
        require('rollup-plugin-commonjs')(),
        require('rollup-plugin-replace')({
          'process.env.NODE_ENV': JSON.stringify('test')
        }),
        require('rollup-plugin-istanbul')({
          exclude: ['specs/**/*.js']
        })
      ],
      output: {
        format: 'iife',            // Helps prevent naming collisions.
        name: 'storeTest',    // Required for 'iife' format.
        sourcemap: 'inline'        // Sensible for testing.
      }
    }
  })
}