import express from 'express';
import { SECRET } from '../config';
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');

type OptionsType = {
  requiresAdmin: boolean
}

module.exports = function ({requiresAdmin,}: OptionsType){
  return function (req: express.Request, res: express.Response, next: any) {
    try {
      const token = req.cookies.Authorization.split(' ')[1];
      const userId = req.cookies.UserId;
      const decoded = jwt.verify(token, SECRET);
      if (userId == decoded.id && !requiresAdmin||
          decoded.is_admin) {
            next();
          }
      else {
        res.status(401).end();
      }
    }
    catch (err) {
      res
        .status(401)
        .end()
    }
    
  }
}