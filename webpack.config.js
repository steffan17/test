const path = require('path');

module.exports = {
  entry: 
    {
    bundle: './src/js/index.js',
    style: './src/styles/style.js'
    },
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, 'public'),
  },
  mode: 'none',
  module:
{
  rules:
  [
        {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
          {
              loader: 'file-loader',
              options: { outputPath: 'css/', name: '[name].min.css'}
          },
          'sass-loader'
      ]
        }
  ]
},
watch: true
};
