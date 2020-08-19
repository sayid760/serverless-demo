const path = require('path');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// console.log('process.env.TARGET')
// console.log(process.env.TARGET)
// module.exports = {
 /* // 开发环境
  devServer: {
    // port: process.env.HOST_PORT,
    // host: process.env.DOMAIN,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: process.env.TARGET,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 思路是如果是开发环境，就给所有要代理的接口统一加上前缀，然后代理请求时再统一通过rewrite去掉
        }
      }
    }
  }*/
  //   configureWebpack: {
  //     resolve: {
  //       alias: {
  //         ENV: require('path').resolve(__dirname, 'env.js'),
  //       },
  //     },
  //     plugins: [
  //     //   new PrerenderSPAPlugin({
  //     //     // Required - The path to the webpack-outputted app to prerender.
  //     //     staticDir: path.join(__dirname, 'dist'),
  //     //     // Required - Routes to render.
  //     //     routes: ['/'],
  //     //   }),
  //     ],
  //   },

// };

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        ENV: path.resolve(__dirname, 'env.js'),
      },
    },
    externals: {
      env: 'env'
    },
    plugins: [],
  },
};