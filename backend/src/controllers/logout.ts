import express from 'express';
import knexConfig from '../knexfile';
import generateToken from '../utils/generateToken';
const knex = require('knex')(knexConfig['development']);
const bcrypt = require('bcrypt');

type UserType = {
  id: number,
  name: string,
  email: string,
  password: string,
  is_admin: boolean
}

module.exports.get = async (req: express.Request, res: express.Response) => {
  res
    .status(200)
    .cookie('Authorization', 'none', {
      httpOnly: true,
      expires: new Date(Date.now() + 100),
    })
    .cookie('UserId', 'none', {
      httpOnly: true,
      expires: new Date(Date.now() + 100),
    })
    .end();
}