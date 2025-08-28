import rateLimit from 'express-rate-limit';

// Create a rate limiter based on environment variables
const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000');
const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100');

export const apiRateLimiter = rateLimit({
  windowMs,
  max: maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Trop de requêtes, veuillez réessayer plus tard.'
});
