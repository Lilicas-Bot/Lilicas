import { Router, json } from 'express'
import guildController from './controllers/guildController.js'
import heroController from './controllers/heroController.js'
import countdownController from './controllers/countdownController.js'

const router = Router()

router.use(json())
router.use('/guilds', guildController)
router.use('/heroes', heroController)
router.use('/countdown', countdownController)

export default router
