import { Router, json } from 'express'
import guildController from './controllers/guildController.js'

const router = Router()

router.use(json())
router.use('/players', guildController)

export default router
