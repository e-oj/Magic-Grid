/**
 * @author emmanuelolaojo
 * @since 11/11/18
 */

module.exports =  {
  entry: "./src/index.js",
  output: {
    filename: process.env.MIN === "yes" ? "magic-grid.min.js" : "magic-grid.js",
    library: "MagicGrid",
    libraryTarget: "var",
    libraryExport: "default"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  optimization: {
    minimize: process.env.MIN === "yes"
  }
};