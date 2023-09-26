import { type Guild, type InsertGuild } from '../models/Guild.js'
import { connection, handleErrors } from '../connection.js'

/**
 * create a guild
 * @param id discord id
 * @param data guild data
 * @returns guild | null
 */
const create = async (id: string, data: InsertGuild): Promise<Guild | null> => {
  const query = await connection('guilds')
    .select('*')
    .where('discord_id', id)
    .first<Guild>()
    .catch(handleErrors)

  if (query !== null) {
    return await update(id, data)
  }

  const guild = await connection('guilds')
    .insert({
      id: connection.raw('gen_random_uuid()'),
      discord_id: id,
      ...data
    })
    .returning<Guild[]>('*')
    .catch(handleErrors)

  if (guild === null) {
    return null
  }

  return guild[0]
}

/**
 * get or create a guild
 * @param id discord id
 * @returns guild | null
 */
const getOrCreate = async (id: string): Promise<Guild | null> => {
  const query = await connection
    .select('*')
    .from('guilds')
    .where('discord_id', id)
    .first<Guild>()
    .catch(handleErrors)

  if (query !== null) {
    return query
  }

  return await create(id, { name: 'New Guild' })
}

/**
 * update a guild
 * @param id discord id
 * @param data guild data
 */
const update = async (id: string, data: InsertGuild): Promise<Guild | null> => {
  const query = await getOrCreate(id)

  if (query === null) {
    return null
  }

  const guild = await connection
    .update(data)
    .from('guilds')
    .where('discord_id', query.discord_id)
    .returning<Guild[]>('*')
    .catch(handleErrors)

  if (guild === null) {
    return null
  }

  return guild[0]
}

export default {
  create,
  getOrCreate,
  update
}
