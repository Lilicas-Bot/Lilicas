import { Command } from '../../structures/index.js'
import { ArithmeticProgressionSum } from '../../util/Utils.js'
import { WORKPLACE_PRICE } from '../../util/Constants.js'
import { success, error } from '../../util/Emojis.js'

export default class Workplaces extends Command {
  constructor (client) {
    super(client, 'workplaces', {
      description: 'Comprar novos espaços de trabalho para NPCs',
      options: [
        {
          name: 'quantidade',
          type: 4,
          description: 'Quantidade de novos espaços de trabalho',
          min_value: 1
        }
      ]
    })
  }

  async run (interaction) {
    const guild = this.client.db.guilds.get(interaction.member.id)
    const quantity = interaction.data?.options?.quantidade || 1
    const price = WORKPLACE_PRICE * ArithmeticProgressionSum(guild.npcs_max + 1, quantity, 1)

    if (guild.money < price) {
      return `${error} Sua Guilda não tem dinheiro suficiente para essa expansão!`
    }

    return `${success} ${quantity} Novos espaços de trabalhos construidos com sucesso!`
  }
}
