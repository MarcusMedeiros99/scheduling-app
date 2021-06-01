import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { name: "user", email: "user@test.com", password: "$2b$10$ycKVL5S.idJNhd7eTpQ.LuakjACyLUa//CtirRZpIn6Tt0Lp4vUAu", is_admin: false}, //password == 'user123456'
        { name: "admin", email: "admin@test.com", password: "$2b$10$8EtV7o1f2jb8dToWur0v0.km4U0kLnL0xhG1oyBdefgZ7/2vN2TRO", is_admin: true}, //password == 'admin123456'
    ]);
};
