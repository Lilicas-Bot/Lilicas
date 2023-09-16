class Guild {
  /**
   * Creates an instance of guild route.
   * @param {import('../Mythos.js').Mythos} client
   */
  constructor (client) {
    this.client = client
  }

  /**
   * get user guild by discord id
   * @param {string} discordId discord user id
   * @returns {Promise<object>} guild data
   */
  get (discordId) {
    return this.client.get(`/guilds/${discordId}`)
  }

  /**
   * create guild using discord user id
   * @param {string} discordId discord user id
   * @param {object} data guild data, will create default guild if not provided
   * @returns {Promise<object>} guild data
   */
  post (discordId, data) {
    return this.client.post(`/guilds/${discordId}`, data)
  }

  /**
   * update guild using discord user id
   * @param {string} discordId discord user id
   * @param {object} data partial guild data to update
   * @returns {Promise<object>} guild data
   */
  update (discordId, data) {
    return this.client.put(`/guilds/${discordId}`, data)
  }
}

export default Guild
