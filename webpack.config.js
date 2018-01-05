var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry:{
        app:'./public/src/js/app.js',
        blog:'./public/src/js/blog.js',
        markdown:'./public/src/js/markdown.js',
        write:'./public/src/js/write.js',
        article:'./public/src/js/article.js'
    },
    output:{
        path:__dirname + "/public/dist/",
        filename:"js/[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                test: /\.js$/, // babel 转换为兼容性的 js
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'latest'],
                        plugins: [['import', {"libraryName": "antd", "style": "css"}]]
                    }
                }
            }
        ]
    }
}