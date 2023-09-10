/**
 * Checks if the data received is valid
 * @param {string} discordId The discord id of the player
 * @param {object} body The body of the request
 * @param {string[]} validKeys The valid keys for the body
 * @returns
 */
const isDataValid = async (discordId, body, validKeys) => {
  // TODO: cache discord user data
  // TODO: create request handler
  const user = await fetch('https://discord.com/api/v10/users/' + discordId, {
    headers: {
      Authorization: `Bot ${process.env.TOKEN}`
    }
  }).then(res => res.json())

  if (user.message === 'Unknown User') {
    return { error: 'Invalid discord id' }
  }

  const invalidKeys = Object.keys(body).filter(key => !validKeys.includes(key))
  if (invalidKeys.length > 0) {
    return { error: `Invalid keys: ${invalidKeys.join(', ')}` }
  }

  return { error: null }
}

export default isDataValid
