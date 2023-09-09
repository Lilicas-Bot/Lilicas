import { Interaction } from '../structures/index.js'

export default class TestInteraction extends Interaction {
  constructor (client) {
    super(client, 'test')
  }

  run (interaction) {
    interaction.createMessage({
      content: 'é mlk',
      flags: 64
    })
  }
}
