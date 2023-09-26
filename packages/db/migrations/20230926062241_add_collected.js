/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.alterTable('guilds', (table) => {
    table.integer('collected_at')
    table.integer('max_work_time').defaultTo(2)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.alterTable('guilds', (table) => {
    table.dropColumn('collected_at')
    table.dropColumn('max_work_time')
  })
}
