const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成dist下index.html
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清空dist
const ManifestPlugin = require("webpack-manifest-plugin"); // 清单

const config = {
	entry: {
		app: "./src/index.js",
		// print: './src/print.js'
	},
	mode: "production",
	devtool: "inline-source-map", // 用于开发环境调试
	devServer: {
		contentBase: "./dist",
		hot: true,
	},
	module: {
		rules: [
			// {
			//     include: path.resolve("node_modules", "lodash"),
			//     sideEffects: false  // true|false|[*.css]
			// },
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					"style-loader",
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
								require("precss"),
								require("postcss-cssnext")(),
							],
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				use: [
					"file-loader",
					{
						loader: "image-webpack-loader",
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65,
							},
							// optipng.enabled: false will disable optipng
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: "65-90",
								speed: 4,
							},
							gifsicle: {
								interlaced: false,
							},
							// the webp option will enable WEBP
							webp: {
								quality: 75,
							},
						},
					},
					{
						loader: "url-loader",
						options: {
							limit: 8192,
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ["file-loader"],
			},
			{
				test: /\.(csv|tsv)$/,
				use: ["csv-loader"],
			},
			{
				test: /\.xml$/,
				use: ["xml-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Output Management",
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin("dist"),
		new ManifestPlugin(),
		new webpack.ProvidePlugin({
			// _: 'lodash'
			join: ["lodash", "join"],
		}),
	],
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
		// publicPath: '/'
	},
};
module.exports = config;
