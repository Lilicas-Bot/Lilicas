import { isTruthy } from '@lilicas/utils'

const FETCH_OPTIONS = {
  headers: {
    Authorization: `Bot ${process.env.TOKEN}`
  }
}

const checkDiscordUser = (userId) =>
  fetch(`https://discord.com/api/v10/users/${userId}`, FETCH_OPTIONS)
    .then(res => res.ok)

/**
 * Checks if the data received is valid
 * @param {string[]} validKeys valid keys to check
 * @param {boolean} checkDiscord check if the discord id is valid
 * @returns {import('express').RequestHandler}
 */
const isDataValid = (validKeys = [], checkDiscord = true) => async (req, res, next) => {
  const id = req.params.id

  if (checkDiscord) {
    let isValid = await req.redis.hget(`users:${id}`, 'isValid')

    if (isValid === null) {
      const validation = await checkDiscordUser(id)
      isValid = validation

      req.redis.hset(`users:${id}`, 'isValid', isValid)
    }

    if (!isTruthy(isValid)) { // i don't know why, redis return 'true' as a string
      return res
        .status(400)
        .json({ error: 'Invalid discord id' })
    }
  }

  const invalidKeys = Object.keys(req.body).filter(key => !validKeys.includes(key))

  if (invalidKeys.length > 0) {
    return res
      .status(400)
      .json({ error: `Invalid keys: ${invalidKeys.join(', ')}` })
  }

  next()
}

export default isDataValid
