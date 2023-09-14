import { RequestClient } from '@lilicas/utils'

import Guild from './routes/Guild.js'

/**
 * @typedef {object} headers
 * @property {string} Content-Type
 * @property {string} Authorization
 */

/**
 * @typedef {object} Client
 * @property {string} host api host
 * @property {object} headers api headers
 * @property {RequestClient} requestClient api request client
 */

class Mythos extends RequestClient {
  /**
   * Creates an instance of sdk client.
   * @param {stirng} host api host
   * @param {headers} headers api headers
   */
  constructor (host, headers) {
    super(host, headers)

    /**
     * @type {Guild}
     * @description guild route
     * @memberof Client
     */
    this.guilds = new Guild(this)
  }
}

export default Mythos
