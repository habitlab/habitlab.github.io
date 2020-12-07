var path = require('path')

var webpack = require('webpack')
//var BabiliPlugin = require("babili-webpack-plugin")

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true //Update this to true or false
  },
  watch: true,
  entry: {
    'index': './index.js',
    'bye': './bye.ls'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js"
  },
  //plugins: [
  //  new webpack.optimize.UglifyJsPlugin()
  //],
  //plugins: [
  //  new BabiliPlugin({}, {comments: false, sourceMap: false})
  //],
  module: {
    //loaders: [
    rules: [
      {
        test: /\.ls$/,
        loader: 'livescript-loader'
      }
      //{ test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
      //{ test: /\.(ttf|eot)$/, loader: 'file-loader' },
      //{
      //  test: /\.ls$/,
      //  loader: 'livescript-loader'
      //}
      /*
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
        //loader: 'file-loader?name=[path][name]'
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, use: 'url-loader?limit=100000' },
      */
      /*
      {
        test: /\.svg/i,
        loader: 'file-loader?name=[path][name]'
      },
      {
        test: /\.css$/,
        //loader: 'style-loader!css-loader'
        loader: 'file-loader?name=[path][name]'
      },
      {
        test: /\.html$/,
        loader: 'html-loader?attrs=false'
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader?name=[path][name]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader:'file-loader?name=[path][name]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader:'file-loader?name=[path][name]'
      }
      */
      /*
      {
        text: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {}
        }
      }
      */
    ]
  }
}