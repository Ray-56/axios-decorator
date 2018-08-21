const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack")

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        // app: './src/main.js'
        app: ['babel-polyfill', './src/main.js']
    },
    output: {
        path: resolve('dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('decorator')]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new htmlWebpackPlugin({
            // 模板页面路径
            template: resolve('src/index.html')
        })
    ],
}


  
