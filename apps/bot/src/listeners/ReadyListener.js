import { Listener } from '../structures/index.js'

export default class ReadyListener extends Listener {
  /**
   *
   * @param {import('../LilicasClient')} client
   */
  constructor (client) {
    super(client, 'ready')
  }

  async run () {
    console.log('Logged in')

    for (const command of this.client.commands.values()) {
      await this.client.createGuildCommand(process.env.GUILD_ID, command.options)
    }
  }
}
