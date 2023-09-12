export default class RequestClient {
  constructor (baseUrl, headers) {
    this.baseUrl = baseUrl

    this.headers = Object.assign({
      'Content-Type': 'application/json'
    }, headers)
  }

  get (url, params) {
    return this.prepareRequest('GET', url, params)
  }

  post (url, params) {
    return this.prepareRequest('POST', url, params)
  }

  patch (url, params) {
    return this.prepareRequest('PATCH', url, params)
  }

  put (url, params) {
    return this.prepareRequest('PUT', url, params)
  }

  delete (url, params) {
    return this.prepareRequest('DELETE', url, params)
  }

  prepareRequest (method, url, params) {
    return fetch(`${this.baseUrl}${url}`, {
      method,
      body: JSON.stringify(params),
      headers: this.headers
    })
  }
}
