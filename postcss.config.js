module.exports = () => ({
    plugins: [
        require('autoprefixer')(),
        require('postcss-plugin-px2rem')({
            rootValue: 16,
            selectorBlackList: [/^html$/, /^body$/],
            propList: ['*'],
            replace: true,
            minPixelValue: 1.01,
            mediaQuery: false,
            unitPrecision: 5
        })
    ]
})
