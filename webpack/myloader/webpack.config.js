const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    resolveLoader: {
        modules: ['node_modules', './loaders']
    },
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        // clean:true//清除dist多余文件
        assetModuleFilename: 'image/[contenthash][ext]'
    },

    mode: 'development',//开发者环境

    devtool: 'inline-source-map',

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'app.html',
            inject: 'body'
        })
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
        {
            test:/\.js$/,
            use:['myloader']
        }
    ]
    }
}