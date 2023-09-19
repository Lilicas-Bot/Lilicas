import { Command } from '../../structures/index.js'
import { success } from '../../util/Emojis.js'

export default class Name extends Command {
  constructor (client) {
    super(client, 'name', {
      description: 'Mude o nome de sua Guilda',
      options: [{
        type: 3,
        name: 'nome',
        description: 'Novo nome da Guilda',
        min_length: 4,
        max_length: 12
      }]
    })
  }

  async run (interaction) {
    const name = interaction.data?.options.nome.replace(/[^\w\s-]/g, '')
    await this.client.db.guilds.update(interaction.member.id, { name })
    return `${success} Nome da Guilda alterado com sucesso!`
  }
}
