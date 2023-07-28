const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.jsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  resolve: {
    // explicitly tell webpack to look for files with .jsx extension
    // (React file naming convention)
    extensions: [".js", ".jsx"]
  },
  // React needs an HTML node to render into
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "src/index.html"),
  })],
  module: {
    rules: [
      {
        // transpile both .js and .jsx files with babel
        test: /\.(jsx?)$/,
        // do not transpile code in node_modules
        exclude: /node_modules/,
        use: {
          // the babel-loader is used to transpile source to native javascript code
          loader: "babel-loader",
        }
      }
    ]
  }
};