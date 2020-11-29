const BookService = require('../../services').BookService
const CategoryService = require('../../services').CategoryService
const { InvalidQueryError } = require('../../lib/error')
module.exports = {
  /**
   * 查询图书列表
   */
  'GET /api/admin/bookList' :async (ctx,next) => {
    const {keyWords , pageNum ,pageSize} =ctx.request.query
    if (!pageNum || !pageSize) {
      throw new InvalidQueryError()
    }
    const reg = new RegExp(keyWords, 'i') //不区分大小写
    const filter = {
      $or:[
        { title: { $regex: reg }},
        { author: { $regex: reg } },
      ]
    }
    const result = await BookService.findByPage(filter, pageNum, pageSize)
    if (!result) {
      ctx.error = '获取列表失败'
    } else {
      ctx.result = result
    }
    return next()
  },
  /**
   * 图书分类详情
   */
  'GET /api/admin/bookInfo' :async(ctx,next) =>{
    const {id} = ctx.request.query
    const bookInfo = await BookService.findById(id)
    const str = bookInfo.code.substr(0,1)
    const classfiy = await CategoryService.findOne({code:str})
    // 转对象
    const result = bookInfo.toObject()
    result.category = classfiy.name
    if (!result) {
      ctx.error = '获取详情失败'
    } else {
      ctx.result = result
    }
    return next()
  }
}
