import { Router, json } from 'express'
import playerController from './controllers/playerController.js'

const router = Router()

router.use(json())
router.use('/players', playerController)

export default router