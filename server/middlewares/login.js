// 校验token 并返回用户信息
const jwt = require('jsonwebtoken');
const config = require('../config')
const userHandler = (authorization) => {
  const token = authorization.split(' ')[1]
  let id = ''
  jwt.verify(token, 'xfy', function (err, decoded) {
    if (err) {
      throw { code: 401, message: '无效的token' }
    } else {
      id =  decoded.data
    }
  })
  return id
}

module.exports = {
  userHandler
}
