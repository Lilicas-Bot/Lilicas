import { Command } from '../../structures/index.js'
import { success } from '../../util/Emojis.js'

export default class Banner extends Command {
  constructor (client) {
    super(client, 'banner', {
      description: 'Define o banner da sua Guilda',
      options: [
        {
          name: 'id',
          type: 4,
          description: 'ID do Banner selecionado',
          min_value: 1,
          max_value: 48,
          required: true
        }
      ]
    })
  }

  async run (interaction) {
    const icon = `shape-${interaction.data?.options.id}`
    await this.client.db.guilds.update(interaction.member.id, { icon })
    return `${success} Banner da Guilda alterado com sucesso!`
  }
}
