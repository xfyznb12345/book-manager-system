let apiUrl = ""
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	// apiUrl = 'http://localhost:3000/api'
	apiUrl = 'http://192.168.40.27:3000/api'
} else {
	// 生产环境
	apiUrl = 'https://*****.com/'
}
import {
	globalRequest
} from './request.js'

const api = {}
api.imgUrl = 'http://localhost:3000'
//文件上传
api.avatar = `${apiUrl}/admin/avatarUpload`
// api.imgUrl = 'http://192.168.40.27:3000'
//注册接口
api.register = params => globalRequest(`${apiUrl}/register`, params, 'POST')
//登录接口
api.login = params => globalRequest(`${apiUrl}/login`, params, 'POST')
//首页轮播图
api.adList = params => globalRequest(`${apiUrl}/adList`, params, 'GET')
//分类列表
api.category = params => globalRequest(`${apiUrl}/category`, params, 'GET')
//分类图书列表
api.bookList = params => globalRequest(`${apiUrl}/bookList`, params, 'GET')
//获取图书详情
api.bookInfo = params => globalRequest(`${apiUrl}/bookInfo/${params}`, '', 'GET')
//收藏图书
api.collectBook = params => globalRequest(`${apiUrl}/admin/collect`, params, 'POST')
//取消收藏
api.collectBookDel = params => globalRequest(`${apiUrl}/admin/collectDel`, params, 'POST')
//评分
api.rateBook = params => globalRequest(`${apiUrl}/admin/rate`, params, 'POST')
//搜索
api.searchBook = params => globalRequest(`${apiUrl}/searchList`,params,'GET')
//书架
api.bookrack = params => globalRequest(`${apiUrl}/admin/bookrack`, params, 'GET')
//移除书架 - 批量取消收藏
api.rackCancel = params => globalRequest(`${apiUrl}/admin/rackCancel`, params, 'PUT')
//获取兴趣标签
api.interest = params => globalRequest(`${apiUrl}/interest`,params,'GET')
//确认兴趣
api.handleInt = params => globalRequest(`${apiUrl}/admin/handleInt`,params,'PUT')
export default api
