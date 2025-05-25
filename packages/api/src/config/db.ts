import mongoose from 'mongoose';
import { env } from './index';
import { Logger } from '../utils/logger';

export async function connectDB() {
  const uri = env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set');

  await mongoose.connect(uri);
  Logger.info('MongoDB connected');
}
