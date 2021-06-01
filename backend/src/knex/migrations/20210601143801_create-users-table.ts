import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id', {primaryKey: true});
    table.string('name', 30).notNullable();
    table.string('email', 30).unique().notNullable();
    table.string('password', 60).notNullable();
    table.boolean('is_admin').notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
   .dropTableIfExists('users');
}

