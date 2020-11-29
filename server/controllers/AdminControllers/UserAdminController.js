const UserService = require('../../services').UserService
const RoleService = require('../../services').RoleService
const ImgUploadService = require('../../services/fileService/ImgUploadService')
const { InvalidQueryError } = require('../../lib/error')

module.exports = {
  /**
   * 查询人员列表
   */
  'GET /api/admin/userList': async (ctx, next) => {
    const { keyWords, pageNum, pageSize } = ctx.request.query
    if (!pageNum || !pageSize) {
      throw new InvalidQueryError()
    }
    const reg = new RegExp(keyWords,'i')
    const filter = {
      //多字段匹配
      $or: [
        { userName: { $regex: reg } },
        { nickName: { $regex: reg } },
        { phone: { $regex: reg } },
      ]
    }
    const result = await UserService.findByModel('role', filter , pageNum, pageSize)
    if (!result) {
      ctx.error = '获取列表失败'
    } else {
      ctx.result = result
    }
    return next()
  },
  /**
   * 增加人员
   */
  'POST /api/admin/userAdd': async (ctx, next) => {
    const { userName, passWord } = ctx.request.body
    const data = ctx.request.body
    if (!userName || !passWord) {
      throw new InvalidQueryError()
    }
    const user = await UserService.findOne({ userName })
    console.log(user);
    if (user) {
      ctx.error = '人员已存在'
      ctx.code = 0
    } else {
      if(data.role){
        const roleName = await RoleService.findById(data.role)
        if(roleName.roleName === '管理员') data.status = 0
      }
      const result = await UserService.save(data)
      if (!result) {
        ctx.error = '保存失败'
      } else {
        ctx.result = '保存成功'
      }
    }
    return next()
  },
  /**
   * 修改人员
   */
  'PUT /api/admin/userEdit': async (ctx, next) => {
    const data = ctx.request.body
    if (!data || !data._id) {
      throw new InvalidQueryError()
    }
    try{
      //按月存放上传的图片
      const date = new Date()
      const year = date.getFullYear()
      const month = (Array(2).join(0) + (date.getMonth() + 1)).slice(-2)
      const uploadPath = `/img/${year}/${month}`
      const imgUploadService = new ImgUploadService(uploadPath)
      const icon = imgUploadService.executeAvatar(ctx)[0].filePath
      data.icon = icon
    } catch{}
    const result = await UserService.updateById(data._id, data)
    if (!result) {
      ctx.error = '保存更改失败'
    } else {
      ctx.result = '保存更改成功'
    }
    return next()
  },
  /**
   * 删除人员
   */
  'DELETE /api/admin/userDel/:id': async (ctx, next) => {
    const { id } = ctx.params
    if (!id) {
      throw new InvalidQueryError()
    }
    const result = await UserService.deleteById(id)
    if (!result) {
      ctx.error = '角色不存在'
    }  else {
      ctx.result = result
    }
    return next()
  },
  /**
   * 查询人员详情
   */
  'GET /api/admin/userInfo/:id' : async (ctx,next) =>{
    const {id} =ctx.params
    if (!id) {
      throw new InvalidQueryError()
    }
    const userInfo = await UserService.findById(id)
    const roleInfo = await RoleService.findById(userInfo.role)
    const result = userInfo.toObject()
    result.role = roleInfo.roleName
    if (!result) {
      ctx.error = '角色不存在'
    } else {
      ctx.result = result
    }
    return next()
  }
}
