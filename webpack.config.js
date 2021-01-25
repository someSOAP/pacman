const path = require('path');
const { plugins, rules } = require('./webpack_configs');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserWebpackPlugin = require('terser-webpack-plugin');
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function webpack(env, argv) {

    const dev  = argv.mode === "development";

    const filename = ext => dev ? `[name].${ext}` : `[name].[hash].${ext}`;

    return {
        context: path.resolve(__dirname, './src'),
        mode: env.production ? 'production' : 'development',
        devtool: env.production ? 'source-map' : 'inline-source-map',
        entry: {
            main: ['@babel/polyfill', './index.ts'],
        },
        output: {
            filename: filename('js'),
            path: path.resolve(__dirname, 'dist'),
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        plugins: plugins(dev),
        devServer: {
            port: 4200,
            open: true,
            hot:  dev,
        },
        module: {
            rules: rules(dev)
        }
    };
}

module.exports = webpack;