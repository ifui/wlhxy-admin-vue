import { Store as VuexStore } from 'vuex'
import store from '@/store'

class Store {
  private store!: VuexStore<any>
  private readonly namespace: string = ''

  constructor(namespace = '') {
    this.namespace = namespace
  }

  getters(value: string) {
    const gettersValue = this.getValue(value)
    return store.getters[gettersValue]
  }

  dispatch(value: string, data?: any) {
    const dispathValue = this.getValue(value)
    return store.dispatch(dispathValue, data)
  }

  getValue(value: string) {
    const name = this.namespace === '' ? value : '/' + value
    return this.namespace + name
  }
}

export default Store
