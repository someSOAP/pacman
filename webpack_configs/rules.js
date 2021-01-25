const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const babelOptions = (preset) => {
    const options = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
    };

    if(preset){
        options.presets.push(preset)
    }

    return options;
};


const cssLoaders = (extra) => {
    const loaders = [
        // {
        //     loader: MiniCssExtractPlugin.loader,
        //     options: {
        //         publicPath: '',
        //     }
        // },
        'css-loader'
    ];

    if(extra) {
        loaders.push(extra)
    }

    return loaders;
};

const jsLoaders = (dev) => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }];

    // if (dev){
    //     loaders.push('eslint-loader');
    // }

    return loaders;
};


const rules = (dev) => {

    const baseRules = [
        {
            test: /\.css$/,
            use: cssLoaders()
        },
        {
            test: /\.s[ac]ss$/,
            use: cssLoaders('sass-loader')
        },
        {
            test: /\.(png|jpg|jpeg|svg|gif)$/,
            use: ['file-loader']
        },
        {
            test: /\.(ttf|woff|woff2|eot)$/,
            use: ['file-loader']
        },
        {
            test: /\.xml$/,
            use: ['xml-loader']
        },
        {
            test: /\.csv$/,
            use: ['csv-loader']
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: jsLoaders(dev)
        },
        {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: babelOptions('@babel/preset-react'),
            }
        }
    ];

    return baseRules;
};

module.exports = rules;