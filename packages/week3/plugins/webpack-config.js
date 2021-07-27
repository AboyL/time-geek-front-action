const path = require('path')
module.exports = {
    mode: 'development',
    devtool: false,
    entry: path.join(__dirname, './src/index.jsx'),
    output: {
        filename: '[hash].js',
        umdNamedDefine: true,
        library: "component",
        libraryTarget: "umd",
        // clean: true,
    },
    module: {
        rules: [{
            test: /\.(jsx|js)?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                        ], "@babel/preset-react"
                    ]
                }

            }
        },
        ]
    },
    plugins: [
    ]
}