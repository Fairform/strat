import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    )
  }

  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured' },
      { status: 500 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    // Subscription created (customer signs up)
    case 'customer.subscription.created': {
      const subscription = event.data.object as Stripe.Subscription
      const userId = subscription.metadata?.user_id

      if (!userId) {
        console.error('No user ID in subscription metadata')
        break
      }

      try {
        const plan = subscription.metadata?.plan || 'start'
        const planLimits = {
          start: 50,
          scale: 200,
          pro: 999999,
        }

        await prisma.user.update({
          where: { id: userId },
          data: {
            stripeCustomerId: subscription.customer as string,
            subscriptionId: subscription.id,
            subscriptionStatus: subscription.status,
            plan: plan,
            planUnitLimit: planLimits[plan as keyof typeof planLimits],
            trialEndsAt: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
            subscriptionEndsAt: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
          },
        })

        console.log(`Subscription created for user ${userId}`)
      } catch (error) {
        console.error('Failed to update user subscription:', error)
      }
      break
    }

    // Subscription updated (plan change, renewal, etc.)
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const userId = subscription.metadata?.user_id

      if (!userId) {
        console.error('No user ID in subscription metadata')
        break
      }

      try {
        await prisma.user.update({
          where: { id: userId },
          data: {
            subscriptionStatus: subscription.status,
            subscriptionEndsAt: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
          },
        })

        console.log(`Subscription updated for user ${userId}: ${subscription.status}`)
      } catch (error) {
        console.error('Failed to update user subscription:', error)
      }
      break
    }

    // Subscription deleted/canceled
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const userId = subscription.metadata?.user_id

      if (!userId) {
        console.error('No user ID in subscription metadata')
        break
      }

      try {
        await prisma.user.update({
          where: { id: userId },
          data: {
            subscriptionStatus: 'canceled',
            subscriptionEndsAt: new Date(),
          },
        })

        console.log(`Subscription canceled for user ${userId}`)
      } catch (error) {
        console.error('Failed to update user subscription:', error)
      }
      break
    }

    // Invoice payment succeeded
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice
      const subscriptionId = invoice.subscription as string

      if (subscriptionId) {
        try {
          const user = await prisma.user.findFirst({
            where: { subscriptionId },
          })

          if (user) {
            console.log(`Payment succeeded for user ${user.id}`)
            // TODO: Send payment receipt email
          }
        } catch (error) {
          console.error('Failed to process invoice payment:', error)
        }
      }
      break
    }

    // Invoice payment failed
    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      const subscriptionId = invoice.subscription as string

      if (subscriptionId) {
        try {
          const user = await prisma.user.findFirst({
            where: { subscriptionId },
          })

          if (user) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                subscriptionStatus: 'past_due',
              },
            })

            console.log(`Payment failed for user ${user.id}`)
            // TODO: Send payment failed email
          }
        } catch (error) {
          console.error('Failed to process invoice payment failure:', error)
        }
      }
      break
    }

    // Legacy: Meeting checkout sessions (keeping for backward compatibility)
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const meetingId = session.metadata?.meetingId

      if (meetingId) {
        try {
          await prisma.meeting.update({
            where: { id: meetingId },
            data: {
              stripePaymentId: session.payment_intent as string,
              amountPaid: session.amount_total || 0,
              status: 'processing',
            },
          })

          console.log(`Payment successful for meeting ${meetingId}`)
        } catch (error) {
          console.error('Failed to update meeting:', error)
        }
      }
      break
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session
      const meetingId = session.metadata?.meetingId

      if (meetingId) {
        await prisma.meeting.update({
          where: { id: meetingId },
          data: { status: 'failed' },
        })
      }
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
