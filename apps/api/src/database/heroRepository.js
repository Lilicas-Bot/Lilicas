import prisma from './index.js'

/**
 * Create a hero for a guild
 * @param {string} id
 * @param {import('@prisma/client').Hero} data
 * @returns
 */
const create = async (id, data) => {
  return await prisma.hero.create({
    include: {
      itens: true,
      party: true
    },
    data: {
      guild: {
        connect: {
          discordId: id
        }
      },
      ...data
    }
  })
}

/**
 * Get or create a hero
 * @param {string} id Discord user id
 * @returns {import('@prisma/client').Hero} Hero
 */
const getOrCreate = async (id) => {
  const heros = await prisma.hero.findMany({
    where: { guild: { discordId: id } },
    include: {
      itens: true,
      party: true
    }
  })

  // check if array is empty
  if (heros.length > 0) {
    return heros
  }

  return await create(id, { name: 'Pepito' })
}

export {
  getOrCreate
}
