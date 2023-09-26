import { Command } from '../../structures/index.js'
import { calculateProduction } from '../../util/Utils.js'
import { success } from '../../util/Emojis.js'
import Embed from '../../structures/Embed.js'

export default class Guild extends Command {
  constructor (client) {
    super(client, 'collect', { description: 'Coletar seus recursos' })
  }

  async run (interaction) {
    const data = await this.client.db.guilds.get(interaction.member.id)
    const heroes = data.heroes.reduce((acc, curr) => acc + Number(curr.available, 0))

    const now = Date.now()
    const oneHourInMs = (60 * 60 * 1000)
    const collectedAt = data.collected_at || now - oneHourInMs

    const timePast = now - Math.min(collectedAt, (data.max_work_time * oneHourInMs))
    const produced = calculateProduction(timePast, data.npcs, heroes)

    const fields = [
      {
        name: 'Total',
        value: `**$${produced.total}**`
      },
      {
        name: 'NPCs',
        value: `**$${produced.npcs}**`
      }
    ]

    if (heroes > 0) {
      fields.push({
        name: '',
        value: `**$${produced.heroes}**`
      })
    }

    const embed = new Embed()
      .addFields(fields)

    return { content: `${success} Coletado com sucesso!`, embed }
  }
}
