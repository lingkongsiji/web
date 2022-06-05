const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    resolveLoader: {
        modules: ['node_modules']
    },
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        clean:true,
        assetModuleFilename: 'image/[contenthash][ext]'
    },

    mode: 'development',//开发者环境

    devtool: 'inline-source-map',

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/music.html',
            filename: 'app.html',
            inject: 'body'
        })
    ],

    module: {
        rules: [
            {
                test: /\.(jpg|png)$/,
                use:['file-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test:/\.(eot|svg|ttf|woff)$/,
                type: 'asset/resource'
            }
        ]
    },

    devServer: {
        static: './dist'
    }
}