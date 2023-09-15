import { COUNTDOWN_TYPE } from '../constants.js'
import redisClient from '../redis/index.js'

/**
 *
 * @param {string} userId
 * @param {object} countdownType
 */
const ensureCountdown = async (userId, countdownType) => {
  const type = COUNTDOWN_TYPE[countdownType]

  const key = `countdown:${countdownType}:${userId}`
  await redisClient.set(key, type.id)
  await redisClient.expire(key, type.duration)
}

const isInCountdown = async (userId, countdownType) => {
  return await redisClient.exists(`countdown:${countdownType}:${userId}`)
}

export default {
  ensureCountdown,
  isInCountdown
}
