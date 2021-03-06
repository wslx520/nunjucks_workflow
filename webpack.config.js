const glob = require('fast-glob')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const NJK_FS = require('./config/plugins/nunjucks.plugin');
const root = path.resolve('./');
const src = path.resolve('./src');
module.exports = {
    entry: () => new Promise((resolve, reject) => {
        let arr = glob.sync('./src/**/*.entry.js');
        let entries = {};
        arr = arr.forEach( filePath => {
            // console.log('filePath',filePath);
            let absPath = path.resolve(filePath);
            let relativePath = path.relative(src, absPath);
            // console.log(relativePath);
            let finalPath = path.dirname(relativePath);
            // console.log('finalPath', finalPath)
            entries[finalPath] = [filePath, 'webpack-hot-middleware/client?noInfo=true&reload=true'];
        });
        // entries['']
        // console.log(entries);
        return resolve(entries);
    }),
    output: {
        path: path.resolve('./dist'),
        filename: 'js/[name].js',
        chunkFilename: 'js/chunks/chunk.[id].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ["syntax-dynamic-import"]
                    }
                }
            },
            {
                test: /\.njk$/,
                use: [
                    {
                        loader: path.resolve('./config/loaders/nunjucks.loader.js'),
                        options: {
                            views: './src',
                            // 模板变化实时刷新, important for developing
                            watch: true
                        }
                    }
                ]
                
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    resolve: {
        alias: {
            '~': path.resolve('./src')
        }
    },
    plugins: [
        new NJK_FS({output: {
            path: './',
            extension: '.html'
        }}),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('css/styles.css'),
    ],
}