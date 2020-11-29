const RoleService = require('../../services').RoleService
const { InvalidQueryError } = require('../../lib/error')
module.exports = {
  /**
   * 查询角色列表
   */
  'GET /api/admin/roleList': async (ctx, next) => {
    const { noHigh ,keyWords, pageNum, pageSize } = ctx.request.query
    if(noHigh){
      const roleName = await RoleService.findMany()
      if (!roleName){
        ctx.error = '获取列表失败'
      }else{
        const result = roleName.filter(val => {
          return val.roleName !== '最高管理员'
        })
        ctx.result = result
      }
    }else{
      if (!pageNum || !pageSize) {
        throw new InvalidQueryError()
      }
      const roleName = new RegExp(keyWords)
      const result = await RoleService.findByPage({ roleName }, pageNum, pageSize)
      if (!result) {
        ctx.error = '获取列表失败'
      } else {
        ctx.result = result
      }
    }
    return next()
  },
  /**
   * 创建角色
   */
  'POST /api/admin/roleAdd':async(ctx,next)=>{
    const { roleName, describe}  = ctx.request.body
    if (!roleName) {
      throw new InvalidQueryError()
    }
    const role = await RoleService.findOne({roleName})
    if(role){
      ctx.error = '角色已存在'
      ctx.code = 0
    }else{
      const result = await RoleService.save({ roleName, describe })
      if (!result) {
        ctx.error = '保存失败'
      } else {
        ctx.result = '保存成功'
      }
    }
    return next()
  },
  /**
   * 修改角色
   */
  'PUT /api/admin/roleEdit':async(ctx,next)=>{
    const data = ctx.request.body
    if(!data || !data._id){
      throw new InvalidQueryError()
    }
    const result = await RoleService.updateById(data._id, data)
    if (!result) {
      ctx.error = '保存更改失败'
    } else {
      ctx.result = '保存更改成功'
    }
    return next()
  },
  /**
   * 删除角色
   */
  'DELETE /api/admin/roleDel/:id':async(ctx,next)=>{
    const { id } = ctx.params
    console.log(ctx.params);
    if (!id) {
      throw new InvalidQueryError()
    }
    const result = await RoleService.deleteById(id)
    if (!result) {
      ctx.error = '角色不存在'
    } else {
      ctx.result = result
    }
    return next()
  }
}
