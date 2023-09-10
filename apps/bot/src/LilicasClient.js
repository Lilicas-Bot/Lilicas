import { Client } from 'eris'
import Loaders from './loaders/index.js'

export default class LilicasClient extends Client {
  constructor (token, options) {
    super(token, { ...options })

    this.commands = new Map()
    this.interactions = new Map()
  }

  load () {
    for (const Loader of Loaders) {
      const loader = new Loader(this)
      loader.loadFiles()
    }
  }

  login () {
    this.load()

    return super.connect()
  }
}
