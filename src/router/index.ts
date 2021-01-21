import { createRouter, createWebHashHistory } from 'vue-router'
import { setTitle, getToken, getRoles } from '@/utils'
import { RouteLocation } from '@/types'
import { useToast } from 'vue-toastification'
import staticRoutees from './routers/static'
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutees
})

router.beforeEach((to: RouteLocation, from, next) => {
  NProgress.start()
  const token = getToken()
  const roles = getRoles()
  const toast = useToast()

  // 已登录, 并且页面需要鉴权
  if (token && to.meta.roles && roles) {
    // 路由鉴权
    if (to.meta.roles.some(value => roles.includes(value))) {
      next()
    } else {
      // 无权限
      toast.error('对不起，你没有进入该页面的权限')
      next({ replace: true, name: '401' }) // 重定向到401页面
    }
  }

  // 已登录，并且是登录页面
  else if (token && to.name === 'Login') {
    next({ name: 'Dashboard' }) // 跳转到控制台
  }

  // 已登录
  else if (token) {
    next()
  }

  // 未登录，并且页面不是登录页面
  else if (!token && to.name !== 'Login') {
    toast.error('请登录')
    next({ name: 'Login' })
  }

  // 未登录, 并且页面开启 {nologin: true} 无需登录即可访问
  else if (!token && to.meta.nologin) {
    next()
  }

  // 未登录, 跳转到登录页面
  else {
    next({ name: 'Login' })
  }
})

router.afterEach(to => {
  setTitle(to)
  NProgress.done()
})

export default router
