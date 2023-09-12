/**
 * @typedef {object} headers
 * @property {string} Content-Type
 * @property {string} Authorization
 */

export default class RequestClient {
  /**
   * Creates an instance of request client.
   * @param {string} baseUrl api base url
   * @param {headers} headers api headers
   */
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
    }).then(res => res.json())
  }
}
