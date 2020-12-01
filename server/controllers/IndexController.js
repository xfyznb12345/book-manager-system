const { InvalidQueryError } = require('../lib/error')
const IndexService = require('../services/IndexService')
module.exports = {
  /**
   * 首页轮播图
   */
  'GET /api/AdList' :async(ctx,next) =>{
    const result = await IndexService.findManyBack({state:0})
    if (!result) {
      ctx.error = '一条都没有'
    } else {
      ctx.result = result
    }
    return next()
  },
}
