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
    .send({
      userId: req.body._userId
    });
}

module.exports.post = async (req: express.Request, res: express.Response) => {
  const email = req.body.email;
  await knex('users')
    .select()
    .where({
      email
    })
    .then((rows: any) => {
      return rows[0];
    }).then(async (user: UserType) => {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const token = await generateToken(user);
        res
          .status(200)
          .cookie('Authorization', 'Bearer '+token, {
            httpOnly: true,
            sameSite: 'lax'
          })
          .cookie('UserId', user.id, {
            httpOnly: true,
            sameSite: 'lax'
          })
          .end();
      }
      else {
        res.status(401).end();
      }
    })
  
  
  
}