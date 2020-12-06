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
api.register = params => globalRequest(`${apiUrl}/register`,params,'POST')
//登录接口
api.login = params => globalRequest(`${apiUrl}/login`,params,'POST')
//首页轮播图
api.adList = params => globalRequest(`${apiUrl}/adList`,params,'GET')
//分类列表
api.category = params => globalRequest(`${apiUrl}/category`,params,'GET')
//分类图书列表
api.bookList = params => globalRequest(`${apiUrl}/bookList`,params,'GET')
//获取图书详情
api.bookInfo = params => globalRequest(`${apiUrl}/bookInfo/${params}`,'GET')
export default api
