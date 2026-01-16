import dotenv from 'dotenv';

dotenv.config();

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return value;
};

export const env = {
  port: Number(process.env.PORT ?? 3000),

  mongoUri: required('MONGO_URI'),

  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',

  jwtSecret: required('JWT_SECRET'),
  jwtRefreshSecret: required('JWT_REFRESH_SECRET'),
  jwtAccessExpiry: process.env.JWT_ACCESS_EXPIRY ?? '15m',
  jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRY ?? '7d',
};

export default env;
