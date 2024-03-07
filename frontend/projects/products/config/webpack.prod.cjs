const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const { merge } = require('webpack-merge');

const packageJson = require('../package.json');
const commonConfig = require('./webpack.common.cjs');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash]_mini.js',
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'products',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductsIndex': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
