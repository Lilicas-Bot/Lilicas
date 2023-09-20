import { type Timestamp } from '../types.js'

export interface Adventure {
  id: string
  created_at: Timestamp
  finished_at: Timestamp | null
  guild_id: string
  party_id: string
}
