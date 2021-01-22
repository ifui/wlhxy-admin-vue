import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'LayoutHeader',
  props: {
    theme: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup: props => {
    return () => {
      return <a-layout-header theme={props.theme}>header</a-layout-header>
    }
  }
})
