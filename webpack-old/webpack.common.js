const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const parts = require("./webpack.parts.js");

const APP_PATH = path.join(__dirname, "..");

const commonConfig = {
	entry: {
		app: "./src/index.js",
		vendors: []
	},
	module: {
		rules: [
			// {
			//     include: path.resolve("node_modules", "lodash"),
			//     sideEffects: false  // true|false|[*.css]
			// },
			// {
			//     test: require.resolve('jquery'), // 将全局暴露给第三方(浏览器)
			//     use: [{
			//         loader: 'expose-loader',
			//         options: 'jQuery'
			//     },{
			//         loader: 'expose-loader',
			//         options: '$'
			//     }]
			// },
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
							limit: 15000,
							name: "[name].[ext]",
						},
					},
				],
			},
			{
				test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader",
				options: {
					limit: 50000,
					mimetype: "application/font-woff",
					name: "./fonts/[name].[ext]", // Output below ./fonts
					publicPath: "../", // Take the directory into account
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: "file-loader",
				options: {
					name: "fonts/[name].[ext]",
				},
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
			filename: "index.html",
			title: "webpack-postcss",
		}),
		// 切分更小的包
		// new webpack.optimize.AggressiveSplittingPlugin({
		//     minSize: 10000,
		//     maxSize: 30000,
		// }),
		new webpack.optimize.SplitChunksPlugin({
			chunks: "all",
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: true,
			cacheGroups: {
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				},
			},
		}),
		// 全局定义
		new webpack.ProvidePlugin({
			// $: "jquery",
		}),
	],
	resolve: {
		alias: {
			// 定义全局引用别名
			// demo: path.resolve(__dirname, "node_modules/demo/dist/demo.js"),
			// react: "react-lite",
			// "react-dom": "react-lite"
		},
		extensions: [".ts", ".tsx", ".js", ".jsx"], // 扩展名字解析
		// modules: ["my_modules", "node_modules"], // 改变模块解析位置
		// plugins: []
	},
	// 处理cdn引用
	externals: {
		// lodash: {
		//     commonjs: 'lodash',
		//     commonjs2: 'lodash',
		//     amd: 'lodash',
		//     root: '_'
		// },
		// jquery: "jquery",
	},
	output: {
		filename: "[name].[hash:5].js",
		chunkFilename: "[name].[chunkhash:5].js",
		path: path.resolve(__dirname, "../dist"),
		// publicPath: "/webpack-postcss/"
		// library: 'webpackNumbers', // 此处设置, 任何环境都可使用
		// libraryTarget: 'umd'
	},
};

module.exports = commonConfig;
