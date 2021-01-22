import { defineComponent } from 'vue'

export default defineComponent({
  name: '401',
  setup: () => {
    return () => {
      return <div>401 unauthorized</div>
    }
  }
})
