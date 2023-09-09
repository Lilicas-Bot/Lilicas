import playerRepository from '../database/playerRepository.js'
import { Router } from 'express'

const route = Router()

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
route.get('/:id', async (req, res) => {
  const discordId = req.params.id
  const player = await playerRepository.getOrCreate(discordId)
  res.json(player).status(200)
})

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
route.put('/:id', async (req, res) => {
  const discordId = req.params.id

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'No data provided' })
  }

  await playerRepository.update(discordId, req.body)

  res.status(200)
})

export default route
