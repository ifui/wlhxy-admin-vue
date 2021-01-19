import app from './app'
import Toast, { PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options: PluginOptions = {
  timeout: 2500,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  icon: true
}

app.use(Toast, options)
