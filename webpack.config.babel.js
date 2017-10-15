var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.template.ejs'
        })
    ],
    devServer: {
        historyApiFallback: true,
    }
}