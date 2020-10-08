const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment =
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === undefined ||
  false;

const fontsPath = isDevelopment
  ? 'assets/fonts'
  : 'assets/fonts/font-sourcesanspro';

const PATH = {
  SRC: path.join(__dirname, '/src'),
  DIST: path.join(__dirname, '/dist'),
  FONTS: path.join(__dirname, '/dist/fonts'),
  ASSETS: path.join(__dirname, '/assets')
};

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: path.join(PATH.SRC, 'index.tsx')
  },
  output: {
    path: PATH.DIST,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      assets: path.resolve(PATH.ASSETS),
      src: path.resolve(PATH.SRC)
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDevelopment,
              reloadAll: isDevelopment
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        include: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDevelopment,
              reloadAll: isDevelopment
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: false
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: { name: `${fontsPath}/[name].[ext]` }
      },
      {
        test: /\.(svg)$/i,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            options: {
              tsx: true
            }
          }
        ]
      },
      {
        test: /\.inline\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader',
        options: { name: 'assets/img/[name].[ext]' }
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_MASS_CRM_BASE_URL': JSON.stringify(
        process.env.REACT_APP_MASS_CRM_BASE_URL
      ),
      'process.env.WS_URL': JSON.stringify(process.env.WS_URL)
    })
  ]
};
