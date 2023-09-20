import { type Adventure } from './Adventure.js'
import { type Hero } from './Hero.js'

export interface Party {
  id: string
  guild_id: string
}

export interface PartyHero {
  party_id: string
  hero_id: string
}

export interface PartyAdventure {
  party_id: string
  adventure_id: string
}

export type PartyFull = Party & {
  heroes: Hero[]
  adventures: Adventure[]
}
