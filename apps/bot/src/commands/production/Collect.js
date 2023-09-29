import { Command } from '../../structures/index.js'
import { calculateProduction } from '../../util/Utils.js'
import { success } from '../../util/Emojis.js'
import Embed from '../../structures/Embed.js'

export default class Guild extends Command {
  constructor (client) {
    super(client, 'collect', { description: 'Coletar seus recursos' })
  }

  async run (interaction) {
    const guild = await this.client.db.guilds.get(interaction.member.id)
    const heroes = guild?.heroes?.reduce((acc, curr) => acc + Number(curr.available, 0))

    const now = Date.now()
    const oneHourInMs = (60 * 60 * 1000)
    const collectedAt = guild.collected_at || now - oneHourInMs

    const timePast = now - Math.min(collectedAt, (guild.max_work_time * oneHourInMs))
    const produced = calculateProduction(timePast, guild.npcs, heroes)

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
