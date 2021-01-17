import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout'
import Login from '@/views/login'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'App',
    redirect: '/login',
    component: Layout
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
