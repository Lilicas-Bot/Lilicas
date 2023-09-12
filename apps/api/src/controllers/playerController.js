import playerRepository from '../database/playerRepository.js'
import isDataValid from '../middlewares/isDataValid.js'
import { Router } from 'express'

const route = Router()

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
route.get('/:id', isDataValid([]), async (req, res) => {
  const discordId = req.params.id

  const player = await playerRepository.getOrCreate(discordId)
  res.status(200).json(player)
})

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
route.put('/:id', isDataValid([
  'coins',
  'glory',
  'level',
  'name',
  'description',
  'icon',
  'xp',
  'npcs',
  'npcsMax',
  'maxItens'
]), async (req, res) => {
  const discordId = req.params.id

  const data = await playerRepository.update(discordId, req.body)

  res.status(200).json(data)
})

export default route
