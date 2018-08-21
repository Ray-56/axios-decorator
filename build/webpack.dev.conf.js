const path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
const base = require('./webpack.base.conf')

module.exports = merge(base, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map', 
    devServer: {
        contentBase: path.join(__dirname, "src"),
        hot: true,
        port: 3000,
        inline: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
})