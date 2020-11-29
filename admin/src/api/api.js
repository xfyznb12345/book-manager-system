import { post, get, deleteFn, put } from './@axios'
const apiUrl = 'http://localhost:3000/api/admin'
export const iconUrl = 'http://localhost:3000'

//首页相关

export const api_home = (params) => get('/home/getData',params)





//图书管理
export const api_bookList = (params) => get(`${apiUrl}/bookList`, params)
//图书详情
export const api_bookInfo = (params) => get(`${apiUrl}/bookInfo`, params)


//运营管理
//广告位
//关联图书列表
export const api_bookAdList = (params) => get(`${apiUrl}/bookAdList`, params)
//创建新广告位
export const api_AdAdd = (params) => post(`${apiUrl}/bookAdAdd`, params)
//获取广告位列表
export const api_AdList = (params) => get(`${apiUrl}/AdList`,params)
//编辑广告位
export const api_AdEdit = (params) => put(`${apiUrl}/bookAdEdit`,params)
//删除广告列表
export const api_AdDelete = (params) => deleteFn(`${apiUrl}/AdDel/${params}`)



//分类列表批量关联
export const api_categoryMany = (params) => get(`${apiUrl}/categoryList`, params)
//批量关联
export const api_categoryAss = (params) => put(`${apiUrl}/classfiyAss`, params)
//添加分类
export const api_categoryAdd = (params) => post(`${apiUrl}/category/add`, params)
//查询分类列表
export const api_categoryList = (params) => get(`${apiUrl}/classfiyList`, params)
//删除分类列表
export const api_categoryDelete = (params) => deleteFn(`${apiUrl}/category/delete/${params}`)
//编辑分类列表
export const api_categoryEdit = (id, params) => put(`${apiUrl}/category/edit/${id}`, params)
//列表详情
export const api_categoryInfo = (params) => get(`${apiUrl}/category/info/${params}`)


/**
 * 人员管理
 */
//新增人员
export const api_usersAdd = (params) => post(`${apiUrl}/userAdd`, params)
//查询人员列表
export const api_usersList = (params) => get(`${apiUrl}/userList`, params)
//修改人员列表
export const api_usersEdit = (params) => put(`${apiUrl}/userEdit`, params)
//删除人员列表
export const api_usersDelete = (params) => deleteFn(`${apiUrl}/userDel/${params}`)
//添加角色
export const api_rolesAdd = (params) => post(`${apiUrl}/roleAdd`, params)
//查询角色列表
export const api_rolesList = (params) => get(`${apiUrl}/roleList`, params)
//修改角色列表
export const api_rolesEdit = (params) => put(`${apiUrl}/roleEdit`, params)
//删除角色列表
export const api_rolesDelete = (params) => deleteFn(`${apiUrl}/roleDel/${params}`)


//登录接口
export const api_login = (params) => post(`${apiUrl}/login`, params)
//获取用户信息
export const api_userInfo = (id) => get(`${apiUrl}/userInfo/${id}`)
//分类图片上传
export const upload = (`${apiUrl}/category/upload`)
//头像上传
export const api_avatarUpload = (`${apiUrl}/uploadAvatar`)