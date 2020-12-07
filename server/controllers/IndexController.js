const { InvalidQueryError } = require('../lib/error')
const AdverService = require('../services/AdvertService')
const CategoryService = require('../services/CategoryService')
const BookService = require('../services/BookService')
const SortService = require('../services/SortService')
const { userHandler } = require('../middlewares/login')
const UserService = require('../services/UserService')
module.exports = {
  /**
   * 首页轮播图
   */
  'GET /api/adList': async (ctx, next) => {
    const result = await AdverService.findMany({ state: 0 })
    if (!result) {
      ctx.error = ''
    } else {
      ctx.result = result
    }
    return next()
  },
  /**
   * 全部纵轴列表/侧边栏
   */
  'GET /api/category': async (ctx, next) => {
    const result = await CategoryService.findMany({}, { name: 0, _id: 0 })
    if (!result) {
      ctx.error = ''
    } else {
      ctx.result = result
    }
    return next()
  },
  /**
   * 根据分类查图书
   */
  'GET /api/bookList': async (ctx, next) => {
    const { code, pageNum, pageSize } = ctx.request.query
    if (!code || !pageNum || !pageSize) {
      throw new InvalidQueryError()
    }
    const reg = new RegExp(code, 'i')
    const filter = {
      code: { $regex: reg }
    }
    const back = {
      title: 1,
      author: 1,
      abstract: 1,
      code: 1
    }
    const result = await BookService.findManyPageList(filter, back, pageNum, pageSize)
    if (!result) {
      ctx.error = ''
    } else {
      ctx.result = result
    }
    return next()
  },
  /**
   * 通过id获取书本详情
   */
  'GET /api/bookInfo/:id': async (ctx, next) => {
    const { id } = ctx.params
    if (!id) {
      throw new InvalidQueryError()
    }
    const list = await BookService.findById(id)
    const result = JSON.parse(JSON.stringify(list))
    //如果用户已登录判断是否收藏
    const authorization = ctx.request.header.authorization
    if(authorization){
      const userId = userHandler(authorization)
      const isCollect = await UserService.findOne({ _id: userId, collect: { $elemMatch: { $eq: id } } })
      if (isCollect) result.collect = true
    }
    //关键词查出来开始
    result.tagList = []
    let str = result.code
    if (str.indexOf(';') === -1){
      let tagList = await SortService.findOne({ code: str })
      while (!tagList && str.length > 1) {
        str = str.substring(0, str.length - 1)
        tagList = await SortService.findOne({ code: str })
      }
      await BookService.update({ code: result.code }, { code: str }, {}) //错误矫正
      tagList && result.tagList.push(...tagList.name.split('、'))
    }else{
      str = str.split(';')
      let newStr = ''
      for(let i=0;i<str.length;i++){
        let tagList = await SortService.findOne({ code: str[i] })
        while (!tagList && str[i].length > 1) {
          str[i] = str[i].substring(0, str[i].length - 1)
          tagList = await SortService.findOne({ code: str [i]})
        }
        newStr += str[i] 
        if(i !== str.length-1) newStr += ';'
        tagList && result.tagList.push(...tagList.name.split('、'))
      }
      await BookService.update({ code: result.code }, { code: newStr }, {}) //错误矫正
    }
    if (!list) {
      ctx.error = '找不到'
    } else {
      ctx.result = result
    }
    return next()
  }
}

