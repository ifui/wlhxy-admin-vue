import { defineComponent, ref } from 'vue'
import classes from './style.module.less'
import Sider from './sider'
import Header from './header'

export default defineComponent({
  name: 'Layout',
  setup: () => {
    // 主题
    const theme = ref('light')

    return () => {
      return (
        <a-layout class={classes.layout}>
          <Sider theme={theme.value} />
          <a-layout>
            <Header theme={theme.value} />
            <a-layout-content class={classes.layoutContent}>
              <router-view></router-view>
            </a-layout-content>
          </a-layout>
        </a-layout>
      )
    }
  }
})
