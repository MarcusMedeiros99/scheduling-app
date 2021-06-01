import knexConfig from '../knexfile';
const knex = require('knex')(knexConfig['development']);

module.exports.get = async () => {
  const data = await knex
    .select()
    .from('events');

  return data;
}

module.exports.getById = async (id: number) => {
  const data = await knex
    .select()
    .from('events')
    .where({id});

  return data;
}

module.exports.post = async (begin_time: number, end_time: number, user_id: number) => {
  await knex('events')
    .insert({
      begin_time,
      end_time,
      user_id
    })
}

module.exports.put = async (id: number, begin_time: number, end_time: number, user_id: number) => {
  await knex('events')
    .where({id})
    .update({
      begin_time,
      end_time,
      user_id
    })
}