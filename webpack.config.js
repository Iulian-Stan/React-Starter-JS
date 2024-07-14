const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Output bundle file name
    publicPath: './'
  },
  module: {
    rules: [
      // Rule to load JavaScript (uses .babelrc)
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      // Rule to load CSS/SASS
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          //devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          // Interprets @import and url() like import/require() and resolves them
          {
            loader: 'css-loader',
            options: {
              modules: 'local',
              sourceMap: devMode,
            }
          },
          // Loads a Sass/SCSS file and compiles it to CSS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: devMode,
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // Develpoment server
  devServer: {
    port: 9000,
  },
  // Development tools
  devtool: devMode ? 'source-map' : undefined,
  plugins: [
    // Helps building index.html (adds bundle.js)
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ]
};

// const dev = {
//   devtool: 'source-map',
// };

// const prod = {
//   optimization: {
//       minimize: true,
//   }
// };

// module.exports = isProd ? merge(base, prod) : merge(base, dev);