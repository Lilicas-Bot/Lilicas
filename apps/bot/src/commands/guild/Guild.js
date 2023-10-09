import { Command } from '../../structures/index.js'
import { XP_MULTIPLIER, ASSETS_URL } from '../../util/Constants.js'
import { calculateProduction } from '../../util/Utils.js'
import Embed from '../../structures/Embed.js'
import { coin, diamondShape, member, box, bow, tools } from '../../util/Emojis.js'

export default class Guild extends Command {
  constructor (client) {
    super(client, 'guild', { description: 'Visualizar sua Guilda' })
  }

  async run (interaction) {
    const guild = await this.client.db.guilds.get(interaction.member.id)
    const heroes = guild?.heroes?.reduce((acc, curr) => acc + Number(curr.available, 0)) || 0

    const now = Date.now()
    const oneHourInMs = 60 * 60 * 1000
    const collectedAt = guild.collected_at || now - oneHourInMs

    const timePast = now - Math.min(collectedAt, (guild.max_work_time * oneHourInMs))
    const produced = calculateProduction(timePast, guild.npcs, heroes)

    const fields = [
      {
        name: `${coin} Cofre`,
        value: `**${guild.coins} Moedas**`,
        inline: true
      },
      {
        name: `${diamondShape} Reputação`,
        value: `**${guild.glory} Glória**`,
        inline: true
      },
      {
        name: `${bow} Heróis`,
        value: `**${guild?.heroes?.length}**`,
        inline: true
      },
      {
        name: `${member} Membros`,
        value: `**${guild.npcs}/${guild.npcs_max}**`,
        inline: true
      },
      {
        name: `${box} Inventário`,
        value: `**${guild.items?.length}/${guild.maxItems}**`,
        inline: true
      },
      {
        name: `${tools} Produzido`,
        value: `**${produced.total}**`,
        inline: true
      }
    ]

    const embed = new Embed()
      .setTitle(guild.name || 'Guilda sem Nome')
      .setDescription(`Level ${guild.level}  |  ${guild.xp}/${guild.level * XP_MULTIPLIER}`)
      .setThumbnail(guild.icon ? `${ASSETS_URL}/${process.env.REPOSITORY_BRANCH}/assets/banners/${guild.icon}.png` : '')
      .addFields(fields)

    return { embed }
  }
}
