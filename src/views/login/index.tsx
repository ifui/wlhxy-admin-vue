import { defineComponent, reactive, ref } from 'vue'
import classes from './style.module.less'

export default defineComponent({
  name: 'Login',
  setup: () => {
    const loginImg = './static/login/background.jpg'
    const loginForm = reactive({
      username: '',
      password: ''
    })
    const rememberMe = ref(true)
    function handleLogin() {
      console.log(loginForm)
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
                <a-checkbox>记住我</a-checkbox>
              </a-form-item>

              <a-form-item>
                <a-button onClick={handleLogin} block>
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
