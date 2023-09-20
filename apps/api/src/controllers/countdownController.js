import { Router } from 'express'
import countdownManager from '../util/countdownManager.js'

const router = new Router()

router.post('/:type/:id', async (req, res) => {
  const { id, type } = req.params

  if (!id || !type) {
    return res.status(400).json({ error: 'Missing parameters' })
  }

  await countdownManager.ensureCountdown(id, type)

  res.status(201).json({ message: 'Countdown created' })
})

router.get('/:type/:id', async (req, res) => {
  const { id, type } = req.params

  if (!id || !type) {
    return res.status(400).json({ error: 'Missing parameters' })
  }

  const isInCountdown = await countdownManager.isInCountdown(id, type)

  res.status(200).json({ isInCountdown })
})

router.get('/:type/:id/time', async (req, res) => {
  const { id, type } = req.params

  if (!id || !type) {
    return res.status(400).json({ error: 'Missing parameters' })
  }

  const countdown = await countdownManager.getCountdown(id, type)

  res.status(200).json({ countdown })
})

export default router
