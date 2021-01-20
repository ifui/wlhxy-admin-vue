import { useStore, Store as VuexStore } from 'vuex'

class Store {
  private store!: VuexStore<any>
  private readonly namespace: string = ''

  constructor(namespace = '') {
    this.namespace = namespace
    this.store = useStore()
  }

  getters(value: string) {
    const gettersValue = this.getValue(value)
    return this.store.getters[gettersValue]
  }

  dispatch(value: string, data?: any) {
    const dispathValue = this.getValue(value)
    return this.store.dispatch(dispathValue, data)
  }

  getValue(value: string) {
    const name = this.namespace === '' ? value : '/' + value
    return this.namespace + name
  }
}

export default Store
