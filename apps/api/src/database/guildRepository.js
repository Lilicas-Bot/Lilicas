import prisma from './index.js'

/**
 * @typedef {object} FullGuild
 * @property {string} discordId
 * @property {number} coins
 * @property {number} glory
 * @property {number} level
 * @property {string} name
 * @property {string} description
 * @property {string} icon
 * @property {number} xp
 * @property {number} npcs
 * @property {number} npcsMax
 * @property {import('@prisma/client').Item[]} itens
 * @property {number} itensMax
 * @property {import('@prisma/client').Hero[]} heroes
 * @property {import('@prisma/client').Party[]} parties
 * @property {import('@prisma/client').Adventure[]} adventures
 */

/**
 * Get or create a guild
 * @param {string} id Discord user id
 * @returns {FullGuild} Player
 */
const getOrCreate = async (id) => {
  const player = await prisma.guild.findUnique({
    where: { discordId: id },
    include: {
      itens: true,
      heroes: true,
      parties: true,
      adventures: true
    }
  })

  if (player) {
    return player
  }

  return await prisma.guild.create({ data: { discordId: id } })
}

/**
 * Update a guild
 * @param {string} id Discord user id
 * @param {FullGuild} data Partial guild data
 * @returns {Promise<FullGuild>} Updated guild
 */
const update = async (id, data) => {
  const { discordId } = await getOrCreate(id)

  return await prisma.guild.update({
    where: { discordId },
    include: {
      itens: true,
      heroes: true,
      parties: true,
      adventures: true
    },
    data
  })
}

export default {
  getOrCreate,
  update
}
