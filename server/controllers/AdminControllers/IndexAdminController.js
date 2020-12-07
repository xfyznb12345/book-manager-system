const { InvalidQueryError } = require('../../lib/error')
// const AdverService = require('../../services/AdvertService')
// const CategoryService = require('../services/CategoryService')
const BookService = require('../../services/BookService')
const { userHandler } = require('../../middlewares/login')
const UserService = require('../../services/UserService')


module.exports = {
  /**
   * 添加收藏
   */
  'POST /api/admin/collect': async (ctx, next) => {
    const { bookId } = ctx.request.body
    if (!bookId) {
      throw new InvalidQueryError()
    }
    const authorization = ctx.request.header.authorization
    const userId = userHandler(authorization)
    const data = {
      '$push': {
        collect: bookId
      }
    }
    const result = await UserService.updateById(userId, data)
    if (!result) {
      ctx.error = 'error'
    } else {
      ctx.result = 'success'
    }
    return next()
  },
  /**
   * 取消收藏
   */
  'POST /api/admin/collectDel': async (ctx, next) => {
    const { bookId } = ctx.request.body
    if (!bookId) {
      throw new InvalidQueryError()
    }
    const authorization = ctx.request.header.authorization
    const userId = userHandler(authorization)
    const data = {
      '$pull': {
        collect: bookId
      }
    }
    const result = await UserService.updateById(userId, data)
    if (!result) {
      ctx.error = 'error'
    } else {
      ctx.result = 'success'
    }
    return next()
  },
  /**
   * 书架
   */
  'GET /api/admin/bookrack': async (ctx, next) => {
    const authorization = ctx.request.header.authorization
    const userId = userHandler(authorization)
    const userInfo = await UserService.findById(userId)
    const result = []
    for (let i = 0; i < userInfo.collect.length; i++) {
      result.push(await BookService.findById(userInfo.collect[i]))
    }
    if (!result) {
      ctx.error = 'error'
    } else {
      ctx.result = result
    }
    return next()
  },
  /**
   * 批量取消
   */
  'PUT /api/admin/rackCancel' :async(ctx,next) => {
    const {outList}  = ctx.request.body
    if(!outList){
      throw new InvalidQueryError()
    }
    const authorization = ctx.request.header.authorization
    const userId = userHandler(authorization)
    const data ={
      '$pullAll':{
        collect:outList
      }
    }
    const result = await UserService.updateById(userId,data)
    if(!result){
      ctx.error = 'error'
    }else{
      ctx.result = 'success'
    }
    return next()
  }
}

