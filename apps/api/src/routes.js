import { Router, json } from 'express'
import guildController from './controllers/guildController.js'

const router = Router()

router.use(json())
router.use('/guilds', guildController)

export default router
