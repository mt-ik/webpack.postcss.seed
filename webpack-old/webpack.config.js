const path = require("path");

const webpackConfig = {
    "filePath": {
        "common": "./webpack.common.js",
        "parts": "./webpack.parts.js",
        "dev": "./webpack.dev.js",
        "prod": "./webpack.prod.js",
        "i18n": "./webpack.i18n.js",
        "src": path.resolve(__dirname, "src"),
        "dist": path.resolve(__dirname, "../dist")
    },
    "entryPath": {
        "app": "./src/index.js",
        "vendors": []
    },
    "outPutPath": {
        "path": ''
        "filename": "[name].[hash:5].js",
        "chunkFilename": 
        "publicPath": "https://github.com/mt-ik/",
        "library": "webpackNumbers",
        "libraryTarget": "umd"
    },
    "untils": {

    }
}

module.exports = webpackConfig;