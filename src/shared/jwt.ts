import jwt from 'jsonwebtoken';
import config from '../config';

export function generateAccessToken(id: string, email: string) {
  const { secretKey } = config.user;

  const payload = {
    id,
    email
  };

  return jwt.sign(payload, secretKey, { expiresIn: '1000h' });
}

export function getUser(token: string) {
  const decodetData = jwt.verify(token, config.user.secretKey);

  return decodetData;
}
