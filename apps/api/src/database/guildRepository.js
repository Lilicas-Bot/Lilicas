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
 * @property {number} itensMax
 * @property {import('@prisma/client').Item[]?} itens
 * @property {import('@prisma/client').Hero[]?} heroes
 * @property {import('@prisma/client').Party[]?} parties
 * @property {import('@prisma/client').Adventure[]?} adventures
 */

/**
 * Create a guild
 * @param {string} id Discord user id
 * @param {import('@prisma/client').Guild} data
 * @returns {FullGuild} Guild
 */
const create = async (id, data) => {
  const guild = await prisma.guild.create({
    include: {
      itens: true,
      heroes: true,
      parties: true,
      adventures: true
    },
    data: {
      discordId: id,
      ...data
    }
  })

  return guild
}

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
 * @returns {FullGuild} Updated guild
 */
const update = async (id, data) => {
  const { discordId } = await getOrCreate(id)

  const guild = await prisma.guild.update({
    where: { discordId },
    include: {
      itens: true,
      heroes: true,
      parties: true,
      adventures: true
    },
    data
  })

  return guild
}

export default {
  create,
  getOrCreate,
  update
}
