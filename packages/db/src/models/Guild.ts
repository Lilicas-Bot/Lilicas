import { type Hero } from './Hero.js'
import { type Item } from './Item.js'
import { type Party } from './Party.js'
import { type Adventure } from './Adventure.js'

export interface Guild {
  id: string
  discord_id: string
  coins: number
  glory: number
  level: number
  name: string | null
  description: string | null
  icon: string | null
  xp: number
  npcs: number
  npcs_max: number
  max_items: number
  collected_at: number
  max_work_time: number
}

export interface GuildItem {
  guild_id: string
  item_id: string
  quantity: number
}

export type GuildFull = Guild & {
  heroes: Hero[]
  items: Item[]
  parties: Party[]
  adventures: Adventure[]
}

export interface InsertGuild {
  coins?: number
  glory?: number
  level?: number
  name?: string | null
  description?: string | null
  icon?: string | null
  xp?: number
  npcs?: number
  npcs_max?: number
  max_items?: number
  heroes?: Hero[]
  items?: Item[]
  parties?: Party[]
  adventures?: Adventure[]
}
