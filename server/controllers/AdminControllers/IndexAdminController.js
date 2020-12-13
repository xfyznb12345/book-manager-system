const { InvalidQueryError } = require('../../lib/error')
// const AdverService = require('../../services/AdvertService')
// const CategoryService = require('../services/CategoryService')
const BookService = require('../../services/BookService')
const { userHandler } = require('../../middlewares/login')
const UserService = require('../../services/UserService')
const InterestService = require('../../services/InterestService')
const ImgUploadService = require('../../services/fileService/ImgUploadService')
module.exports = {
  /**
   * 图书收藏评价
   */
  'POST /api/admin/collectRate' :async (ctx,next)=>{
    const {book,collect,rate} = ctx.request.body
    if(!book){
      throw new InvalidQueryError()
    }
    const authorization = ctx.request.header.authorization
    const userId = userHandler(authorization)
    const condition = {
      book,
      user:userId,
    }
    const data = {
      collect,
      rate
    }
    const options = { upsert: true, new: true, setDefaultsOnInsert: true }
    const result = await InterestService.findOneAndUpdate(condition, data,options)
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
    const conditon = {
      user:userId,
      collect:true
    }
    const list = await InterestService.findByModelNoPage('book',conditon)
    const result = list.map(val=>{
      return val.book
    })
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
