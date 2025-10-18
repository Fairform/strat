import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})

export const PLANS = {
  start: {
    name: 'Start',
    price: 9900, // $99 in cents
    interval: 'month' as const,
    features: ['Up to 50 units', 'Basic reporting', 'Email support', 'Mobile app access'],
    priceId: process.env.STRIPE_PRICE_START,
  },
  scale: {
    name: 'Scale',
    price: 29900, // $299
    interval: 'month' as const,
    features: [
      'Up to 200 units',
      'Advanced analytics',
      'Priority support',
      'White-label portal',
      'Custom branding',
    ],
    priceId: process.env.STRIPE_PRICE_SCALE,
  },
  pro: {
    name: 'Pro',
    price: 49900, // $499
    interval: 'month' as const,
    features: [
      'Unlimited units',
      'Custom integrations',
      'API access',
      'Dedicated manager',
      '24/7 support',
      'Custom workflows',
    ],
    priceId: process.env.STRIPE_PRICE_PRO,
  },
}

export async function createCheckoutSession(
  userId: string,
  email: string,
  plan: 'start' | 'scale' | 'pro'
) {
  const priceId = PLANS[plan].priceId

  if (!priceId) {
    throw new Error(`Price ID not configured for plan: ${plan}`)
  }

  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    metadata: {
      user_id: userId,
      plan: plan,
    },
    subscription_data: {
      trial_period_days: 14, // 14-day free trial
      metadata: {
        user_id: userId,
        plan: plan,
      },
    },
  })

  return session
}

export async function createCustomerPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
  })

  return session
}

export async function getSubscription(subscriptionId: string) {
  return await stripe.subscriptions.retrieve(subscriptionId)
}

export async function cancelSubscription(subscriptionId: string) {
  return await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  })
}
