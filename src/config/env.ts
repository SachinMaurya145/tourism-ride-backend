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
};

export default env;
