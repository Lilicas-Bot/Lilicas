/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  main: {
    client: 'cockroachdb',
    connection: process.env.DATABASE_URI ?? {
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
  }
}
