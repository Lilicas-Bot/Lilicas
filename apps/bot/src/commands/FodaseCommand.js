import { Command } from '../structures/index.js'

export default class FodaseCommand extends Command {
  constructor (client) {
    super(client, 'fodase', { description: 'Fodase' })
  }

  run (interaction) {
    interaction.createMessage({
      content: 'Fodase',
      flags: 64
    })
  }
}
