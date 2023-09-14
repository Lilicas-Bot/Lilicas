import { Router, json } from 'express'
import guildController from './controllers/guildController.js'
import heroController from './controllers/heroController.js'

const router = Router()

router.use(json())
router.use('/guilds', guildController)
router.use('/heroes', heroController)

export default router
