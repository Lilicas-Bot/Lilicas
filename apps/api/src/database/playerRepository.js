import prisma from './index.js'

/**
 *
 * @param {string} id Discord user id
 * @returns {import('@prisma/client').Player} Player
 */
const getOrCreate = async (id) => {
  const player = await prisma.guild.findFirst({ where: { discordId: id } })

  if (player) {
    return player
  }

  return await prisma.guild.create({ data: { discordId: id } })
}

/**
 *
 * @param {string} id Discord user id
 * @param {import('@prisma/client').Player} data Partial player data
 * @returns {Promise<import('@prisma/client').Player>} Updated player
 */
const update = async (id, data) => {
  const { discordId } = await getOrCreate(id)
  return await prisma.guild.update({ where: { discordId }, data })
}

export default {
  getOrCreate,
  update
}
