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
    const customInteraction = this.client.interactions.get(interaction.data.custom_id)
    if (!customInteraction) return

    await customInteraction.run(interaction)
  }
}
