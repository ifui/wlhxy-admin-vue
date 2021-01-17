import app from './plugins/app'
import './plugins/antd'
import './styles'
import router from './router'
import store from './store'

app.use(store)

app.use(router)

app.mount('#app')
