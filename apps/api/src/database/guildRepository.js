import { prisma, handlePrismaError } from './index.js'

/**
 * @typedef {import('@prisma/client').Prisma.GuildCreateInput} FullGuild
 */

/**
 * Create a guild
 * @param {string} id Discord user id
 * @param {import('@prisma/client').Guild} data
 * @returns {Promise<FullGuild>} Guild
 */
const create = async (id, data) => {
  const guild = await prisma.guild.create({
    include: {
      items: true,
      heroes: true,
      parties: true,
      adventures: true
    },
    data: {
      discordId: id,
      ...data
    }
  }).catch(handlePrismaError)

  return guild
}

/**
 * Get or create a guild
 * @param {string} id Discord user id
 * @returns {Promise<FullGuild>} Guild
 */
const getOrCreate = async (id) => {
  const player = await prisma.guild.findUnique({
    where: { discordId: id },
    include: {
      items: true,
      heroes: true,
      parties: true,
      adventures: true
    }
  }).catch(handlePrismaError)

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

  const guild = await prisma.guild.update({
    where: { discordId },
    include: {
      items: true,
      heroes: true,
      parties: true,
      adventures: true
    },
    data
  }).catch(handlePrismaError)

  return guild
}

export default {
  create,
  getOrCreate,
  update
}
