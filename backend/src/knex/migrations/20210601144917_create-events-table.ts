import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('events', (table) => {
    table.increments('id', {primaryKey: true});
    table.timestamp('begin_time', {useTz: false}).notNullable();
    table.timestamp('end_time', {useTz: false}).notNullable();
    table.integer('user_id').notNullable();
    table.foreign('user_id').references("users.id")
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
   .dropTableIfExists('events');
}

