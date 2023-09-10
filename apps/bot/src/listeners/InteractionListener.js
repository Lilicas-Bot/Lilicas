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

      command.run(interaction)
    } else if (interaction instanceof ComponentInteraction) {
      const customInteraction = this.client.interactions.get(interaction.data.custom_id)
      if (!customInteraction) return

      interaction.run(interaction)
    }
  }
}
