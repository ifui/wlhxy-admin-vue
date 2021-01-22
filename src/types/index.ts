import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

// 路由表 meta 属性类型
declare interface RouterMeta {
  meta?: {
    title?: string
    roles?: string[]
    nologin?: boolean
    icon?: string
    noCache?: boolean
  }
  hidden?: boolean
  children?: Routes[]
}

// 路由表类型
type Routes = RouterMeta & RouteRecordRaw

// 路由 RouteLocationNormalized：to 类型作 交叉点类型 交集
type RouteLocation = RouterMeta & RouteLocationNormalized

export { RouteLocation, RouterMeta, Routes }
