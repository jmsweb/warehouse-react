const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  return {
    entry: {
      app: {
        import: './src/main.js',
        dependOn: 'shared'
      },
      shared: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-bootstrap',
        'react-bootstrap-icons',
        'bootstrap',
        'html5-qrcode'
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 10000,
        maxSize: 250000,
      },
    },
    output: {
      path: env.output_path, // the bundle output path
      publicPath: '/',       // base url for built and copied resources
      filename: '[name].[chunkhash].js', // the name of the bundle
      clean: true,
    },
    performance: {
      assetFilter: (asset) => !asset.endsWith('.png')
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html', // to import index.html file inside index.js
        inject: 'head',
        title: `Warehouse - React (${env.build})`
      }),
      new CopyWebpackPlugin({
        patterns: [{
          from: 'public/static',
          to: ''
        }]
      }),
      new webpack.EnvironmentPlugin({
        SITE_BUILD: env.build,
        WAREHOUSE_API: env.warehouse_api
      }),
      //new BundleAnalyzerPlugin()
    ],
    devServer: {
      host: 'localhost',
      port: 3001,
      server: {
          // DISABLED HTTPS FOR INTEGRATION AND DEVELOPMENT
          // type: 'https',
          // options: {
          //     cert: 'C:/dev/httpd-2.4.57/Apache24/certs/apache.crt',
          //     key: 'C:/dev/httpd-2.4.57/Apache24/certs/apache.key'
          // }
      },
      open: true,
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // .js and .jsx files
          exclude: /node_modules/, // excluding the node_modules folder
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(sass|scss|css)$/, // styles files
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        }
      ],
    },
  };
};