const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        'bundle': './src/main.ts',
        __less: './docs/style/main.less',
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        url: false,
                    }
                }, 'less-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.less'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'docs'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        })
    ],
};