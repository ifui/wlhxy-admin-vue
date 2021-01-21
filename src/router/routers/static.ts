import { Routes } from '@/types'
import Layout from '@/layout'
import Login from '@/views/login'

const routes: Array<Routes> = [
  {
    path: '/',
    name: 'App',
    redirect: '/dashboard',
    component: Layout
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      nologin: true
    },
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout
  }
]

export default routes
