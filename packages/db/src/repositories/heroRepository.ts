import { HERO_NAMES } from '../constants.js'
// TODO: fix type declaration
import { getArrayRandom } from '@lilicas/utils'
import { type Hero, type InsertHero } from '../models/Hero.js'
import { connection, handleErros } from '../connection.js'
import { type Guild } from '../models/Guild.js'

/**
 * create a hero
 * @param id discord id
 * @param data hero data
 * @returns hero
 */
const create = async (id: string, data: InsertHero): Promise<Hero | null> => {
  if (data.name === undefined) {
    data.name = getArrayRandom(HERO_NAMES)
  }

  const hero = await connection
    .transaction(async trx => {
      const guild = await trx('guilds')
        .select('*')
        .where('discord_id', id)
        .first<Guild>()

      const hero = await trx('heroes').insert({
        id: connection.raw('gen_random_uuid()'),
        guild_id: guild.id,
        ...data
      })
        .returning<Hero[]>('*')

      return hero
    }).catch(handleErros)

  if (hero === null) {
    return null
  }

  return hero[0]
}

/**
 * get or create a hero
 * @param id discord id
 * @returns hero[]
 */
const getOrCreate = async (id: string): Promise<Hero[] | null> => {
  const heros = await connection
    .transaction(async trx => {
      const guild = await trx('guilds')
        .select('*')
        .where('discord_id', id)
        .first<Guild>()

      const heros = await trx('heroes')
        .select('*')
        .where<Hero[]>('guild_id', guild.id)

      return heros
    })
    .catch(handleErros)

  if (Array.isArray(heros) && heros.length > 0) {
    return heros
  }

  const newHero = await create(id, { name: getArrayRandom(HERO_NAMES) })

  if (newHero === null) {
    return null
  }

  return [newHero]
}

/**
 * update a hero
 * @param id hero id
 * @param data hero partial data
 * @returns hero
 */
const update = async (id: string, data: InsertHero): Promise<Hero | null> => {
  if (Object.keys(data).length === 0) {
    return null
  }

  const hero = await connection('heroes')
    .update(data)
    .where('id', id)
    .returning<Hero[]>('*')
    .catch(handleErros)

  if (hero === null) {
    return null
  }

  return hero[0]
}

export default {
  create,
  getOrCreate,
  update
}
