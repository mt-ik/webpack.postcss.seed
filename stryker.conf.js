module.exports = function(config) {
	config.set({
		files: [
			{
				pattern: "src/**/*.js",
				mutated: true,
				included: false
			},
			"test/**/*.js"
		],
		testRunner: "jest",
		mutator: "javascript",
		transpilers: ["babel", "webpack"],
		reporter: ["html", "progress", "dashboard"],
		coverageAnalysis: "off",
		babelrcFile: ".babelrc",
		webpack: {
			configFile: "webpack.config.js"
		}
	});
};
