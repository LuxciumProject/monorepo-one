const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const { merge } = require('webpack-merge');

const packageJson = require('../package.json');
const commonConfig = require('./webpack.common.cjs');

const domain = process.env['PRODUCTION_DOMAIN'] || '';

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
      name: 'container',
      remotes: {
        products: `products@${domain}/products/remoteEntry.js`,
        cart: `cart@${domain}/cart/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
