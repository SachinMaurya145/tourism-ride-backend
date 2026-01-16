import jwt from 'jsonwebtoken';
import { env } from '../config/env';

const { jwtSecret, jwtRefreshSecret, jwtAccessExpiry, jwtRefreshExpiry } = env;

export const signAccessToken = (payload: object) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtAccessExpiry as any });
};

export const signRefreshToken = (payload: object) => {
  return jwt.sign(payload, jwtRefreshSecret, { expiresIn: jwtRefreshExpiry as any });
};

export const verifyToken = (token: string, isRefreshToken = false) => {
  const secret = isRefreshToken ? jwtRefreshSecret : jwtSecret;
  return jwt.verify(token, secret);
};
