const HtmlWebpackPluggin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development', // 'development', // or 'production',
  // plugins: [new BundleAnalyzerPlugin()],
  devServer: {
    port: 8081,
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'products',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductsIndex': './src/bootstrap',
      },
      shared: ['@faker-js/faker'],
    }),
    new HtmlWebpackPluggin({
      template: './public/index.html',
    }),
  ],
};
