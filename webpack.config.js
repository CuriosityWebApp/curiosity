const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config();

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  mode: 'development',
  entry: {
    app: ['babel-polyfill', `${SRC_DIR}/index.jsx`],
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env', 'react', 'stage-0'],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
        include: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.stripe_public_key': JSON.stringify(process.env.stripe_public_key),
      'process.env.firebaseKey': JSON.stringify(process.env.firebaseKey),
      'process.env.firebaseDomain': JSON.stringify(process.env.firebaseDomain),
      'process.env.apolloUri': JSON.stringify(process.env.apolloUri),
      'process.env.ADMINID': JSON.stringify(process.env.ADMINID),
    }),
  ],
};
