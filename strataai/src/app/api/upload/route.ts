import { NextRequest, NextResponse } from 'next/server';
import { validateUploadRequest } from '@/lib/validation';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

// Maximum file size: 500MB
const MAX_FILE_SIZE = 500 * 1024 * 1024;

// Allowed file types
const ALLOWED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/aac', 'audio/x-m4a'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
const ALLOWED_FILE_TYPES = [...ALLOWED_AUDIO_TYPES, ...ALLOWED_VIDEO_TYPES];

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();

    // Extract fields
    const file = formData.get('file') as File | null;
    const buildingSize = formData.get('buildingSize') as string;
    const state = formData.get('state') as string;
    const meetingType = formData.get('meetingType') as string;
    const buildingName = formData.get('buildingName') as string;
    const meetingDate = formData.get('meetingDate') as string;
    const email = formData.get('email') as string;

    // Validate required fields
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: 'Invalid file type. Please upload an audio or video file.',
          allowedTypes: ALLOWED_FILE_TYPES
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
          maxSize: MAX_FILE_SIZE
        },
        { status: 400 }
      );
    }

    // Validate other required fields
    const validationResult = validateUploadRequest({
      buildingSize,
      state,
      meetingType,
      buildingName,
      meetingDate,
      email,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error },
        { status: 400 }
      );
    }

    // Determine pricing based on building size
    const pricing = {
      small: 19900, // $199.00 in cents
      medium: 34900, // $349.00 in cents
      large: 49900, // $499.00 in cents
    };

    const amount = pricing[buildingSize as keyof typeof pricing];

    if (!amount) {
      return NextResponse.json(
        { error: 'Invalid building size' },
        { status: 400 }
      );
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'aud',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        buildingSize,
        state,
        meetingType,
        buildingName,
        meetingDate,
        email,
        fileName: file.name,
        fileSize: file.size.toString(),
        fileType: file.type,
      },
      description: `Strata AI Minutes - ${buildingName} - ${meetingType}`,
      receipt_email: email,
    });

    // In production, you would:
    // 1. Upload file to cloud storage (S3, Azure Blob, etc.)
    // 2. Queue the file for AI processing
    // 3. Store metadata in database
    // 4. Set up webhook for payment confirmation

    // For now, we'll return the payment intent client secret
    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount,
      message: 'File uploaded successfully. Complete payment to start processing.',
    });

  } catch (error) {
    console.error('Upload error:', error);

    // Handle Stripe errors
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Payment error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred while processing your upload' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Upload API is running',
    maxFileSize: MAX_FILE_SIZE,
    allowedFileTypes: ALLOWED_FILE_TYPES,
  });
}
