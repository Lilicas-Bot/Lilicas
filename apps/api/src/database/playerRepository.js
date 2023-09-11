import prisma from './index.js'

/**
 *
 * @param {string} id
 * @returns {import('@prisma/client').Player}
 */
const getOrCreate = async (id) => {
  const player = await prisma.player.findFirst({ where: { discordId: id } })

  if (player) {
    return player
  }

  return await prisma.player.create({ data: { discordId: id } })
}

/**
 *
 * @param {string} id
 * @param {import('@prisma/client').Player} data
 * @returns {Promise<void>}
 */
const update = async (id, data) => {
  const { discordId } = await getOrCreate(id)
  return await prisma.player.update({ where: { discordId }, data })
}

export default {
  getOrCreate,
  update
}
