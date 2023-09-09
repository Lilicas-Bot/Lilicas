import Loader from './Loader.js'

export default class ListenerLoader extends Loader {
  constructor (client) {
    super(client, 'src/listeners')
  }

  /**
   *
   * @param {import('../structures/Listener.js')} Listener
   */
  load (Listener) {
    const listener = new Listener(this.client)
    this.client.on(listener.name, listener.run.bind(listener))
  }
}
