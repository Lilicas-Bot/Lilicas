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
  res.json(player).status(200)
})

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
route.put('/:id', isDataValid(['stars', 'money']), async (req, res) => {
  const discordId = req.params.id

  const data = await playerRepository.update(discordId, req.body)

  res.json(data).status(200)
})

export default route
