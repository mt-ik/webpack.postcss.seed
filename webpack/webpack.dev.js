const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

// var DashboardPlugin = require('webpack-dashboard/plugin');

const devConfig = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							plugins: () => [
								require("autoprefixer")(),
								require("precss")(),
								require("postcss-cssnext")(),
							],
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: ["style-loader", "css-loader", "less-loader"],
			},
			{
				test: /\.(scss|sass)$/,
				use: [
					{ loader: "style-loader" },
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							modules: true,
							localIdentName: "[local]_[hash:base64:5]",
						},
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							config: {
								path: "postcss.config.js",
							},
						},
					},
					{
						loader: "fast-sass-loader",
						options: {
							includePaths: [],
						},
					},
					{
						loader: "sass-loader",
						options: { sourceMap: true },
					},
				],
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		// new DashboardPlugin({
		//     minified: false,
		//     gzip: false
		//     port: 3001
		// })
	],
	devServer: {
		// hotOnly: true, // 热更新失败, 则不刷新
		hot: true, // 热更新失败, 也刷新
		// stats: "errors-only", // 只显示错误信息
		overlay: false, //
		// If you use Docker, Vagrant or Cloud9, set
		// host: options.host || "0.0.0.0";
		// 0.0.0.0 is available to all network devices, unlike default `localhost`.
		host: process.env.HOST, //|| "0.0.0.0", // Defaults to `localhost`
		port: process.env.PORT,
		open: true, // Open the page in browser
		contentBase: "./dist", // contentBase: path.join(__dirname, '..', './react'),
		// historyApiFallback: { index: app.BaseName }, // 解决进行非默认页面，刷新报404问题。
	},
});

module.exports = devConfig;
