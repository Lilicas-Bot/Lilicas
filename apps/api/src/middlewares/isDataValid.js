import { isTruthy } from '@lilicas/utils'

const FETCH_OPTIONS = {
  headers: {
    Authorization: `Bot ${process.env.TOKEN}`
  }
}

const fetchDiscordUser = (userId) =>
  fetch(`https://discord.com/api/v10/users/${userId}`, FETCH_OPTIONS)
    .then(res => res.json())

/**
 * Checks if the data received is valid
 * @param {string[]} validKeys
 * @returns {import('express').RequestHandler}
 */
const isDataValid = (validKeys = []) => async (req, res, next) => {
  const id = req.params.id

  let isValid = await req.redis.hget(`users:${id}`, 'isValid')

  if (isValid === null) {
    const user = await fetchDiscordUser(id)

    isValid = user.code !== 10013 && user.code !== 0
    req.redis.hset(`users:${id}`, 'isValid', isValid)
  }

  if (!isTruthy(isValid)) { // i don't know why, redis return 'true' as a string
    return res
      .status(400)
      .json({ error: 'Invalid discord id' })
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
