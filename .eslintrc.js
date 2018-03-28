module.exports = {
	env: {
		node: true,
	},
	// "extends": "airbnb-base"
	extends: "eslint:recommended",
	// plugins: ["prettier"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "single"],
		semi: ["error", "always"],
		// "prettier/prettier": [
		//     "error",
		//     {
		//         "printWidth": 100,
		//         "singleQuote": true,
		//         "trailingComma": "es5"
		//     }
		// ]
	},
};
