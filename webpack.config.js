module.exports = {
  entry: './src/components/Application.js',
  output: {
    path: './dist/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  debug : false,
  devtool: 'inline-source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /(node_modules|bower_components)/,
      query: { 
        presets:['babel-preset-es2015', 'react']
      }
    }]
  },
}