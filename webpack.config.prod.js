const path = require('path');

const PROJECTS_DIR = path.resolve(__dirname, '..');

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname),
  entry: [
    path.resolve(PROJECTS_DIR, 'reservation-service', 'client', 'index.prod.jsx'),
    path.resolve(PROJECTS_DIR, 'reviews-service', 'client', 'index.jsx')
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64:8]',
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
