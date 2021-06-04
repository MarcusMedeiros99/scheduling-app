import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("events").del();

    // Inserts seed entries
    await knex("events").insert([
        { title: "My event",  begin_time: 1622811877, end_time: 1622819877, user_id: 1},
        { title: "My event", begin_time: 1622811877, end_time: 1622819877, user_id: 2},
    ]);
};
