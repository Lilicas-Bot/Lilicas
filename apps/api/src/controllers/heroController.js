import heroRepository from '../database/heroRepository.js'
import isDataValid from '../middlewares/isDataValid.js'
import { Router } from 'express'

// const keys = Object.freeze([
//   'name',
//   'xp',
//   'level',
//   'skillPoints',
//   'strength',
//   'agility',
//   'intellect',
//   'vitality',
//   'luck',
//   'available',
//   'guildId'
// ])

const route = Router()

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
route.get('/:id', isDataValid(), async (req, res) => {
  const discordId = req.params.id

  const player = await heroRepository.getOrCreate(discordId)
  res.status(200).json(player)
})

export default route
