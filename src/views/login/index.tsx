import { defineComponent, reactive, ref } from 'vue'
import { Login, GetUserInfo } from '@/api/admin/user'
import { useToast } from 'vue-toastification'
import classes from './style.module.less'
import { AxiosResponse } from 'axios'
import Store from '@/utils/store'
import {
  setLoginUsername,
  getLoginUsername,
  removeLoginUsername
} from '@/utils/cookies'
import { useRouter } from 'vue-router'

// login 请求返回类型
interface LoginResponse {
  access_token: string
  expires_in: number
  token_type: string
}

export default defineComponent({
  name: 'Login',
  setup: () => {
    const loginImg = './static/login/background.jpg'
    const loginForm = reactive({
      username: '',
      password: ''
    })
    const rememberMe = ref(false)
    const btnLoading = ref(false)
    const store = new Store('userinfo')
    const Toast = useToast()

    // 判断是否使用：记住我选项
    const rememberLoginUsername = getLoginUsername()
    if (rememberLoginUsername) {
      rememberMe.value = true
      loginForm.username = rememberLoginUsername
    }

    async function handleLogin() {
      btnLoading.value = true

      // 判断是否启用：记住我选项
      if (rememberMe.value) {
        setLoginUsername(loginForm.username)
      } else {
        removeLoginUsername()
      }

      await Login(loginForm).then((res: AxiosResponse<LoginResponse>) => {
        if (res.data.access_token) {
          // 设置 Token
          store.dispatch('SetToken', res.data.access_token)
        } else {
          Toast.error('登录失败')
        }
      })

      await GetUserInfo().then(res => {
        // 设置用户信息
        store.dispatch('SetUserInfo', res.data)
        const username = store.getters('username')
        Toast.success(`登录成功，欢迎 ${username}`)
        const router = useRouter()
        router.push({ name: 'Dashboard' })
      })

      btnLoading.value = false
    }

    return () => {
      return (
        <div class={classes.login}>
          <div class={classes.background}>
            <img src={loginImg} />
          </div>

          <div class={classes.wrap}>
            <div class="text-4xl mb-10 text-align-left">Login in Dashboard</div>

            <div class={classes.forgotPassword}>忘记密码？</div>

            <a-form class={classes.loginForm} layout="vertical">
              <a-form-item label="用户名">
                <a-input v-model={[loginForm.username, 'value']} />
              </a-form-item>

              <a-form-item label="密码">
                <a-input-password v-model={[loginForm.password, 'value']} />
              </a-form-item>

              <a-form-item>
                <a-checkbox v-model={[rememberMe.value, 'checked']}>
                  记住我
                </a-checkbox>
              </a-form-item>

              <a-form-item>
                <a-button
                  loading={btnLoading.value}
                  onClick={handleLogin}
                  block
                >
                  登 录
                </a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
      )
    }
  }
})
