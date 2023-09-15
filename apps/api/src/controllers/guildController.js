import guildRepository from '../database/guildRepository.js'
import isDataValid from '../middlewares/isDataValid.js'
import { Router } from 'express'

const keys = Object.freeze([
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
])

const route = Router()

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
route.get('/:id', isDataValid(), async (req, res) => {
  const discordId = req.params.id

  const player = await guildRepository.getOrCreate(discordId)
  res.status(200).json(player)
})

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
route.post('/:id', isDataValid(), async (req, res) => {
  const discordId = req.params.id
  const data = await guildRepository.create(discordId, req.body)

  res.status(201).json(data)
})

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
route.put('/:id', isDataValid(keys), async (req, res) => {
  const discordId = req.params.id

  const data = await guildRepository.update(discordId, req.body)

  res.status(200).json(data)
})

export default route
