const mongoose = require('mongoose');
const { logger } = require('../middlewares/logger')
const config = require('../config').mongoDB;
mongoose.set('useCreateIndex', true);
const url = `mongodb://${config.host}:${config.port}/${config.db}`;
const mongo = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true  }); //创建一个数据库连接


mongo.on('connected', () => logger.info(`Connected to database: ${url}`))

mongo.on('error', () => logger.error(`Failed to connect to database: ${url}`))

mongo.on('disconnected', () => logger.info(`Closed connection to database: ${url}`))

mongo.once('open', () => logger.info("MongoDB is opened"))

module.exports = mongo;