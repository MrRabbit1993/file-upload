const path = require('path')
const pkg = require('./package.json')
module.exports = {
    lintOnSave: false,
    publicPath: process.env.VUE_APP_BASEURL || '/',
    devServer: {
        https: false,
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
