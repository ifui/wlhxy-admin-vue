import { RouteLocationNormalized } from 'vue-router'
import Config from '@/config'
import Store from './store'

/**
 * 小工具集
 */

/**
 * 设置页面标题
 *
 * @param to
 */
const setTitle = (to: RouteLocationNormalized) => {
  let title = ''
  if (to.meta.title) {
    if (typeof to.meta.title === 'function') {
      title = to.meta.title()
    } else title = to.meta.title
  }
  const resTitle = title ? `${title} - ${Config.AppName}` : Config.AppName
  window.document.title = resTitle
}

/**
 * 获取 Token 值
 *
 * @returns string
 */
const getToken = (): string => {
  const store = new Store('userinfo')
  const token = store.getters('token')
  return token
}

/**
 * 获取用户角色、权限
 *
 * @returns array
 */
const getRoles = (): string[] => {
  const store = new Store('userinfo')
  const roles = store.getters('roles')
  return roles
}

/**
 * 判断是否具有该权限
 *
 * @param role 角色名
 * @returns boolearn
 */
const isAllowRoles = (role: string) => {
  const roles = getRoles()
  return roles.includes(role)
}
export { setTitle, getToken, getRoles, isAllowRoles }
