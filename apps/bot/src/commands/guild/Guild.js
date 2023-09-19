import { Command } from '../../structures/index.js'
import { XP_MULTIPLIER } from '../../util/Constants.js'
import Embed from '../../structures/Embed.js'
import { coin, diamondShape, member, box } from '../../util/Emojis.js'

export default class Guild extends Command {
  constructor (client) {
    super(client, 'guild', { description: 'Visualizar sua Guilda' })
  }

  async run (interaction) {
    const guild = await this.client.db.guilds.get(interaction.member.id)
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
        name: '',
        value: '',
        inline: true
      },
      {
        name: `${member} Membros`,
        value: `**${guild.npcs}/${guild.npcsMax}**`,
        inline: true
      },
      {
        name: `${box} Inventory`,
        value: `**${guild.items?.length}/${guild.maxItems}**`,
        inline: true
      },
      {
        name: '',
        value: '',
        inline: true
      }
    ]

    const embed = new Embed()
      .setTitle(guild.name || 'Guilda sem Nome')
      .setDescription(`Level ${guild.level}  |  ${guild.xp}/${guild.level * XP_MULTIPLIER}`)
      .setThumbnail(guild.icon || '')
      .addFields(fields)

    return { embed }
  }
}
