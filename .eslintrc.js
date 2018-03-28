module.exports = {
	// 指定环境
	"env": {
		"browser": true,
		"node": true,
		"commonjs": true,
		"worker": true,
		"es6": true,
		"jest": true,
		"jasmine": true,
		"phantomjs": true,
		"protractor": true,
		"qunit": true,
		"shelljs": true,
		"serviceworker": true,
		"webextensions": true,
		"greasemonkey": true,
		"mongo": true
	},
	// 开启参数
	"parserOptions": {
		// "ecmaVersion": 6,
		"globalReturn": true,
        "sourceType": "module",
    	"ecmaFeatures": {
            "jsx": true
        }
	},
	// 全局变量
	"globals": {
        "var1": true, // 可写
        "var2": false // 只读
    },
	// 使用规则
	// "extends": "airbnb-base"
	"extends": "eslint:recommended",
	// 使用组件在特定环境下
	// plugins: ["prettier"], // 全局安装的 ESLint 实例只能使用全局安装的 ESLint 插件，本地安装的版本，只能用 本地安装 的插件。不支持混合本地和全局插件。
	// "env": {
	// 	"prettier/browser": true
	// },
	// 设置规则
	"rules": {
		"no-global-assign": ["error", {"exceptions": [{
			"var1": true
		}]}],
		"no-redeclare": ["error", { "builtinGlobals": true }],
		"no-shadow": ["error", { "builtinGlobals": false, "hoist": "functions", "allow": [] }],
		"indent": ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		"quotes": ["off", "single"],
		"semi": ["warn", "always"],
		// "prettier/prettier": [ // 插件名/规则ID
		//     "error",
		//     {
		//         "printWidth": 100,
		//         "singleQuote": true,
		//         "trailingComma": "es5"
		//     }
		// ]
	},
};
