import K from 'knex'

const connection = K.knex({
  client: 'cockroachdb',
  connection: process.env.DATABASE_URI || {
    host: 'localhost',
    port: 26257,
    database: 'lilicas',
    user: 'root',
    password: ''
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: '_knex_migrations'
  }
})

const handleErrors = (error: Error): null => {
  console.error(error)
  return null
}

export {
  connection,
  handleErrors
}
