var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: [
      'webpack-hot-middleware/client',
      './client/client.js'
    ],
  },
  output: {
    path: require("path").resolve("./dist"),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'react-hmre']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      }
    ]
  }
}
