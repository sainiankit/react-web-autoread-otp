/* eslint-disable */
var path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'index',
    globalObject: "this",
    libraryTarget: 'commonjs2'
  },
  externals: {
    react: 'commonjs react',
   'react-dom': 'commonjs react-dom',
 },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.join(__dirname, 'src'),
        exclude: path.join(__dirname, '/node_modules/'),
        use: ['babel-loader', 'ts-loader'],
      }
    ]
  }
};