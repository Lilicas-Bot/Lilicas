import Loader from './Loader.js'

export default class InteractionLoader extends Loader {
  constructor (client) {
    super(client, 'src/interactions')
  }

  /**
   *
   * @param {import('../structures/Interaction')} Interaction
   */
  load (Interaction) {
    const interaction = new Interaction(this.client)
    this.client.interactions.set(interaction.id, interaction)
  }
}
