const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        polyfill: "@babel/polyfill",
        main: "./src/index.js"
    },
    resolve: {
        extensions: ['.js'],
        alias: {
          common: path.resolve(__dirname, 'src/'),
        }
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].[chunkhash].js'
    },
    devServer: {
        port: 3000,
        liveReload: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
            test: /\.(js|jsx)$/,
            exclude: /nodeModules/,
            use: {
                loader: 'babel-loader'
            }
            },
            {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },

    plugins: [
     new HtmlWebpackPlugin({ template: './src/index.html' }), 
     new MiniCssExtractPlugin()
    ],
}