const jwt = require('jsonwebtoken')
const tokenConfig = require('../config').tokenConfig
const UserService = require('../services').UserService
const { InvalidQueryError } = require('../lib/error')

module.exports = {
  /**
   * 管理员账户登录
   */
  'POST /api/admin/login': async (ctx, next) => {
    const { userName, passWord } = ctx.request.body
    if (!userName || !passWord) {
      throw new InvalidQueryError()
    }
    const user = await UserService.findUser({ userName })
    if (!user || user.status !== 0) {
      ctx.error = '用户不存在'
      ctx.code = 0
    } else {
      const isValid = require('bcrypt').compareSync(passWord, user.passWord)
      if (!isValid) {
        ctx.error = '密码错误'
      } else {
        ctx.result = {
          userInfo: {
            id: user._id,
            userName: user.userName,
            nickname: user.nickname,
          },
          token: jwt.sign({
            data: user._id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3), //设置 token 过期时间: 3d
          }, tokenConfig.secret)
        }
      }
    }
    return next()
  },
  /**
   * 用户登录
   */
  'POST /api/login': async (ctx, next) => {
    const { userName, passWord } = ctx.request.body
    if (!userName || !passWord) {
      throw new InvalidQueryError()
    }
    const user = await UserService.findUser({ userName })
    if (!user || user.status !== 1) {
      ctx.error = '用户不存在'
      ctx.code = 0
    }
    const isValid = require('bcrypt').compareSync(passWord, user.passWord)
    if (!isValid) {
      ctx.error = '密码错误'
    } else {
      ctx.result = {
        userInfo: user,
        token: jwt.sign({
          data: user._id,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3), //设置 token 过期时间: 3d
        }, tokenConfig.secret)
      }
    }
    return next()
  },
  /**
   * 注册用户
   */
  'POST /api/register': async (ctx, next) => {
    const { userName, passWord } = ctx.request.body
    if (!userName || !passWord) {
      throw new InvalidQueryError()
    }
    if (await UserService.findOne({ userName })) {
      ctx.error = '用户已存在'
    } else {
      const user = await UserService.save({ userName, passWord })
      ctx.result = {
        userInfo: {
          id: user
        },
        token: jwt.sign({
          data: user._id,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3), //设置 token 过期时间: 3d
        }, tokenConfig.secret)
      }
    }
    return next()
  }
}
