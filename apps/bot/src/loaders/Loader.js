import { loadDirectory } from '@lilicas/utils'

export default class Loader {
  /**
   *
   * @param {import('../LilicasClient')} client
   * @param {string} path
   */
  constructor (client, path) {
    this.client = client
    this.path = path
  }

  async loadFiles () {
    const modules = await loadDirectory(this.path)
    for (const module of modules) {
      this.load(module)
    }
  }

  load () {}
}
