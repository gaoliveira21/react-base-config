const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const ReactRefreshTypeScript = require('react-refresh-typescript');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'public', 'build'),
    publicPath: path.join(__dirname, 'public', 'build'),
    filename: 'app.bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.sass', 'scss'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              getCustomTransformers: () => ({
                before: isDevelopment ? [ReactRefreshTypeScript()] : [],
              }),
              transpileOnly: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true } },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'src', 'styles')]
              },
              additionalData: '@import "main.scss";',
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: path.join(__dirname, 'public', 'build', 'assets'),
              publicPath: path.join(__dirname, 'public', 'build', 'assets')
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: './public',
    publicPath: path.join(__dirname, 'public', 'build'),
    writeToDisk: true,
    historyApiFallback: true,
    port: 3000,
    open: true
  },
  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new CleanWebpackPlugin(),
    new Dotenv()
  ].filter(Boolean)
}
