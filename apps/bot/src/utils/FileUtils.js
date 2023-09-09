import { readdir, stat } from 'node:fs/promises'
import { resolve } from 'node:path'

export const loadDirectory = async (path) => {
  const files = await readdir(path)

  const promisedFiles = files.map(async (file) => {
    const filePath = resolve(path, file)
    const isDirectory = await stat(filePath).then((d) => d.isDirectory())

    if (isDirectory) return loadDirectory(filePath)

    if (file.endsWith('.js')) {
      return import('file://' + filePath)
        .then((mod) => mod.default)
    }
  })

  return Promise.all(promisedFiles)
    .then((arr) => arr.flat())
}
