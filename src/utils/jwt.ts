import jwt from 'jsonwebtoken';
import { env } from '../config/env';

const JWT_SECRET = env.jwtSecret;

export const signToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
