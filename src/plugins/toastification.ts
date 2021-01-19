import app from './app'
import Toast, { PluginOptions } from 'vue-toastification'

const options: PluginOptions = {
  timeout: 2500,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  icon: true
}

app.use(Toast, options)
