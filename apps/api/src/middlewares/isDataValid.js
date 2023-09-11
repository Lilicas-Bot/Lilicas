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
const isDataValid = (validKeys) => async (req, res, next) => {
  const id = req.params.id
  const { code } = await fetchDiscordUser(id)

  if (code === 10013 || code === 0) {
    res
      .status(400)
      .json({ error: 'Invalid discord id' })
    return
  }

  const invalidKeys = Object.keys(req.body).filter(key => !validKeys.includes(key))

  if (invalidKeys.length > 0) {
    res
      .status(400)
      .json({ error: `Invalid keys: ${invalidKeys.join(', ')}` })
    return
  }

  next()
}

export default isDataValid
