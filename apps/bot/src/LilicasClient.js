import { Client } from 'eris'
import { Mythos } from '@lilicas/mythos'
import Loaders from './loaders/index.js'

export default class LilicasClient extends Client {
  constructor (token, options) {
    super(token, { ...options })

    this.db = new Mythos(process.env.API_URI)
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
