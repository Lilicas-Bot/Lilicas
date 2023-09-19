import { CommandInteraction, ComponentInteraction } from 'eris'
import { Listener } from '../structures/index.js'

export default class InteractionListener extends Listener {
  constructor (client) {
    super(client, 'interactionCreate')
  }

  /**
   *
   * @param {import('eris').Interaction} interaction
   */
  async run (interaction) {
    if (interaction instanceof CommandInteraction) {
      const command = this.client.commands.get(interaction.data.name)
      if (!command) return

      if (interaction?.data?.options) {
        interaction.data.options = this.parseOptions(interaction.data.options)
      }

      try {
        const cmdRun = await command.run(interaction)
        if (cmdRun) {
          interaction.createMessage(cmdRun)
        }
      } catch (e) {
        console.log(e)
        interaction.createMessage('Error')
      }
    } else if (interaction instanceof ComponentInteraction) {
      const customInteraction = this.client.interactions.get(interaction.data.custom_id)
      if (!customInteraction) return

      interaction.run(interaction)
    }
  }

  parseOptions (options) {
    return options.reduce((acc, curr) => { acc[curr.name] = curr.value; return acc }, {})
  }
}
