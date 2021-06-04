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

module.exports.getByUser = async (user_id: number) => {
  const data = await knex
    .select()
    .from('events')
    .where({user_id});

  return data;
}

type PostType = {
  title: string,
  begin_time: number, 
  end_time: number,
  user_id: number
}

module.exports.post = async ({title, begin_time, end_time, user_id}: PostType) => {
  return await knex('events')
    .insert({
      title,
      begin_time,
      end_time,
      user_id
    })
}

type PutType = {
  id: number,
  title: string,
  begin_time: number, 
  end_time: number,
  user_id: number
}


module.exports.put = async ({id, title, begin_time, end_time, user_id}: PutType) => {
  return await knex('events')
    .where({id})
    .update({
      title,
      begin_time,
      end_time,
      user_id
    })
}

module.exports.del = async (id: number) => {
  return await knex('events')
    .where({id})
    .del()
}