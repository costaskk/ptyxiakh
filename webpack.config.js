var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const HappyPack = require('happypack');

//const webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
      filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /.js$/,
            use: ['happypack/loader'],
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
    },
    node: {
      fs: 'empty'
    },
    plugins: [
      new HardSourceWebpackPlugin(),
      new HappyPack({
        // 3) re-add the loaders you replaced above in #1:
        loaders: [ 'babel-loader?presets[]=env' ]
      })
    ]
  };