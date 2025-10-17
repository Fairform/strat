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
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const meetingId = session.metadata?.meetingId

      if (!meetingId) {
        console.error('No meeting ID in session metadata')
        break
      }

      try {
        // Update meeting with payment info
        await prisma.meeting.update({
          where: { id: meetingId },
          data: {
            stripePaymentId: session.payment_intent as string,
            amountPaid: session.amount_total || 0,
            status: 'processing',
          },
        })

        // TODO: Trigger AI processing here
        // This is where you would queue the meeting for transcription and minutes generation
        console.log(`Payment successful for meeting ${meetingId}. Ready for processing.`)
      } catch (error) {
        console.error('Failed to update meeting:', error)
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
