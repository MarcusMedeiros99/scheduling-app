import knexConfig from '../knexfile';
const knex = require('knex')(knexConfig['development']);
const bcrypt = require('bcrypt');
const {SALT_ROUNDS} = require('../config')['SALT_ROUNDS'];

module.exports.get = async () => {
  const data = await knex
    .select()
    .from('users');

  return data;
}

module.exports.getById = async (id: number) => {
  const data = await knex
    .select()
    .from('users')
    .where({id});

  return data;
}

type PostParamsType = {
  name: string,
  email: string, 
  password: string, 
  is_admin: boolean
}

module.exports.post = async ({name, email, password, is_admin}: PostParamsType) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);
  
  return knex('users')
    .insert({
      name,
      email, 
      password: hash,
      is_admin
    });
}

type PutParamsType = {
  id: number,
  name: string,
  email: string, 
  password: string, 
  is_admin: boolean
}

module.exports.put = async ({id, name, email, password, is_admin}: PutParamsType) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);
  
  return knex('users')
    .where({id})
    .update({
      name,
      email,
      password: hash,
      is_admin
    })
}

module.exports.del = async (id: number) => {
  return await knex('users')
    .where({id})
    .del();
}