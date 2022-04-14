const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Reademe=require('./plugins/myplugin')

module.exports = {
    resolveLoader: {
        modules: ['node_modules', './loaders']
    },
    entry: './src/index.js',
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
            template: './index.html',
            filename: 'app.html',
            inject: 'body'
        }),
        new Reademe()
    ],

    devServer: {
        static: './dist'
    },
    module: {
        rules: [
            {
            test: /\.jpg$/,
            type: 'asset/resource',
            generator: {
                filename: 'image/[contenthash][ext]'
            }
        },
        // {
        //     test:/\.js$/,
        //     use:['myloader']
        // }
    ]
    }
}