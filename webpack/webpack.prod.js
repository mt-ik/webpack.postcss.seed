const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const merge = require("webpack-merge");
const PurifyCSSPlugin = require("purifycss-webpack"); // 去除未用的css插件
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin"); // 清单
const UglifyJSPlugin = require("uglifyjs-webpack-plugin"); // 压缩插件
// const BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin'); // 可替换的压缩插件
// const ClosureCompilerPlugin = require('webpack-closure-compiler'); // 可替换的压缩插件
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // css提取
// const PrepackWebpackPlugin = require('prepack-webpack-plugin').default; // js预评估
const OptimizeJsPlugin = require("optimize-js-plugin"); // js解析
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // css 缩小插件
const cssnano = require("cssnano"); // css 缩小插件
const common = require("./webpack.common.js");
const PATHS = {
	app: path.join(__dirname, "../src"),
};

const prodConfig = merge(common, {
	mode: "production",
	devtool: "source-map", // 源映射
	performance: {
		// 性能预算
		hints: "warning", // "error" || false
		maxEntrypointSize: 50000, // in bytes, default 250k
		maxAssetSize: 450000, // in bytes
	},
	module: {
		noParse: /node_modules\/demo-package\/dist\/demo-package.js/, // 管理预建的依赖关系, 消除依赖警告
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
			},
			{
				test: /\.js$/,
				include: path.join(__dirname, "src"),
				exclude(path) {
					return path.match(/node_modules/);
				},
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["env"],
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: "css-loader",
							options: {
								importLoaders: 1,
							},
						},
						{
							loader: "postcss-loader",
							options: {
								plugins: () => [
									// require("precss"),
									require("postcss-cssnext")(),
								],
							},
						},
					],
					fallback: "style-loader",
				}),
			},
			{
				test: /\.less$/,
				use: ["style-loader", "css-loader", "less-loader"],
			},
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(["dist"], {
			root: path.resolve(),
			// verbose: true,
			// dry: false,
			// watch: false,
			// exclude: [ 'files', 'to', 'ignore' ],
			// allowExternal: false,
			// beforeEmit: false
		}),
		new UglifyJSPlugin({
			sourceMap: true,
		}),
		new OptimizeJsPlugin({
			sourceMap: true,
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production"),
			},
		}),
		new ExtractTextPlugin({
			allChunks: true,
			filename: "[name].[hash:5].css",
		}),
		new PurifyCSSPlugin({
			paths: glob.sync(`${PATHS.app}/index.js`, {
				nodir: true,
			}),
		}),
		new webpack.HashedModuleIdsPlugin(),
		new ManifestPlugin(),
		new OptimizeCSSAssetsPlugin({
			cssProcessor: cssnano,
			cssProcessorOptions: {
				discardComments: {
					removeAll: true,
				},
				safe: true, // 安全模式运行cssnano
			},
			canPrint: false,
		}),
		// 删除未使用的模块
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		// new PrepackWebpackPlugin({})
	],
});

module.exports = prodConfig;
