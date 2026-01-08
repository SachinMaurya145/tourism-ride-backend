import mongoose from 'mongoose';
import { env } from './env';

let isConnected = false;

export async function connectDB(): Promise<boolean> {
  const uri = env.mongoUri;
  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log('MongoDB connected');
    return true;
  } catch (err) {
    isConnected = false;
    console.error('MongoDB connection error:', err);
    console.warn('Continuing without DB connection (development mode).');
    return false;
  }
}

export async function disconnectDB(): Promise<void> {
  if (!isConnected) return;
  await mongoose.disconnect();
  console.log('MongoDB disconnected');
}
