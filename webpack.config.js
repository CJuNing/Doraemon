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
        // {
        //   test: /\.css$/i,
        //   use: ["style-loader", "css-loader"],
        // },
        // {
        //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
        //   type: "asset/resource",
        // },
        // {
        //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
        //   type: "asset/resource",
        // },
      ],
    },
    resolve: {
      extensions: ["", ".html", ".js", ".json", ".scss", ".css"],
      alias: {
        "@": resolve("src"),
        "@test": resolve("test"),
        "@asset": resolve("src/asset"),
        "@utils": resolve("src/utils"),
      },
    },
    devServer: {
      static: resolve("dist"), // This tells `webpack-dev-server` to serve the files from the `dist` directory on `localhost:8080`
      hot: true,
    },
    optimization: {},
  }

  if (env.mode === "development") {
    envConfig = {
      entry: {
        index: {
          import: resolve("test/index.js"),
        },
      },
      output: {
        filename: "[name].js",
        path: resolve("dist"),
        clean: true,
      },
      mode: env.mode,
      devtool: "inline-source-map",
      // plugins: [
      //   new CopyWebpackPlugin({
      //     patterns: [{ from: "public" }],
      //   }),
      //   new HtmlWebpackPlugin({
      //     title: "demo",
      //     template: resolve("src/asset/index.html"),
      //     chunks: ["index"],
      //   }),
      // ],
      optimization: {
        runtimeChunk: "single",
      },
    }
  } else {
    envConfig = {
      entry: {
        netio: {
          import: resolve("NetIo.js"),
        },
      },
      output: {
        filename: "[name].js",
        path: resolve("dist"),
        clean: true,
        library: {
          name: "netio",
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
