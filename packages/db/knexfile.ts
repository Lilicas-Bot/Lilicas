import type { Knex } from 'knex'

const config: Record<string, Knex.Config> = {
  main: {
    client: 'cockroachdb',
    connection: process.env.DATABASE_URI ?? {
      database: 'lilicas',
      user: 'root',
      password: '',
      port: 26257
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

export default config
