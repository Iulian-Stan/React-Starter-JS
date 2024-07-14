# React Starter (JavaScript)

Sample starter React application.

## Preview

[React Starter JS](https://github.com/Iulian-Stan/React-Starter-JS/)

## Technologies

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Babel](https://babeljs.io/) - JavaScript transpiler used to convert ECMAScript 2015+ code into backwards-compatible JavaScript code that can be run by older JavaScript engines
* [Webpack](https://webpack.js.org/) - A module bundler for JavaScript
* [Jest](https://jestjs.io/) - A JavaScript Testing Framework with a focus on simplicity
* [ESLint](https://eslint.org/) - A static code analysis tool for JavaScript

## Project Structure

```
React-Starter/
 ├──public/                        * Static content (contains entry index.html) 
 ├──src/                           * Project source files
 |   ├──components/                * React components
 |   ├──theme/                     * Styling files (SASS)
 │   ├──App.jsx                    * Entry React component
 │   ├──index.jsx                  * Entry file of the application
 │   └──index.scss                 * Global styling
 ├──tests/                         * Project tests
 │   └──components/                * Component specific tests
 ├──.babelrc                       * Babel (JavaScript transpiler) configuration
 ├──.eslintrc                      * ESLint (Linter) configuration
 ├──jest.config.json               * Jest (Testing Framework) configuration
 └──webpack.config.json            * Webpack (Bundler) configuration

```

The best way to understand project structure is to inspect [Webpack configuration file](webpack.config.js).

### Application Entry Page

The entry page is [index.html](public/index.html) is located in the `public` folder:
```
plugins: [
  // Helps building index.html (adds bundle.js)
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'public', 'index.html')
  })
]
```

The content of this file is:
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Starter JS</title>
</head>
<body>
  <!-- this is where react renders into -->
  <div id="root"></div>
</body>
</html>
```

Note `<div id="root"></div>` element. It is used by entry script [index.jsx](src/index.jsx) to host React application content:
```
entry: './src/index.jsx'
```

Here's the corresponding code snippet from [index.jsx](src/index.jsx): 
```
ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);
```

[App](src/App.jsx) is the root component of the React application.

### Building the code

Note the `.jsx` extension of the script files. JSX is a syntax extension to JavaScript. It allows combining React UI components with JavaScript code. This code needs to be transpiled into native JavaScript to run in a web browser. 

Webpack defines rules on how each file type should be handled. Here's the corresponding rule:
```
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }
  ]
}
```

`babel-loader` uses [Babel](https://babeljs.io/) for `.js` and `.jsx` files. Babel also requires a configuration file [.babelrc](.babelrc):
```
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

Refer to [official documentation](https://babeljs.io/docs/configuration) for more details on configuration options.

### Styling

This example uses SCSS (Sassy CSS) for styling, meaning it works with standard CSS and some enhancement from Sass.

Webpack rules corresponding to the style files:
```
module: {
  rules: [
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
    }
  ],
  plugins:[
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ]
}
```

Note: Style files are imported into `.tsx` files as a standard module. To avoid compilation errors additional type definitions `.d.ts` files are required.

## Running the application

The application can be launched by invoking the `start` script defined in [package.json](package.json):
```
"scripts": {
  "start": "webpack serve --mode development"
}
```
`start` command will launch a development server that we can access on local host on port `9000`. To execute it run the `npm start` command.

## Bundling the application

The application is bundled by invoking the `build` script defined in [package.json](package.json):
```
"scripts": {
  "build": "webpack --mode production"
}
```
`build` will create a bundle and put it into the `dist` folder. To execute it run the `npm run build` command.

## Extra

### Testing

This example uses Jest for testing. Jest configuration is defined in [jest.config.json](jest.config.json):
```
{
  "moduleNameMapper": {
    "^.+\\.(css|less|scss)$": "babel-jest"
  },
  "testEnvironment": "jsdom"
}
```
The tests are placed in the `test` folder next to `src`. The corresponding script is defined in [package.json](package.json):
```
"scripts": {
  "test": "jest"
},
```
Tests are executed by running `npm run test`.

### Code Formatting

Last but not least, static code analysis and code formatting are performed using [ESLint](https://eslint.org/). Linting configuration is defined in a JSON file [.eslintrc.json](.eslintrc.json).

For explanation and list of supported options refer to the [official documentation](https://jestjs.io/docs/configuration).

There are two scripts dedicated for linting:
```
"scripts": {
  "lint": "eslint \"{src,tests}/**/*.{js,jsx}\"",
  "lint:fix": "eslint \"{src,tests}/**/*.{js,jsx}\" --fix"
}
```
Running `npm run lint` identifies problems in the source and test files and displays them directly in the terminal. `npm run lint:fix` identifies problems and fixes them directly in the source code if possible, in case a fix is not possible it will display the issue in the terminal.