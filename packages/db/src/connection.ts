import K from 'knex'
import config from '../knexfile.js'

// use to parse numeric strings as numbers
import pg from 'pg'
pg.types.setTypeParser(20, 'text', parseInt)

const connection = K.knex(config[process.env.NODE_ENV ?? 'main'])

const handleErrors = (error: Error): null => {
  console.error(error)
  return null
}

export {
  connection,
  handleErrors
}
