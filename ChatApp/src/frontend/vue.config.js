module.exports = {
    devServer:{
     port: 3000,
     proxy: {
           '^/api': {
                     target: 'http://localhost:8090',
                     changeOrigin: true,
                     secure:false,
                     pathRewrite: {'^/api': ''},
                     logLevel: 'debug'
            }
       }
    }
}