const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const plugins = (dev) => {
    const basePlugins = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: !dev,
            }
        }),
        new CleanWebpackPlugin()
    ];

    return basePlugins;
};


module.exports = plugins;