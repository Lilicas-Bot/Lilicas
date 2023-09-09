import { Router } from 'express'
import playerController from './controllers/playerController.js'

const router = Router()

router.use('/player/:id', playerController.get)

export default router