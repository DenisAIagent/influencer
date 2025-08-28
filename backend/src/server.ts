import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDatabase } from './utils/database';
import { connectRedis } from './utils/redis';
import logger from './utils/logger';
import { apiRateLimiter } from './middleware/rateLimit';

// Load environment variables
dotenv.config();

// Routes
import authRoutes from './routes/auth';
import auditRoutes from './routes/audits';

async function bootstrap() {
  await connectDatabase();
  await connectRedis();
  const app = express();
  app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: '10mb' }));
  app.use(morgan('dev'));
  app.use(apiRateLimiter);
  // Base route to check API status
  app.get('/', (_req, res) => res.send({ status: 'ok' }));
  app.use('/api/auth', authRoutes);
  app.use('/api/audits', auditRoutes);
  const paymentsRouter = await import('./routes/payments');
  app.use('/api/payments', paymentsRouter.default);
  // 404 handler
  app.use('*', (_req, res) => res.status(404).json({ error: 'Not Found' }));
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
}

bootstrap().catch((err) => {
  logger.error('Error starting server', err);
});
