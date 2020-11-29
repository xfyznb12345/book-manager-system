const path = require('path')

module.exports = {
  port: '3000',
  tokenConfig: {
    secret: 'xfy',
    expired: 60 * 60 * 24 //1h 
  },
  publicDir: path.resolve(__dirname, './public'),
  viewsDir: path.resolve(__dirname, './views'),
  logPath: path.resolve(__dirname, './logs/koa-server'),
  mongoDB: {
    host: '127.0.0.1',
    port: 27017,
    // user: 'root',
    // pwd: 'root',
    db: 'node-vue-book',
    // authSource: 'admin',
  }
}
