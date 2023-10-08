const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        port: 8081,
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    type: 'javascript/auto',
                    use: [
                        { loader: 'vue-loader' },
                        { loader: './scripts/svg-wrap-template.js' },
                    ],
                },
            ],
        },
    },
})
