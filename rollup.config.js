module.exports = {
  input: 'specs/lib/ipfs/keys.js',
  plugins: [
    require('rollup-plugin-json')(),
    require('rollup-plugin-node-resolve')(),
    require('rollup-plugin-commonjs')(),
    require('rollup-plugin-replace')({
      'process.env.NODE_ENV': JSON.stringify('test')
    })
  ],
  output: {
    file: 'bundle.js',
    format: 'iife'
  }
}
