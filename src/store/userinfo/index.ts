interface UserInfo {
  token: string | undefined
  username: string
  truename: string
  avatar: string
}

const state = (): UserInfo => ({
  token: '',
  username: '',
  truename: '',
  avatar: ''
})

const getters = {
  token: (state: UserInfo) => state.token
}

export default {
  namespaced: true,
  state,
  getters
}
