// Update with your config settings.
export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: __dirname + '/schedulingwebapp.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  }
};
