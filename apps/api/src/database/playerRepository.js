import prisma from './index.js'

export default {
  /**
   *
   * @param {string} id
   * @returns {import('@prisma/client').Player}
   */
  getOrCreate: async (id) => {
    const player = await prisma.player.findFirst({ where: { discord_id: id } })

    if (player) {
      return player
    }

    return await prisma.player.create({ data: { discord_id: id } })
  },

  /**
   *
   * @param {string} id
   * @param {import('@prisma/client').Player} data
   * @returns {Promise<void>}
   */
  update: async (id, data) => {
    return await prisma.player.update({ where: { discord_id: id }, data })
  }
}
