import prisma from './index.js'
import { HeroNames } from '../constants.js'
import { getArrayRandom } from '@lilicas/utils'

/**
 * @typedef {object} FullHero
 * @property {string} name
 * @property {number} xp
 * @property {number} level
 * @property {number} skillPoints
 * @property {number} strength
 * @property {number} agility
 * @property {number} intellect
 * @property {number} vitality
 * @property {number} luck
 * @property {boolean} available
 * @property {string} guildId
 * @property {import('@prisma/client').Item[]?} itens
 * @property {import('@prisma/client').Party[]?} party
 */

/**
 * Create a hero for a guild
 * @param {string} id
 * @param {import('@prisma/client').Hero} data
 * @returns {FullHero} Hero
 */
const create = async (id, data) => {
  if (!data.name) {
    data.name = getArrayRandom(HeroNames)
  }

  const hero = await prisma.hero.create({
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

  return hero
}

/**
 * Get all heroes from a guild or create a new one
 * @param {string} id Discord user id
 * @returns {FullHero[]} Hero
 */
const getOrCreate = async (id) => {
  const hero = await prisma.hero.findMany({
    where: {
      guild: {
        discordId: id
      }
    },
    include: {
      itens: true,
      party: true
    }
  })

  if (hero.length) {
    return hero
  }

  const newHero = await create(id, { name: getArrayRandom(HeroNames) })

  return [newHero]
}

/**
 * Update a hero
 * @param {string} id hero id
 * @param {import('@prisma/client').} data Partial hero data
 * @returns {import('@prisma/client').Hero} Updated hero
 */
const update = async (id, data) => {
  const hero = await prisma.hero.update({
    where: { id },
    include: {
      itens: true,
      party: true
    },
    data
  })

  return hero
}

export default {
  create,
  getOrCreate,
  update
}
