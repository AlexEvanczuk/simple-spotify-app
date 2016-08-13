module.exports = {
  entry: '../components/application.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  debug : false,
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
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
}