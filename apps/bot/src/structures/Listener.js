export default class Listener {
  /**
   *
   * @param {import('../LilicasClient')} client
   * @param {string} name
   */
  constructor (client, name) {
    this.client = client
    this.name = name
  }

  run () {}
}
