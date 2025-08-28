import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import User from '../models/User';
import { createCheckoutSession, verifyWebhook } from '../services/stripeService';
import logger from '../utils/logger';

const router = express.Router();

// POST /payments/checkout-session - create a subscription checkout session
router.post('/checkout-session', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { priceId } = req.body;
    if (!priceId) return res.status(400).json({ error: 'priceId requis' });
    const url = await createCheckoutSession(userId, priceId);
    return res.json({ url });
  } catch (err) {
    logger.error('Checkout session error', err);
    return res.status(500).json({ error: 'Erreur lors de la création de la session de paiement' });
  }
});

// POST /payments/webhook - Stripe webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'] as string | undefined;
  let event;
  try {
    event = verifyWebhook(req.body as any, signature);
  } catch (err) {
    logger.error('Webhook signature verification failed', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as any;
      const userId = session.metadata?.userId;
      // TODO: update user subscription status
      logger.info('Checkout session completed for user %s', userId);
      break;
    }
    default:
      logger.info(`Unhandled event type ${event.type}`);
  }
  res.json({ received: true });
});

export default router;
