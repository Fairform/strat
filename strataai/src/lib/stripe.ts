import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20',
      typescript: true,
    })
  : null

export function getPriceInCents(buildingSize: string): number {
  switch (buildingSize) {
    case 'small':
      return 19900 // $199.00
    case 'medium':
      return 34900 // $349.00
    case 'large':
      return 49900 // $499.00
    default:
      throw new Error(`Invalid building size: ${buildingSize}`)
  }
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`
}
