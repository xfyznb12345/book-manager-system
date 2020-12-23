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
  'POST /api/admin/collectRate': async (ctx, next) => {
    const { book, collect, rate } = ctx.request.body
    if (!book) {
      throw new InvalidQueryError()
    }
    const authorization = ctx.request.header.authorization
    const userId = userHandler(authorization)
    const condition = {
      book,
      user: userId,
    }
    const data = {
      collect,
      rate
    }
    const options = { upsert: true, new: true, setDefaultsOnInsert: true }
    const result = await InterestService.findOneAndUpdate(condition, data, options)
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
      user: userId,
      collect: true
    }
    const list = await InterestService.findByModelNoPage('book', conditon)
    const result = list.map(val => {
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
  },
  /**
   * 用户推荐算法,非常的强大！！！
   * 1.0.0版本
   */
  'GET /api/admin/recommend': async (ctx, next) => {
    const authorization = ctx.request.header.authorization
    const userId = userHandler(authorization) //拿到用户id
    const userInfo = await UserService.findById(userId) //拿到用户信息
    const userRead = JSON.parse(JSON.stringify(await InterestService.findMany({ user: userId, collect: true }))) //拿到用户的已经收藏过的书
    const readCollect = userRead.map(item => item.book) //已收藏的书集合
    let userGroup = [] //拿到的是和你有相似兴趣的其他用户数组
    for (let i = 0; i < userInfo.interest.length; i++) {
      const userOther = await UserService.findMany({ _id: { $ne: userId }, interest: { $elemMatch: { $eq: userInfo.interest[i] } } })
      userGroup.push(...userOther) //每个兴趣的相似用户，之后需要做个去重
    }
    const strings = userGroup.map(item => JSON.stringify(item._id))
    const removeDupList = [...new Set(strings)]; //也可以使用Array.from(new Set(strings))
    userGroup = removeDupList.map((item) => JSON.parse(item)) //拿到的是和你有相似兴趣的其他用户兴趣
    /**
     * 查出每个用户评价过或者收藏过的书
     * 评价 0-5分 + 收藏 +5分
     */
    const simaliyBook = await InterestService.findMany({ user: { $in: userGroup }, book: { $nin: readCollect } })
    let bookList = []
    for (let i = 0; i < simaliyBook.length; i++) {
      const n = {
        book: simaliyBook[i].book,
        rate: simaliyBook[i].rate + (simaliyBook[i].collect ? 5 : 0) //后面的话可以把书分类和符合的兴趣把分加上！！
      }
      bookList.push(n)
    } //得到的是没有去重的分值表
    //判断重复了没
    let obj = {};
    bookList = bookList.reduce((cur, next) => {
      obj[next.book] ?
        //找到已有的 并求均值
        cur.forEach(val => {
          if (JSON.stringify(val.book) == JSON.stringify(next.book)) {
            val.rate = (next.rate + val.rate) / 2
          }
        })
        : obj[next.book] = true && cur.push(next);
      return cur;
    }, []) //设置cur默认类型为数组，并且初始值为空的数组
    bookList.sort((a, b) => { return b.rate - a.rate })
    const bookIdCollect = [] //书id集合
    //考虑到数据量如果大于20本的话就取前20吧,写成定时任务就可以分页了
    bookList.slice(0,20).forEach(val=>{
      if (val.rate > 5) bookIdCollect.push(val.book)
    })
    const result = await BookService.findMany({ _id: { $in: bookIdCollect } })
    if (!result) {
      ctx.error = 'error'
    } else {
      ctx.result = result
    }
    return next()
  }
}