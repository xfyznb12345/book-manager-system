const { InvalidQueryError } = require('../lib/error')
const AdverService = require('../services/AdvertService')
const CategoryService = require('../services/CategoryService')
const BookService = require('../services/BookService')
const SortService = require('../services/SortService')
const keyWord = require('../lib/commonFun')
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
    //关键词查出来开始
    const result = JSON.parse(JSON.stringify(list))
    const arr = keyWord(result.code)
    result.tagList = []
    for(let i = 0;i<arr.length;i++){
      let str = ''
      let tag = {}
      let temp = {}
      let isOk = false
      let isNone = true
      let isOne = true
      for (let key of arr[i]) {
        str += key
        if (isOk) {
          tag = await SortService.findOne({ code: str })
          if (!tag && isOne){
            break
          }
          if (!tag) {
            console.log(temp);
            isNone = false
            let sing = ''
            for (let x of temp.name) {
              if (x === '、') {
                console.log(x)
                result.tagList.push(sing)
                sing = ''
              } else {
                sing += x
              }
            }
            if (sing !== '') {
              result.tagList.push(sing)
            }
            break
          }
          isOne = false
          temp = tag
        }
        isOk = true
      }
      if (isNone && !isOne){
        let sing = ''
        for (let x of temp.name) {
          if (x === '、') {
            result.tagList.push(sing)
            sing = ''
          } else {
            sing += x
          }
        }
        if (sing !== '') {
          result.tagList.push(sing)
        }
      }
    }
    // 截止
    if (!list) {
      ctx.error = '找不到'
    } else {
      ctx.result = result
    }
    return next()
  },
  'GET /api/testp' :async(ctx,next) =>{
    const result = await BookService.test()
    // const result = ['A132;B34']
    for(let i = 0;i<5;i++){
      if(result[i].indexOf(';')){
        const z = result[i].split(';')
        for(let j = 0;j < z.length;j++){
          let x = await SortService.findOne({ code: z[j] })
          let p = z[j]
          while (!x) {
            p = p.slice(0, p.length - 1)
            x = await SortService.findOne({ code: p })
          }
          console.log(x,z[j]);

        }
      }else{
        let x = await SortService.findOne({ code: result[i] })
        let p = result[i] 
        while (!x) {
          p = p.slice(0, p.length - 1)
          x = await SortService.findOne({ code: p })
        }
        console.log(x, result[i] );
                const condition = {
          code: result[i]
        }
        const data = {
          $set: {
            code: x.code
          }
        }
        const res = await BookService.update(condition, data, {})
        console.log(res)
      }
    }
    return next()
  }
}
