const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common")
const { merge } = require("webpack-merge")
const path = require('path');

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ],
            }, 
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css"
        })
    ],
    optimization: {
        runtimeChunk: 'single'
    },
});