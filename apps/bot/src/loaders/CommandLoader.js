import Loader from './Loader.js'

export default class CommandLoader extends Loader {
  constructor (client) {
    super(client, 'src/commands')
  }

  async load (Command) {
    const command = new Command(this.client)

    this.client.commands.set(command.options.name, command)
  }
}
