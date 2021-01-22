import { defineComponent, ref, PropType } from 'vue'
import classes from '../style.module.less'
import router from '@/router'
import { Routes } from '@/types'
import {} from 'vue-router'

// 生成菜单节点
function createMenuItem(route: Routes) {
  if (!route.meta) return []

  return (
    <>
      <a-menu-item key={route.name}>
        <router-link to={{ name: route.name }}>
          <span class="anticon">
            <i class={route.meta.icon}></i>
          </span>
          <span>{route.meta.title}</span>
        </router-link>
      </a-menu-item>
    </>
  )
}

// 生成节点 DOM
function createDom(route: Routes) {
  const view: JSX.Element[] = []
  // 有子节点, 并且数量大于1
  if (route.children && route.children.length > 1) {
    const menuView: JSX.Element[] = []

    const slots = {
      title: () => {
        if (!route.meta) return
        return (
          <>
            <span class="anticon">
              <i class={route.meta.icon}></i>
            </span>
            <span>{route.meta.title}</span>
          </>
        )
      }
    }
    route.children.forEach(child => {
      if (child.hidden) return
      menuView.push(createDom(child))
    })

    const subMenuList = (
      <a-sub-menu key={route.name} v-slots={slots}>
        {menuView}
      </a-sub-menu>
    )

    return subMenuList
  }

  // 有子节点，并且数量等于1
  else if (route.children && route.children.length === 1) {
    view.push(createMenuItem(route.children[0]))
  }

  // 无子节点
  else {
    view.push(createMenuItem(route))
  }
  return view
}

// parseRoute

function parseRoute() {
  const view: JSX.Element[] = []
  // 获取已挂载路由
  const routes: Routes[] = router.options.routes
  routes.forEach(route => {
    if (route.hidden) return
    view.push(createDom(route))
  })
  return view
}

export default defineComponent({
  name: 'LayoutSider',
  props: {
    theme: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup: props => {
    const collapsed = ref(false)

    const currentRouterName = router.currentRoute.value.name
    const selectedKeys = ref([currentRouterName])

    return () => {
      return (
        <a-layout-sider
          class={classes.layoutSider}
          v-model={[collapsed.value, 'collapsed']}
          theme={props.theme}
          collapsible
        >
          <div class={classes.logo}>LOGO</div>
          <a-menu
            theme={props.theme}
            mode="inline"
            v-model={[selectedKeys.value, 'selectedKeys']}
          >
            {parseRoute()}
          </a-menu>
        </a-layout-sider>
      )
    }
  }
})
