const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        clean:true,//清除dist多余文件
        assetModuleFilename: 'image/[contenthash][ext]'
    },

    mode: 'development',//开发者环境

    devtool: 'inline-source-map',

    plugins: [
        new HtmlWebpackPlugin({
            template: './netEase.html',
            filename: 'app.html',
            inject: 'body'
        })
    ],

    devServer: {
        static: './dist'
    },
    module: {
        rules: [
            // {
            //     test: /\.(jpg|png)$/,
            //     type: 'asset/resource',
            //     generator: {
            //         filename: 'image/[contenthash][ext]'
            //     }
            // },
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
            // {
            //     test:/\.html$/,
            //     use:['html-loader']
            // }
        ]
    }
}