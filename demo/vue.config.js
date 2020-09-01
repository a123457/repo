/*
 * @Company: Inossem
 * @Author: zhanyu
 * @Email: zhanyu.xu@inossem.com
 * @Date: 2019-03-03 23:32:01
 * @LastEditors: zhanyu
 * @LastEditTime: 2020-07-13 11:21:56
 * @Description: description
 */
const path = require('path')
// const webpack = require('webpack')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/wms/web/'
  : '/'

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))

    // config.merge({
    //   module: {
    //     rules: [
    //       {
    //         test: require.resolve('jquery'),
    //         use: [{
    //           loader: 'expose-loader',
    //           options: 'jQuery'
    //         }, {
    //           loader: 'expose-loader',
    //           options: '$'
    //         }]
    //       }
    //     ]
    //   }
    // })
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  configureWebpack: (config) => {
    config.plugins.push(new SkeletonWebpackPlugin({
      webpackConfig: {
        entry: {
          app: path.join(__dirname, './src/views/skeleton/skeleton.js'),
        },
      },
      minimize: true,
      quiet: true,
    }))
  }

}
