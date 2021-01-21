import {
  setToken as setTokenCookie,
  removeToken as removeTokenCookie,
  getToken as getTokenCookie
} from '@/utils/cookies'
import { Module } from 'vuex'

const module: Module<any, unknown> = {
  namespaced: true,
  state: () => ({
    token: '',
    username: '',
    truename: '',
    avatar: '',
    roles: ['admin']
  }),
  mutations: {
    // 设置 token
    SET_TOKEN(state, value: string) {
      state.token = value
      // 设置 cookie
      setTokenCookie(value)
    },
    // 设置用户信息
    SET_USERINFO(state, value) {
      state.avatar = value.avatar
      state.truename = value.truename
      state.username = value.username
    }
  },
  getters: {
    token: () => getTokenCookie(),
    roles: state => state.roles,
    username: state => (state.truename ? state.truename : state.username),
    userinfo: state => state
  },
  actions: {
    // 设置 TOKEN
    SetToken({ commit }, value: string) {
      commit('SET_TOKEN', value)
    },
    // 重置 TOKEN
    ResetToken({ commit }) {
      removeTokenCookie()
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
    },
    SetUserInfo({ commit }, value: any) {
      commit('SET_USERINFO', value)
    }
  }
}

export default module
