import { Constants } from 'eris'
import { Listener } from '../structures/index.js'

export default class MessageListener extends Listener {
  constructor (client) {
    super(client, 'messageCreate')
  }

  run (message) {
    if (message.content === '!test') {
      this.client.createMessage(message.channel.id, {
        content: 'teste mlk',
        components: [
          {
            type: Constants.ComponentTypes.ACTION_ROW,
            components: [
              {
                type: Constants.ComponentTypes.BUTTON,
                style: Constants.ButtonStyles.PRIMARY,
                custom_id: 'test',
                label: 'é mlk?',
                disabled: false
              }
            ]
          }
        ]
      })
    }
  }
}
