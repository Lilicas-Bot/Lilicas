import { type Item } from './Item.js'

export interface Hero {
  id: string
  name: string
  xp: number
  level: number
  skill_points: number
  strength: number
  agility: number
  intellect: number
  vitality: number
  luck: number
  available: boolean
  guild_id: string
}

export interface HeroItem {
  hero_id: string
  item_id: string
  quantity: number
}

export type HeroFull = Hero & {
  items: Item[]
}

export interface InsertHero {
  name: string
  xp?: number
  level?: number
  skill_points?: number
  strength?: number
  agility?: number
  intellect?: number
  vitality?: number
  luck?: number
  available?: boolean
  guild_id?: string
  items?: Item[]
}
