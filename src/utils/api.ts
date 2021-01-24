import request from './request'

class Api {
  private readonly url: string

  constructor(url: string) {
    this.url = url
  }

  get(page?: number) {
    const url = page ? this.url + '?page' + page : this.url
    return request.get(url)
  }

  post(data?: any) {
    return request.post(this.url, data)
  }

  show(id: number) {
    return request.get(this.url + '/' + id)
  }

  put(id: number, data?: any) {
    return request.put(this.url + '/' + id, data)
  }

  delete(id: number, data?: any) {
    return request.delete(this.url + '/' + id, { data })
  }
}

export default Api
