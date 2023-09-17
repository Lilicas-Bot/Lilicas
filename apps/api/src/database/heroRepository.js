import { prisma, handlePrismaError } from './index.js'
import { HERO_NAMES } from '../constants.js'
import { getArrayRandom } from '@lilicas/utils'

/**
 * @typedef {import('@prisma/client').Prisma.HeroCreateInput} FullHero
 */

/**
 * Create a hero for a guild
 * @param {string} id
 * @param {import('@prisma/client').Hero} data
 * @returns {FullHero} Hero
 */
const create = async (id, data) => {
  if (!data.name) {
    data.name = getArrayRandom(HERO_NAMES)
  }

  const hero = await prisma.hero.create({
    include: {
      items: true,
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
  }).catch(handlePrismaError)

  return hero
}

/**
 * Get all heroes from a guild or create a new one
 * @param {string} id Discord user id
 */
const getOrCreate = async (id) => {
  const hero = await prisma.hero.findMany({
    where: {
      guild: {
        discordId: id
      }
    },
    include: {
      items: true,
      party: true
    }
  }).catch(handlePrismaError)

  if (hero.length) {
    return hero
  }

  const newHero = await create(id, { name: getArrayRandom(HERO_NAMES) })

  return newHero.code ? newHero : [newHero]
}

/**
 * Update a hero
 * @param {string} id hero id
 * @param {FullHero} data Partial hero data
 */
const update = async (id, data) => {
  const hero = await prisma.hero.update({
    where: { id },
    include: {
      items: true,
      party: true
    },
    data
  }).catch(handlePrismaError)

  return hero
}

export default {
  create,
  getOrCreate,
  update
}
