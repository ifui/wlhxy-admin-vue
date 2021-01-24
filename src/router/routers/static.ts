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
    path: '/grade',
    redirect: '/grade/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Grade',
        component: () => import('@/views/grade/index'),
        meta: {
          title: '年级管理',
          icon: 'iconfont icon-nianji'
        }
      }
    ]
  },
  {
    path: '/course',
    redirect: '/course/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Course',
        component: () => import('@/views/course/index'),
        meta: {
          title: '课程管理',
          icon: 'iconfont icon-kechengguanli'
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
