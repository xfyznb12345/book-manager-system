let apiUrl = ""
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	apiUrl = 'http://localhost:3000/web/api'
} else {
	// 生产环境
	apiUrl = 'https://*****.com/'
}
import {
	globalRequest
} from './request.js'

const api = {}

api.cate = params => globalRequest(`${apiUrl}/category/list`,params,'GET')

export default api
