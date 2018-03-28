const parts = require("./webpack.parts");

module.exports = config => {
	const tests = "tests/*.test.js";
	process.env.BABEL_ENV = "karma"; // 生成覆盖率报告

	config.set({
		frameworks: ["mocha"],
		// browsers: ["PhantomJS"], // 开启PhantomJS测试
		files: [
			{
				pattern: tests,
			},
		],
		preprocessors: {
			[tests]: ["webpack"],
		},
		webpack: parts.loadJavaScript(),
		singleRun: true,
	});
};
