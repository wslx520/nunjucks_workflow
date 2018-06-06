const glob = require('fast-glob')
const path = require('path')
module.exports = {
    entry: () => new Promise((resolve, reject) => {
        const arr = glob.sync('./src/**/*.entry.js');
        return resolve(arr);
    }),
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
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
            }
        ]
    }
}