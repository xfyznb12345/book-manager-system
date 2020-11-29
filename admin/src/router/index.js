import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    name: 'views',
    redirect: { name: 'home' },
    component: () => import('@/views'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home')
      },
      {
        path: '/book/booklist',
        component: () => import('../views/Book/BookList')
      },
      {
        path: '/book/category',
        component: () => import('../views/Book/Category')
      },
      {
        path: '/business/adlist',
        component: () => import('../views/Business/AdList')
      },
      {
        path: '/system/admin',
        component: () => import('../views/System/Admin')
      },
      {
        path: '/system/user',
        component: () => import('../views/System/User')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})
// 为路由对象，添加beforeEach 导航守卫
// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作
router.beforeEach((to, from, next) => {
  // 如果用户访问的登录页面，直接放行
  if (to.path === '/login')
    return next();
  // 从sessionStorage 中获取保存的 token 值
  const tokenStr = window.localStorage.getItem('book_token');
  //  没有token，强制跳转到登录页面
  if (!tokenStr)
    return next('/login');
  next();
})
export default router
