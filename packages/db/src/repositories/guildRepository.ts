import { type Guild, type InsertGuild } from '../models/Guild.js'
import { connection, handleErros } from '../connection.js'

const create = async (id: string, data: InsertGuild): Promise<Guild | null> => {
  const query = await connection('guilds')
    .select('*')
    .where('discord_id', id)
    .first<Guild>()
    .catch(handleErros)

  if (query) {
    return await update(id, data)
  }

  const guild = await connection('guilds')
    .insert({
      id: connection.raw('gen_random_uuid()'),
      discord_id: id,
      ...data
    })
    .returning<Guild[]>('*')
    .catch(handleErros)

  if (!guild) {
    return null
  }

  return guild[0]
}

const getOrCreate = async (id: string): Promise<Guild | null> => {
  const query = await connection
    .select('*')
    .from('guilds')
    .where('discord_id', id)
    .first<Guild>()
    .catch(handleErros)

  if (query) {
    return query
  }

  return await create(id, { name: 'New Guild' })
}

const update = async (id: string, data: InsertGuild): Promise<Guild | null> => {
  const query = await getOrCreate(id)

  if (!query) {
    return null
  }

  const guild = await connection
    .update(data)
    .from('guilds')
    .where('discord_id', query.discord_id)
    .returning<Guild[]>('*')
    .catch(handleErros)

  if (!guild) {
    return null
  }

  return guild[0]
}

export default {
  create,
  getOrCreate,
  update
}
