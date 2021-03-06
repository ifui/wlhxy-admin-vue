import { Routes } from '@/types'
import Layout from '@/layout'
import Login from '@/views/login'

const routes: Array<Routes> = [
  {
    path: '/',
    name: 'App',
    redirect: '/dashboard',
    component: Layout,
    hidden: true
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      nologin: true
    },
    hidden: true,
    component: Login
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '控制台',
          icon: 'iconfont icon-dashboard'
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    meta: {
      title: '404'
    },
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    meta: {
      title: '401'
    },
    hidden: true
  }
]

export default routes
