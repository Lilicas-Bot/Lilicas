/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.createTable('guilds', (table) => {
    table.uuid('id').primary()
    table.string('discord_id').unique().notNullable()
    table.integer('coins').defaultTo(0)
    table.integer('glory').defaultTo(0)
    table.integer('level').defaultTo(1)
    table.string('name')
    table.string('description')
    table.string('icon')
    table.integer('xp').defaultTo(0)
    table.integer('npcs').defaultTo(0)
    table.integer('npcs_max').defaultTo(1)
    table.integer('max_items').defaultTo(1)
  })

  await knex.schema.createTable('items', (table) => {
    table.uuid('id').primary()
    table.string('name')
    table.string('type')
    table.string('rarity')
    table.string('icon')
  })

  await knex.schema.createTable('heroes', (table) => {
    table.uuid('id').primary()
    table.string('name')
    table.integer('xp').defaultTo(0)
    table.integer('level').defaultTo(1)
    table.integer('skill_points').defaultTo(0)
    table.integer('strength').defaultTo(1)
    table.integer('agility').defaultTo(1)
    table.integer('intellect').defaultTo(1)
    table.integer('vitality').defaultTo(1)
    table.integer('luck').defaultTo(1)
    table.boolean('available').defaultTo(true)
    table.uuid('guild_id').references('guilds.id')
  })

  await knex.schema.createTable('parties', (table) => {
    table.uuid('id').primary()
    table.uuid('guild_id').references('guilds.id')
    table.uuid('hero_id').references('heroes.id')
  })

  await knex.schema.createTable('adventures', (table) => {
    table.uuid('id').primary()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('finished_at')
    table.uuid('guild_id').references('guilds.id')
    table.uuid('party_id').references('parties.id')
  })

  await knex.schema.createTable('guild_item', (table) => {
    table.uuid('guild_id').references('guilds.id')
    table.uuid('item_id').references('items.id')
    table.integer('quantity').defaultTo(1)
  })

  await knex.schema.createTable('hero_item', (table) => {
    table.uuid('hero_id').references('heroes.id')
    table.uuid('item_id').references('items.id')
    table.integer('quantity').defaultTo(1)
  })

  await knex.schema.createTable('hero_parties', (table) => {
    table.uuid('hero_id').references('heroes.id')
    table.uuid('party_id').references('parties.id')
  })

  await knex.schema.createTable('parties_adventures', (table) => {
    table.uuid('party_id').references('parties.id')
    table.uuid('adventure_id').references('adventures.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.dropTableIfExists('adventures')
  await knex.schema.dropTableIfExists('parties')
  await knex.schema.dropTableIfExists('heroes')
  await knex.schema.dropTableIfExists('items')
  await knex.schema.dropTableIfExists('guilds')
  await knex.schema.dropTableIfExists('guild_hero')
  await knex.schema.dropTableIfExists('guild_item')
  await knex.schema.dropTableIfExists('hero_item')
  await knex.schema.dropTableIfExists('hero_parties')
  await knex.schema.dropTableIfExists('parties_adventures')
}
