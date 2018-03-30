const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = require("./webpack.config.js");
console.log(config.filePath.parts, "----------");
const parts = require(config.filePath.parts);

const commonConfig = merge([
    {
        output: {
            publicPath: ""
        },
        resolveLoader: {
            alias: config.privateLoaders
        }
    },
    parts.loadJavaScript({ include: config.utils.app }),
    parts.setFreeVariable("HELLO", "hello from config")
]);

const productionConfig = merge([
    {   
        // 性能预算
        performance: {
            hints: "warning", // "error" or false are valid too
            maxEntrypointSize: 150000, // in bytes, default 250k
            maxAssetSize: 450000, // in bytes
        }
    },
    {
        recordsPath: config.utils.recordsPath,
        output: {
            chunkFilename: "[name].[chunkhash:5].js",
            filename: "[name].[chunkhash:5].js",
        },
    },
    parts.clean(config.utils.build),
    parts.minifyJavaScript(),
    parts.minifyCSS({
    options: {
            discardComments: {
                removeAll: true,
            },
            // Run cssnano in safe mode to avoid
            // potentially unsafe transformations.
            safe: true, // 安全模式
        },
    }),
    parts.extractCSS({ 
        use: [{ loader: "css-loader", options: { importLoaders: 1 } }, parts.postCss()],
    }),
    parts.purifyCSS({
        paths: glob.sync(`${config.utils.app}/**/*.js`, { nodir: true }),
    }),
    parts.loadImages({
        options: {
            limit: 15000,
            name: "[name].[hash:5].[ext]",
        },
    }),
    parts.generateSourceMaps({ type: "source-map" }),
    {
        optimization: {
            splitChunks: {
                chunks: "initial",
            },
            runtimeChunk: {
                name: "manifest",
            },
        },
    },
    parts.attachRevision()
]);

const developmentConfig = merge([
        parts.devServer({
            host: config.utils.host,
            port: config.utils.port,
            contentBase: config.utils.contentBase
        }),

    ]);

module.exports = mode => {
  const pages = [
    parts.page({
      title: config.entry.main.title,
      entry: {
        app: config.entry.main.app
      },
      chunks: config.entry.main.appChunks
    }),
    parts.page({
      title: config.entry.another.title,
      path: config.entry.another.path,
      entry: {
        another: config.entry.another.another
      },
      chunks: config.entry.another.anotherChunks
    }),
  ];
  const usedConfig =
    mode === "production" ? productionConfig : developmentConfig;

  return merge([commonConfig, usedConfig, { mode }].concat(pages));
};