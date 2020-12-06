const SortService = require('../../services').SortService
const CategoryService = require('../../services').CategoryService
const { InvalidQueryError } = require('../../lib/error')

module.exports = {
  /**
   * 分类表
   */
  'GET /api/admin/classfiyList': async (ctx, next) => {
    const { keyWords,category , pageNum, pageSize } = ctx.request.query
    if (!pageNum || !pageSize) {
      throw new InvalidQueryError()
    }
    // const reg = new RegExp('\^' + keyWords, 'i')
    const reg = new RegExp(keyWords, 'i')
    let classfiy = {}
    if(category){
      classfiy = {category:category}
    }
    const filter = {
      $and: [
        classfiy,
        { code: { $regex: reg } }
      ]
    }
    const result = await SortService.findByModel('category', filter, pageNum, pageSize)
    if (!result) {
      ctx.error = '获取列表失败'
    } else {
      ctx.result = result
    }
    return next()
  },
  //批量关联父级表
  'GET /api/admin/categoryList': async (ctx, next) => {
    const result = await CategoryService.findMany({})
    if (!result) {
      ctx.error = '获取列表失败'
    } else {
      ctx.result = result
    }
    return next()
  },
  /**
   * 批量关联
   */
  'PUT /api/admin/classfiyAss': async (ctx, next) => {
    const { list, code } = ctx.request.body
    if (!list || !code) {
      throw new InvalidQueryError()
    }
    const condition = {
      _id: {
        $in: list
      }
    }
    const data = {
      $set: {
        category: code
      }
    }
    const result = await SortService.update(condition, data, {})
    if (!result) {
      ctx.error = '关联失败'
    } else {
      ctx.result = result
    }
    return next()
  },
}
