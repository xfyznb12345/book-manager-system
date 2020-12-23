let apiUrl = ""
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	apiUrl = 'http://localhost:3000/api'
	// apiUrl = 'http://192.168.40.27:3000/api'  //真机调试ip
} else {
	// 生产环境
	apiUrl = 'https://*****.com/'
}
import {
	globalRequest
} from './request.js'

const api = {}
api.imgUrl = 'http://localhost:3000'
// api.imgUrl = 'http://192.168.40.27:3000' //真机调试ip
//文件上传
api.avatar = `${apiUrl}/admin/avatarUpload`
//注册接口
api.register = params => globalRequest(`${apiUrl}/register`, params, 'POST')
//登录接口
api.login = params => globalRequest(`${apiUrl}/login`, params, 'POST')
//首页轮播图
api.adList = params => globalRequest(`${apiUrl}/adList`, params, 'GET')
//热门好书
api.fineBook = params => globalRequest(`${apiUrl}/fineBook`,params,'GET')
//推荐
api.recommend = params => globalRequest(`${apiUrl}/admin/recommend`,params,'GET')
//分类列表
api.category = params => globalRequest(`${apiUrl}/category`, params, 'GET')
//分类图书列表
api.bookList = params => globalRequest(`${apiUrl}/bookList`, params, 'GET')
//获取图书详情
api.bookInfo = params => globalRequest(`${apiUrl}/bookInfo/${params}`, '', 'GET')
//书评分收藏
api.bookCollectRate = params => globalRequest(`${apiUrl}/admin/collectRate`, params, 'POST')
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
