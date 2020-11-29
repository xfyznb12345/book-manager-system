const ImgUploadService = require('../../services/fileService/ImgUploadService')
const { InvalidQueryError } = require('../../lib/error')
const BookService = require('../../services/BookService')
const AdvertService = require('../../services/AdvertService')
module.exports = {
  /**
   * 获取广告列表
   */
  'GET /api/admin/AdList' :async(ctx,next) =>{
    const result = await AdvertService.findByModelNoPage('book',{},{title:1})
    // const result = JSON.parse(JSON.stringify(list))
    // result.forEach(val=>{
    //   val.book && (val.book = val.book.title)
    // })
    if (!result) {
      ctx.error = '一条都没有'
    } else {
      ctx.result = result
    }
    return next()
  },
  /**
   * 创建广告位
   */
  'POST /api/admin/bookAdAdd':async (ctx,next) => {
    const data = ctx.request.body
    try {
      //按月存放上传的图片
      const date = new Date()
      const year = date.getFullYear()
      const month = (Array(2).join(0) + (date.getMonth() + 1)).slice(-2)
      const uploadPath = `/img/${year}/${month}`
      const imgUploadService = new ImgUploadService(uploadPath)
      const icon = imgUploadService.executeAvatar(ctx)[0].filePath
      data.image = icon
    } catch {
      console.log('没图片呀!!!!!');
    }
    const result = await AdvertService.save(data)
    if (!result) {
      ctx.error = '创建失败'
    } else {
      ctx.result = result
    }
    return next()
  },
  /**
   * 更新广告位
   */
  'PUT /api/admin/bookAdEdit' :async (ctx,next) => {
    const data = ctx.request.body
    if (!data || !data._id) {
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
      data.image = icon
    } catch {
      console.log('没图片呀!!!!!');
    }
    const result = await AdvertService.updateById(data._id,data)
    if (!result) {
      ctx.error = '保存失败'
    } else {
      ctx.result = result
    }
    return next()
  },
  /**
   * 删除广告
   */
  'DELETE /api/admin/AdDel/:id': async (ctx, next) => {
    const { id } = ctx.params
    if (!id) {
      throw new InvalidQueryError()
    }
    const result = await AdvertService.deleteById(id)
    if (!result) {
      ctx.error = '广告不存在'
    } else {
      ctx.result = result
    }
    return next()
  },
  /**
   * 图书远程搜索
   */
  'GET /api/admin/bookAdList': async (ctx, next) => {
    const { keyWords, pageNum, pageSize } = ctx.request.query
    const reg = new RegExp(keyWords, 'i')
    const filter = {
      title: { $regex: reg }
    }
    const back = {title: 1}
    const result = await BookService.findManyPage(filter, back, pageNum, pageSize)
    if (!result) {
      ctx.error = '图书不存在'
    } else {
      ctx.result = result
    }
    return next()
  },
}
