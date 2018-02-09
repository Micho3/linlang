const path = require("path");
const uglify = require("uglifyjs-webpack-plugin");

let config = {
    entry: {
        practice: __dirname + "/Public/jsResource/practice.js",
        easyTabs: __dirname + "/Public/jsResource/easyTabs.js",
        resume: __dirname + "/Public/jsResource/resume.js",
        pushu: __dirname + "/Public/jsResource/pushu.js"
    },
    output: {
        path: __dirname + "/Public/js",
        filename: "[name].js"
    },
    plugins: [
        new uglify()
    ]
};
module.exports = config;