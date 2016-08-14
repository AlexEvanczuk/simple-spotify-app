module.exports = {
  entry: './app/shared/js/components/Application.js',
  output: {
    path: './app/shared/js/',
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