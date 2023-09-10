import playerRepository from '../database/playerRepository.js'
import isDataValid from '../utils/isDataValid.js'
import { Router } from 'express'

const route = Router()

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
route.get('/:id', async (req, res) => {
  const discordId = req.params.id
  const isValid = await isDataValid(discordId, {}, [])

  if (isValid.error) {
    res.status(400).json(isValid)
    return
  }

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
  const isValid = await isDataValid(discordId, req.body, ['stars', 'money'])

  if (isValid.error) {
    res.status(400).json(isValid)
    return
  }

  const data = await playerRepository.update(discordId, req.body)

  res.json(data).status(200)
})

export default route
