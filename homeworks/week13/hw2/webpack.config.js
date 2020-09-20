const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  mode: 'production',
  entry: './src/index.js',
  output: {
    library: 'commentPlugin',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
