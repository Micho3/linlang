const path = require("path");

let config = {
    entry: {
        practice: __dirname + "/Public/jsResource/index.js",
        easyTabs: __dirname + "/Public/jsResource/easyTabs.js",
        resume: __dirname + "/Public/jsResource/resume.js"
    },
    output: {
        path: __dirname + "/Public/js",
        filename: "[name].js"
    }
};
module.exports = config;