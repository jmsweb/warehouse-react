const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  return {
    entry: {
      app: {
        import: './src/App.jsx',
        dependOn: 'shared'
      },
      home: {
        import: './src/view/home.jsx',
        dependOn: 'shared'
      },
      about: {
        import: './src/view/about.jsx',
        dependOn: 'shared'
      },
      contact: {
        import: './src/view/contact.jsx',
        dependOn: 'shared'
      },
      register: {
        import: './src/view/register.jsx',
        dependOn: 'shared'
      },
      termOfUse: {
        import: './src/view/term-of-use.jsx',
        dependOn: 'shared'
      },
      privacyPolicy: {
        import: './src/view/privacy-policy.jsx',
        dependOn: 'shared'
      },
      signIn: {
        import: './src/view/sign-in.jsx',
        dependOn: 'shared'
      },
      deal: {
        import: './src/view/deal.jsx',
        dependOn: 'shared'
      },
      cartReview: {
        import: './src/view/cart-review.jsx',
        dependOn: 'shared'
      },
      forgotPassword: {
        import: './src/view/forgot-password.jsx',
        dependOn: 'shared'
      },
      menu: {
        import: './src/component/menu/index.jsx',
        dependOn: 'shared'
      },
      footer: {
        import: './src/component/footer/index.jsx',
        dependOn: 'shared'
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'react-bootstrap', 'react-bootstrap-icons', 'bootstrap']
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
      })
    ],
    devServer: {
      host: 'dorado-pc.attlocal.net',
      port: 3001,
      server: {
          type: 'https',
          options: {
              cert: 'C:/dev/httpd-2.4.57/Apache24/certs/apache.crt',
              key: 'C:/dev/httpd-2.4.57/Apache24/certs/apache.key'
          }
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