/**
 * @typedef countdownType
 * @property {string} COLLECT
 * @property {string} DAILY
 */

class Countdown {
  /**
   * Creates an instance of guild route.
   * @param {import('../Mythos.js').Mythos} client
   */
  constructor (client) {
    this.client = client
  }

  /**
   *
   * @param {string} id
   * @param {keyof countdownType} type
   * @returns
   */
  ensure (id, type) {
    return this.client.post(`/countdown/${type}/${id}`)
  }

  /**
   *
   * @param {string} id
   * @param {keyof countdownType} type
   * @returns {boolean}
   */
  check (id, type) {
    return this.client.get(`/countdown/${type}/${id}`)
  }

  /**
   *
   * @param {string} id
   * @param {keyof countdownType} type
   * @returns {number}
   */
  getTime (id, type) {
    return this.client.get(`/countdown/${type}/${id}/time`)
  }
}

export default Countdown
