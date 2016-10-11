var path = require('path');
module.exports = {
    entry: {
        "canvas": './js/canvas.js',
        "designer": './js/designer.js',
        "demo":'./j2/Demo.js'
    },
    output: {
        path: 'build',
        filename: 'dist/[name].js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js[x]?$/, exclude: /node_modules/,
                query: {
                    presets: 'es2015'
                }
            }
        ]
    }
};