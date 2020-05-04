const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.VUE_APP_HOST,
  devServer: {
    port: 8513,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('Components', resolve('src/components'));
  }
};
