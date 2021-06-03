const jwt = require('jsonwebtoken');
import { SECRET } from '../config'

type UserType = {
  id: number,
  name: string,
  email: string,
  password: string,
  is_admin: boolean
};

export default async (user: UserType) => {
  const token = jwt.sign({id: user.id, is_admin: user.is_admin}, SECRET, {expiresIn: 60*60});
  return token;
}