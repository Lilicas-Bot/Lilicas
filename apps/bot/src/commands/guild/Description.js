import { Command } from '../../structures/index.js'
import { success } from '../../util/Emojis.js'

export default class Description extends Command {
  constructor (client) {
    super(client, 'description', {
      description: 'Mude a descrição de sua Guilda',
      options: [
        {
          type: 3,
          name: 'descricao',
          description: 'Nova descrição da Guilda',
          max_length: 25,
          required: true
        }
      ]
    })
  }

  async run (interaction) {
    const description = interaction.data?.options.descricao
    await this.client.db.guilds.update(interaction.member.id, { description })
    return `${success} Nome da Guilda alterado com sucesso!`
  }
}
