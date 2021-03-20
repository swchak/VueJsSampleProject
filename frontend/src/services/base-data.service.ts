import axios, { AxiosInstance } from 'axios'

export default class BaseDataService {
  http: any
  private _cache: {}
  cancelToken: any
  source: any

  constructor() {
    this.http = axios.create({ baseURL: 'http://localhost:8080/api/' })
    this._cache = {}
    this.cancelToken = axios.CancelToken
    this.source = undefined
  }

  async post(url: string, body: any, dataType: any) {
    const val = await this.http
      .post(url, body)
      .then((response: any) => this.fixResponse(response, dataType))
    console.log(val)
    return val
  }

  fixResponse(response: any, dataType: any) {
    const body = response.data || {}
    if (Array.isArray(body)) {
      return body.map(item => new dataType(item))
    } else {
      return new dataType(body)
    }
  }
}
