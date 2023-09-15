/**
 * Get random element from array
 * @param {Array} array
 * @returns {any} Random element
 */
const getArrayRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

export {
  getArrayRandom
}
