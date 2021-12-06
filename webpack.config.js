const path = require("path")
const resolve = (dir) => path.join(__dirname, dir)
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = (env) => {
  let envConfig = {}
  let commonConfig = {
    target: "node",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: "babel-loader",
          },
          exclude: [path.join(__dirname, "node_modules")],
        },
      ],
    },
    resolve: {
      extensions: ["", ".html", ".js", ".json", ".scss", ".css"],
      alias: {
        "@": resolve("src"),
        "@demo": resolve("demo"),
        "@assets": resolve("src/assets"),
        "@utils": resolve("src/utils"),
      },
    },
    externals: [webpackNodeExternals()],
    optimization: {},
  }

  if (env.mode === "production") {
    envConfig = {
      entry: {
        Doraemon: {
          import: resolve("Doraemon.js"),
        },
      },
      output: {
        filename: "[name].js",
        path: resolve("lib"),
        clean: true,
        library: {
          name: "Doraemon",
          type: "umd",
        },
      },
      mode: env.mode,
      devtool: "source-map",
      // plugins: [
      //   new CopyWebpackPlugin({
      //     patterns: [{ from: "public" }],
      //   }),
      // ],
    }
  }

  let config = Object.assign(commonConfig, envConfig)

  return config
}
