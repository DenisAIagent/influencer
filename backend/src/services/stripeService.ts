import Stripe from 'stripe';
import logger from '../utils/logger';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
export const stripe = new Stripe(stripeSecret || '', { apiVersion: '2022-11-15' });

/**
 * Create a Stripe checkout session for subscription purchase.
 * @param userId The user ID making the purchase
 * @param priceId The Stripe price ID for the desired plan
 * @returns The session URL
 */
export async function createCheckoutSession(userId: string, priceId: string) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.FRONTEND_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing?canceled=true`,
      metadata: { userId }
    });
    return session.url;
  } catch (err) {
    logger.error('Stripe checkout session creation error', err);
    throw err;
  }
}

/**
 * Verify Stripe webhook signature and return the event.
 */
export function verifyWebhook(rawBody: Buffer, signature: string | undefined): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET not defined');
  if (!signature) throw new Error('Missing Stripe signature header');
  return stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
}
