const path = require("path");
const uglify = require("uglifyjs-webpack-plugin");

let config = {
    entry: {
        practice: __dirname + "/Public/jsResource/practice/practice.js",
        easyTabs: __dirname + "/Public/jsResource/practice/easyTabs.js",
        jokeMaker: __dirname + "/Public/jsResource/practice/jokeMaker.js",
        resume: __dirname + "/Public/jsResource/resume/resume.js",
        pushu: __dirname + "/Public/jsResource/pushu/pushu.js"
    },
    output: {
        path: __dirname + "/Public/js",
        filename: "[name].js"
    },
    plugins: [
        new uglify()
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    module:{
        rules:[{
            test: /\.css$|\.vue$/,
            use: ['style-loader', 'css-loader']
        }]
    }
};
module.exports = config;