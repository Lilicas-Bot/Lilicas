import K from 'knex'
import config from '../knexfile.js'

const { NODE_ENV } = process.env

const connection = K.knex(config[NODE_ENV ?? 'main'])

const handleErros = (error: Error): null => {
  console.error(error)
  return null
}

export {
  connection,
  handleErros
}
