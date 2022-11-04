const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common")
const { merge } = require("webpack-merge")
const path = require('path');

module.exports = merge(common, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[contenthash].bundle.js",
        clean: {
            keep: /\.git/
        },
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
            filename: "[name].[contenthash].bundle.css"
        })
    ]
});