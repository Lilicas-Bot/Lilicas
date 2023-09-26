import { MONEY_MULTIPLIER, HERO_PORCENTAGE } from './Constants.js'

/**
 * Convert milliseconds to other time formats
 * @param {number} timestamp - Time in milliseconds
 * @returns {object}
 */
const convertTime = (timestamp) => {
  return {
    timestamp,
    hours: () => Math.floor(this.timestamp / 3600000),
    minutes: () => Math.floor((this.timestamp % 3600000) / 60000),
    seconds: () => Math.floor(((this.timestamp % 3600000) % 60000) / 1000)
  }
}

/**
 * Calculate the amount of money produced in a given period
 * @params {number} timestamp - Time in milliseconds
 * @params {number} npcs - Number of NPCS working
 * @params {number} heroes - Number of Heroes working
 * @returns {object}
*/
const calculateProduction = (timestamp, npcs, heroes) => {
  const generation = npcs * MONEY_MULTIPLIER
  const heroGeneration = heroes * (MONEY_MULTIPLIER * HERO_PORCENTAGE)

  const time = convertTime(timestamp)
  const hours = time.hours()
  const minutes = time.minutes()

  const npcProducedByHour = generation * hours
  const npcProducedByMin = (generation / 60) * minutes
  const npcProducedTotal = Math.floor(npcProducedByHour + npcProducedByMin)

  const heroProducedByHour = heroGeneration * hours
  const heroProducedByMin = (heroGeneration / 60) * minutes
  const heroProcedTotal = Math.floor(heroProducedByHour + heroProducedByMin)

  return {
    npcs: npcProducedTotal,
    heroes: heroProcedTotal,
    total: npcProducedTotal + heroProcedTotal
  }
}

export {
  convertTime,
  calculateProduction
}
