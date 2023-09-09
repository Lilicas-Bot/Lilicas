import playerRepository from '../database/playerRepository.js'

export default {
  /**
   * 
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  get: async (req, res) => {
    const discordId = req.params.id
    const player = await playerRepository.getOrCreate(discordId)
    res.json(player).status(200)
  },
  
  /**
   * 
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  update: async (req, res) => {
    const discordId = req.params.id
    await playerRepository.update(discordId, req.body)

    res.status(200)
  }

}