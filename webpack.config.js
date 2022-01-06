const path = require('path');

module.exports = {
    devServer: {
        port: 3000,
        static: {
            directory: path.join(__dirname, 'public'),
        },
    },
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'haijh.js',
        path: path.resolve(__dirname, 'public/js'),
    },
};