const ExtractTextPlugin = require("extract-text-webpack-plugin");

exports.extractCSS = ({ include, exclude, use }) => {
	// Output extracted CSS to a file
	const plugin = new ExtractTextPlugin({
		// `allChunks` is needed to extract from extracted chunks as well.
		allChunks: true,
		filename: "[name].css",
	});

	return {
		module: {
			rules: [
				{
					test: /\.css$/,
					include,
					exclude,

					use: plugin.extract({
						use,
						fallback: "style-loader",
					}),
				},
			],
		},
		plugins: [plugin],
	};
};

const PurifyCSSPlugin = require("purifycss-webpack");

exports.purifyCSS = ({ paths }) => ({
	plugins: [new PurifyCSSPlugin({ paths })],
});

const webpack = require("webpack");
const GitRevisionPlugin = require("git-revision-webpack-plugin");

exports.attachRevision = () => ({
	plugins: [
		new webpack.BannerPlugin({
			banner: new GitRevisionPlugin().version(),
		}),
	],
});
