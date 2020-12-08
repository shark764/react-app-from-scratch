const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // the output bundle won't be optimized for production but suitable for development
  mode: 'development',
  // the app entry point is /src/index.js
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    // the output of the webpack build will be in /build directory
    path: path.resolve(__dirname, 'build'),
    // the filename of the JS bundle will be bundle.js
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        // use the babel-loader for transpiling JavaScript to a suitable format
        loader: 'babel-loader',
        // for any file with a suffix of js or jsx
        test: /\.(js|jsx)$/,
        // ignore transpiling JavaScript from node_modules as it should be that state
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  // add a custom index.html as the template
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: './index.html',
    }),
  ],
};
