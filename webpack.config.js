var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: './',
        port: 8080
    },

    entry: {
        "canvas": './js/canvas.js',
        "designer": './js/designer.js'
    },
    output: {
        path: 'build',
        filename: '[name].js',
        publicPath: "/build/"
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js[x]?$/,exclude: /node_modules/,
                query: {
                    presets: 'es2015'
                }
            },
            // Extract css files
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            { test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/
                , loader: 'url?limit=100000&name=[name].[ext]'
            }
        ]
    },
    
    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    plugins: [
        new ExtractTextPlugin("form.designer.css"),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({url: 'http://localhost:8080/designer.html'})
    ]
};