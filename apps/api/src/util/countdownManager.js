import { COUNTDOWN_TYPE } from '../constants.js'
import redisClient from '../redis/index.js'

/**
 * @param {string} userId
 * @param {keyof COUNTDOWN_TYPE} countdownType
 */
const ensureCountdown = async (userId, countdownType) => {
  const type = COUNTDOWN_TYPE[countdownType]

  const key = `countdown:${countdownType}:${userId}`
  await redisClient.set(key, type.id)
  await redisClient.expire(key, type.duration)
}

/**
 * @param {string} userId
 * @param {keyof COUNTDOWN_TYPE} countdownType
 * @returns
 */
const isInCountdown = async (userId, countdownType) => {
  const type = COUNTDOWN_TYPE[countdownType]
  return await redisClient.exists(`countdown:${type.id}:${userId}`)
}

/**
 * @param {string} userId
 * @param {keyof COUNTDOWN_TYPE} countdownType
 * @returns {number} Time in seconds
 */
const getCountdown = async (userId, countdownType) => {
  const type = COUNTDOWN_TYPE[countdownType]
  return await redisClient.ttl(`countdown:${type.id}:${userId}`)
}

export default {
  ensureCountdown,
  isInCountdown,
  getCountdown
}
