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

  /**
   * @template T
   * @param {string} url
   * @param {object} params
   * @returns {Promise<T>}
   */
  get (url, params) {
    return this.prepareRequest('GET', url, params)
  }

  /**
   * @template T
   * @param {string} url
   * @param {object} params
   * @returns {Promise<T>}
   */
  post (url, params) {
    return this.prepareRequest('POST', url, params)
  }

  /**
   * @template T
   * @param {string} url
   * @param {object} params
   * @returns {Promise<T>}
   */
  patch (url, params) {
    return this.prepareRequest('PATCH', url, params)
  }

  /**
   * @template T
   * @param {string} url
   * @param {object} params
   * @returns {Promise<T>}
   */
  put (url, params) {
    return this.prepareRequest('PUT', url, params)
  }

  /**
   * @template T
   * @param {string} url
   * @param {object} params
   * @returns {Promise<T>}
   */
  delete (url, params) {
    return this.prepareRequest('DELETE', url, params)
  }

  /**
   * Prepare request
   * @template T
   * @param {string} method
   * @param {string} url
   * @param {object} params
   * @returns {Promise<T>}
   * @private
   * @memberof RequestClient
   */
  prepareRequest (method, url, params) {
    return fetch(`${this.baseUrl}${url}`, {
      method,
      body: JSON.stringify(params),
      headers: this.headers
    }).then(res => res.json())
  }
}
