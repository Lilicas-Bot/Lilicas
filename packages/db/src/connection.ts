import K from 'knex'
import config from '../knexfile.js'

const connection = K.knex(config[process.env.NODE_ENV ?? 'main'])

const handleErrors = (error: Error): null => {
  console.error(error)
  return null
}

export {
  connection,
  handleErrors
}
