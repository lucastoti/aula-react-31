module.exports = {
  presets: [
    // the "@babel/preset-env" preset transpiles newer javascript code to code
    // supported by 99.5% of in use browsers
    "@babel/preset-env", 
    // the "@babel/preset-react" preset transpiles jsx code to javascript
    "@babel/preset-react"
  ],
  // the "@babel/plugin-transform-runtime" plugin tells Babel to
  // require the runtime instead of inlining it.
  plugins: ["@babel/plugin-transform-runtime"]
}
