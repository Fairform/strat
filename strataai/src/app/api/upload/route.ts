import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { stripe, getPriceInCents } from '@/lib/stripe'
import { uploadToStorage } from '@/lib/storage'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const file = formData.get('file') as File
    const buildingSize = formData.get('buildingSize') as string
    const state = formData.get('state') as string
    const meetingType = formData.get('meetingType') as string
    const buildingName = formData.get('buildingName') as string
    const meetingDate = formData.get('meetingDate') as string
    const email = formData.get('email') as string

    // Validate required fields
    if (!file || !buildingSize || !state || !meetingType || !buildingName || !meetingDate || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Upload file to storage
    let uploadUrl: string
    try {
      uploadUrl = await uploadToStorage(file)
    } catch (error) {
      console.error('File upload error:', error)
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      )
    }

    // Create meeting record in database
    const meeting = await prisma.meeting.create({
      data: {
        buildingSize,
        state,
        meetingType,
        buildingName,
        meetingDate: new Date(meetingDate),
        email,
        uploadUrl,
        fileName: file.name,
        fileSize: BigInt(file.size),
        status: 'pending',
      },
    })

    // Calculate price
    const amountInCents = getPriceInCents(buildingSize)

    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment processing is not configured' },
        { status: 500 }
      )
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: 'Strata Meeting Minutes',
              description: `${buildingSize.charAt(0).toUpperCase() + buildingSize.slice(1)} building - ${buildingName}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/#upload`,
      client_reference_id: meeting.id,
      customer_email: email,
      metadata: {
        meetingId: meeting.id,
      },
    })

    // Update meeting with stripe session ID
    await prisma.meeting.update({
      where: { id: meeting.id },
      data: { stripeSessionId: session.id },
    })

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    })
  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
