import app from './plugins/app'
import './plugins/antd'
import './plugins/toastification'

import './styles'
import router from './router'
import store from './store'
import '@/utils/request'

app.use(store)

app.use(router)

app.mount('#app')
