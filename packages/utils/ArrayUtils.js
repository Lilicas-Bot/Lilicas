/**
 * Get random element from array
 * @template T
 * @param {Array<T>} array
 * @returns {T} Random element
 */
const getArrayRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

export {
  getArrayRandom
}
