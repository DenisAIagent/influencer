import { createClient } from 'redis';
import logger from './logger';

const redisUrl = process.env.REDIS_URL as string;

export const redisClient = createClient({ url: redisUrl });

redisClient.on('error', (err) => {
  logger.error('Redis Client Error', err);
});

export const connectRedis = async () => {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    logger.info('Simulating Redis connection in development/test environment.');
    return;
  }

  if (!redisUrl) {
    throw new Error('REDIS_URL is not defined');
  }
  await redisClient.connect();
  logger.info('Redis connected');
};
