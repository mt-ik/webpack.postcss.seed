const path = require("path");

const webpackConfig = {
    "filePath": {
        "common": "./webpack.common.js",
        "parts": "./webpack.parts.js",
        "dev": "./webpack.dev.js",
        "prod": "./webpack.prod.js",
        "i18n": "./webpack.i18n.js"
    },
    "entry": {
        "main": {
            "title": "webpack.postCss.seed",
            "app": "./src/index.js",
            "appChunks": ["app", "manifest", "vendor"],
            "path": ''
        },
        "another": {
            "title": "Another demo",
            "another": "./src/another.js",
            "anotherChunks": ["another", "manifest", "vendor"],
            "path": "another"
        }
    },
    "outPutPath": {
        "path": '',
        "publicPath": "https://github.com/mt-ik/",
        "library": "webpackNumbers",
        "libraryTarget": "umd"
    },
    "utils": {
        "app": path.resolve(__dirname, 'src'),
        "build": path.resolve(__dirname, "../dist"),
        "recordsPath": path.join(__dirname, "records.json"),
        "host": process.env.HOST || "0.0.0.0",
        "port": process.env.PORT,
        "contentBase": ''
    },
    "privateLoaders": {
        "demo-lader": path.resolve(__dirname, "loaders/demo-lader.js")
    }
}

module.exports = webpackConfig;