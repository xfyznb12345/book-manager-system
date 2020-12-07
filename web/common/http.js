let apiUrl = ""
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	apiUrl = 'http://localhost:3000/api'
} else {
	// 生产环境
	apiUrl = 'https://*****.com/'
}
import {
	globalRequest
} from './request.js'

const api = {}
api.imgUrl = 'http://localhost:3000'
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
//书架
api.bookrack = params => globalRequest(`${apiUrl}/admin/bookrack`, params, 'GET')
//移除书架
api.rackCancel = params => globalRequest(`${apiUrl}/admin/rackCancel`, params, 'PUT')
export default api
