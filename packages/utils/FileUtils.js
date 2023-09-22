import { readdir, stat } from 'node:fs/promises'
import { resolve } from 'node:path'

/**
 * Load all modules from a directory
 * @param {string} path directory path
 * @param {Array} modules modules array
 * @returns {Array} modules array
 */
const loadDirectory = async (path, modules = []) => {
  const files = await readdir(path)
    .catch(() => [])

  for await (const file of files) {
    const filePath = resolve(path, file)
    const isDirectory = await stat(filePath).then((d) => d.isDirectory())

    if (isDirectory) {
      await loadDirectory(filePath, modules)
      continue
    }

    if (file.endsWith('.js')) {
      const module = await import('file://' + filePath)
      modules.push(module.default)
    }
  }

  return modules
}

export {
  loadDirectory
}
