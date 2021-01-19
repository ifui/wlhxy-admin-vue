import { createStore } from 'vuex'
import userinfo from './userinfo'

const store = createStore({
  modules: {
    userinfo
  }
})

export default store
