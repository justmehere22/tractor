module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            { test: /\.(png|jpg)$/, loader: 'url-loader' },
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.html$/, use: 'html-loader' }
        ]
    },
    mode: 'production',
    node: {
        Buffer: 'mock'
    }
};