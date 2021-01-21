import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

// 路由表 meta 属性类型
declare interface RouterMeta {
  meta?: {
    title?: string
    roles?: string[]
    nologin?: boolean
  }
}

// 路由表类型
type Routes = RouteRecordRaw & RouterMeta

// 路由 RouteLocationNormalized：to 类型作 交叉点类型 交集
type RouteLocation = RouteLocationNormalized & RouterMeta

export { RouteLocation, RouterMeta, Routes }
