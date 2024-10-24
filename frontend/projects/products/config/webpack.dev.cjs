const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');

const packageJson = require('../package.json');
const commonConfig = require('./webpack.common.cjs');

const devConfig = {
  mode: 'development', // 'development' or 'production',
  output: {
    filename: '[name].[contenthash]_dev.js',
  },
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
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

module.exports = merge(commonConfig, devConfig);
