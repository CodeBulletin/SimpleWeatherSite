const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode:"development",
    entry: {
        main: './src/index.js',
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ["html-loader"]
            }, {
                test: /\.(png)$/,
                type: 'asset/resource',
                generator: {
                    filename: "assets/png/[name].[hash].[ext]"
                }
            }, {
                test: /\.(gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: "assets/gif/[name].[hash].[ext]"
                }
            }, {
                test: /\.(svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: "assets/svg/[name].[hash].[ext]"
                }
            }, {
                test: /\.(pdf)$/,
                type: 'asset/resource',
                generator: {
                    filename: "assets/pdf/[name].[hash].[ext]"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: ".\\src\\index.html",
            filename: "index.html",
            chunks: ['main']
        })
    ],
};