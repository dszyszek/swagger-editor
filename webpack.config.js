const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    mode: "none",
    node: {
        fs: "empty",
        path: "empty"
    },
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    resolve: {
        extensions: [".js", ".json"]
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'url-loader' 
                }]
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.join(__dirname, 'dist', 'index.html')
    })]
};
