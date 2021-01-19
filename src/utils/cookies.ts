import Cookies from 'js-cookie'

// User
const tokenKey = 'token_key'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string) => Cookies.set(tokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)

// Login
const LoginKey = 'login_key'
export const getLoginUsername = () => Cookies.get(LoginKey)
export const setLoginUsername = (loginInfo: string) =>
  Cookies.set(LoginKey, loginInfo)
export const removeLoginUsername = () => Cookies.remove(LoginKey)
