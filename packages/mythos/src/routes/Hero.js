class Hero {
  /**
   * Creates an instance of guild route.
   * @param {import('../Mythos.js').Mythos} client
   */
  constructor (client) {
    this.client = client
  }

  /**
   * get heros by discord id
   * @param {string} discordId discord user id
   * @returns {Promise<object>} guild data
   */
  async get (discordId) {
    return this.client.get(`/heros/${discordId}`)
  }

  /**
   * create heros using discord user id
   * @param {string} discordId discord user id
   * @param {object} data partial hoero data to create
   * @returns {Promise<object>} guild data
   */
  async post (discordId, data) {
    return this.client.post(`/heros/${discordId}`, data)
  }

  /**
   * update heros using discord user id
   * @param {string} heroId hero id
   * @param {object} data partial hero data to update
   * @returns {Promise<object>} guild data
   */
  async update (heroId, data) {
    return this.client.put(`/heros/${heroId}`, data)
  }
}

export default Hero
