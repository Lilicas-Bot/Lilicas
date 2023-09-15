import { COUNTDOWN_TYPE } from '../constants.js'
import redisClient from '../redis/index.js'

/**
 *
 * @param {string} userId
 * @param {object} countdownType
 */
const ensureCountdown = async (userId, countdownType) => {
  const type = COUNTDOWN_TYPE[countdownType]

  await redisClient.set(`countdown:${countdownType}:${userId}`, type.id, {
    EX: type.time,
    NX: true
  })
}

const isInCountdown = async (userId, countdownType) => {
  return await redisClient.exists(`countdown:${countdownType}:${userId}`)
}

export default {
  ensureCountdown,
  isInCountdown
}
