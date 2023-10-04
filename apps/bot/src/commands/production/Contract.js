import { Command } from '../../structures/index.js'
import { NPC_PRICE } from '../../util/Constants.js'
import { success, error } from '../../util/Emojis.js'

export default class Contract extends Command {
  constructor (client) {
    super(client, 'contract', {
      description: 'Criar um contrato com NPCs',
      options: [
        {
          name: 'quantidade',
          type: 4,
          description: 'Quantidade de contratos',
          min_value: 1
        }
      ]
    })
  }

  async run (interaction) {
    const guild = await this.client.db.guilds.get(interaction.member.id)
    const quantity = interaction.data?.options?.quantidade || 1

    if ((guild.npcs + quantity) > guild.npcs_max) {
      return `${error} Esta quantidade de contratos está acima do limite de sua Guilda!`
    }

    const price = NPC_PRICE * quantity

    if (guild.money < price) {
      return `${error} Sua Guilda não possui dinheiro suficiente para esta quantidade de contratos!`
    }

    const money = guild.money - price
    const npcs = guild.npcs + quantity

    await this.client.db.guilds.update(interaction.member.id, { money, npcs })

    return `${success} NPCs contratados com sucesso!`
  }
}
