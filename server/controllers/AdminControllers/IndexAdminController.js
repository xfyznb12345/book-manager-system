const { InvalidQueryError } = require('../../lib/error')
// const AdverService = require('../../services/AdvertService')
// const CategoryService = require('../services/CategoryService')
const BookService = require('../../services/BookService')
const { userHandler } = require('../../middlewares/login')
const UserService = require('../../services/UserService')
const ImgUploadService = require('../../services/fileService/ImgUploadService')
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
      '$addToSet': {
        bookRet: {
          bookId: bookId,
          collect: true
        }
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
        bookRet: {
          bookId
        }
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
   * 评分
   */
  'POST /api/admin/rate': async (ctx, next) => {
    const { rate, bookId } = ctx.request.body
    if (!rate || !bookId) {
      throw new InvalidQueryError()
    }
    const authorization = ctx.request.header.authorization
    const userId = userHandler(authorization)
    const condition = {
      _id:userId,
      'bookRet.bookId':bookId
    }
    const data = {
      '$set': {
        bookRet: {
          rate
        }
      }
    }
    const result = await UserService.update(condition, data)
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
  'PUT /api/admin/rackCancel': async (ctx, next) => {
    const { outList } = ctx.request.body
    if (!outList) {
      throw new InvalidQueryError()
    }
    const authorization = ctx.request.header.authorization
    const userId = userHandler(authorization)
    const data = {
      '$pullAll': {
        collect: outList
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
   * 用户头像上传
   */
  'POST /api/admin/avatarUpload': async (ctx, next) => {
    const { id } = ctx.request.body
    console.log(ctx.request.body);
    if (!id) {
      throw new InvalidQueryError()
    }
    try {
      //按月存放上传的图片
      const date = new Date()
      const year = date.getFullYear()
      const month = (Array(2).join(0) + (date.getMonth() + 1)).slice(-2)
      const uploadPath = `/img/${year}/${month}`
      const imgUploadService = new ImgUploadService(uploadPath)
      const icon = imgUploadService.executeAvatar(ctx)[0].filePath
      await UserService.updateById(id, { icon: icon })
    } catch { }
    const result = await UserService.findById(id)
    if (!result) {
      ctx.error = '保存更改失败'
    } else {
      ctx.result = result
      return next()
    }
  },
  /**
   * 用户兴趣修改
   */
  'PUT /api/admin/handleInt': async (ctx, next) => {
    const { tagList } = ctx.request.body
    if (!tagList) {
      throw new InvalidQueryError()
    }
    const authorization = ctx.request.header.authorization
    const userId = userHandler(authorization)
    const list = await UserService.updateById(userId, { interest: tagList })
    if (!list) {
      ctx.error = 'error'
    } else {
      const result = await UserService.findById(userId)
      ctx.result = result
    }
    return next()
  }
}
