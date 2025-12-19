const path = require('path');

module.exports = {
  mode: 'development',
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    three: 'THREE'
  },
  devServer: {
    static: {
      directory: __dirname,
    },
    port: 8080,
    open: true,
  }
};
