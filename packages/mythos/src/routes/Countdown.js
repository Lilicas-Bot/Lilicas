/**
 * @typedef countdownType
 * @property {string} COLLECT
 * @property {string} DAILY
 */

class Countdown {
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
}

export default Countdown
