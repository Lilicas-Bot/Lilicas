import { guildRepository } from '@lilicas/db'
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
  'maxItens',
  'collected_at',
  'max_work_time'
])

const route = Router()

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
route.get('/:id', isDataValid(), async (req, res) => {
  const discordId = req.params.id
  const data = await guildRepository.getOrCreate(discordId)

  if (!data) {
    return res.status(400).json({ error: true })
  }

  res.status(200).json(data)
})

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
route.post('/:id', isDataValid(keys), async (req, res) => {
  const discordId = req.params.id
  const data = await guildRepository.create(discordId, req.body)

  if (!data) {
    return res.status(400).json({ error: true })
  }

  res.status(201).json(data)
})

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
route.put('/:id', isDataValid(keys), async (req, res) => {
  const discordId = req.params.id
  const data = await guildRepository.update(discordId, req.body)

  if (!data) {
    return res.status(400).json({ error: true })
  }

  res.status(200).json(data)
})

export default route
