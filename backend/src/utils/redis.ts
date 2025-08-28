import { createClient } from 'redis';
import logger from './logger';

const redisUrl = process.env.REDIS_URL as string;

export const redisClient = createClient({ url: redisUrl });

redisClient.on('error', (err) => {
  logger.error('Redis Client Error', err);
});

export const connectRedis = async () => {
  if (!redisUrl) {
    throw new Error('REDIS_URL is not defined');
  }
  await redisClient.connect();
  logger.info('Redis connected');
};
