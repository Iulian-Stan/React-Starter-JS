const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_env, argv) => {
  const devMode = argv.mode !== 'production';
  return {
    entry: './src/index.jsx', // Entry point of your application
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js', // Output bundle file name
      clean: true
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
            // Inject CSS into the DOM in development and extract it into separate files in production
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
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
    plugins: [
      // Helps building index.html (adds bundle.js)
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html')
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      })
    ],
    // Development server
    devServer: {
      port: 9000,
    },
    // Development tools
    devtool: devMode ? 'source-map' : undefined
  };
};
