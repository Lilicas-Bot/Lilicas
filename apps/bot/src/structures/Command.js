export default class Command {
  constructor (client, name, options) {
    this.client = client
    this.options = { name, ...options }
  }

  run () {}
}
