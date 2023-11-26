const HtmlWebpackPluggin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.tsx', '.js', '.ts', '.mjs', '.mts', '.cjs', '.cts', '.json', '.jsonc'],
  },
  plugins: [
    new HtmlWebpackPluggin({
      template: './public/index.html',
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '..', 'dist'),
  },
};
