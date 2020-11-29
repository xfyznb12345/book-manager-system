import Mock from 'mockjs'
import homeApi from './home'

// 设置延时200~2000ms
// Mock.setup({
//   timeout: '200-500'
// })

// 拦截/home/getData
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)


