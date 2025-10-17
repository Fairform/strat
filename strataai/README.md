# Strata AI - MVP Phase 1

AI-powered meeting minutes generation for Australian strata schemes. Built with Next.js 15, TypeScript, Prisma, and Stripe.

## Design

This project replicates the **exact endex.ai aesthetic**:
- Dark mode only (#0A0A0A background)
- Minimal, professional design
- Blue accent color (#2563EB)
- Inter font family
- Subtle animations and glassmorphism effects

## Features

- **File Upload**: Drag & drop or browse for meeting recordings (MP3, WAV, MP4, MOV up to 500MB)
- **State Compliance**: Support for all 8 Australian states (NSW, VIC, QLD, SA, WA, TAS, ACT, NT)
- **Stripe Payments**: Secure payment processing with three pricing tiers ($199, $349, $499)
- **Responsive Design**: Mobile-first, works on all devices
- **Type-Safe**: Full TypeScript with strict mode enabled

## Tech Stack

- **Framework**: Next.js 15.5.5 with App Router
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe
- **Storage**: Vercel Blob
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Forms**: React Hook Form

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account
- Vercel account (for Blob storage)

### Installation

1. **Clone the repository**
```bash
cd strataai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
- `DATABASE_URL`: PostgreSQL connection string
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob token
- `NEXT_PUBLIC_URL`: Your app URL

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
strataai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── upload/route.ts          # File upload endpoint
│   │   │   └── webhooks/stripe/route.ts # Stripe webhook handler
│   │   ├── success/page.tsx             # Payment success page
│   │   ├── layout.tsx                   # Root layout
│   │   ├── page.tsx                     # Landing page
│   │   └── globals.css                  # Global styles
│   ├── components/
│   │   ├── Header.tsx                   # Navigation header
│   │   ├── Hero.tsx                     # Hero section with stats
│   │   ├── HowItWorks.tsx               # 3-step process
│   │   ├── StateCompliance.tsx          # State badges
│   │   ├── UploadPortal.tsx             # File upload form
│   │   ├── Pricing.tsx                  # Pricing tiers
│   │   ├── FAQ.tsx                      # Accordion FAQ
│   │   └── Footer.tsx                   # Footer with links
│   ├── lib/
│   │   ├── db.ts                        # Prisma client
│   │   ├── stripe.ts                    # Stripe utilities
│   │   └── storage.ts                   # File upload utilities
│   └── types/
│       └── index.ts                     # TypeScript types & constants
├── prisma/
│   └── schema.prisma                    # Database schema
└── package.json
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | `whsec_...` |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token | `vercel_blob_...` |
| `NEXT_PUBLIC_URL` | Public app URL | `http://localhost:3000` |

## Stripe Setup

1. **Create Stripe account** at https://stripe.com
2. **Get API keys** from Dashboard → Developers → API keys
3. **Set up webhook**:
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `checkout.session.expired`
4. **Get webhook secret** and add to `.env`

## Vercel Blob Setup

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Link project**: `vercel link`
3. **Create Blob store**: In Vercel dashboard → Storage → Create Database → Blob
4. **Get token** from Storage settings and add to `.env`

## Database Schema

The app uses a single `Meeting` model:

```prisma
model Meeting {
  id              String    @id @default(uuid())
  createdAt       DateTime  @default(now())
  buildingSize    String
  state           String
  meetingType     String
  buildingName    String
  meetingDate     DateTime
  email           String
  uploadUrl       String?
  fileName        String?
  fileSize        BigInt?
  status          String    @default("pending")
  processedAt     DateTime?
  stripeSessionId String?   @unique
  stripePaymentId String?
  amountPaid      Int?
  minutesDocxUrl  String?
  minutesPdfUrl   String?
}
```

## Deployment

### Deploy to Vercel

```bash
vercel --prod
```

### Environment Variables

Add all environment variables in Vercel dashboard:
- Settings → Environment Variables

### Database

Use Vercel Postgres or any PostgreSQL provider:
- Neon: https://neon.tech
- Supabase: https://supabase.com
- Railway: https://railway.app

## Development

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

### Build
```bash
npm run build
```

## API Endpoints

### POST /api/upload
Handles file upload and creates Stripe checkout session.

**Request**: multipart/form-data
- `file`: File (audio/video)
- `buildingSize`: string (small|medium|large)
- `state`: string (NSW|VIC|QLD|SA|WA|TAS|ACT|NT)
- `meetingType`: string
- `buildingName`: string
- `meetingDate`: string (ISO date)
- `email`: string

**Response**:
```json
{
  "success": true,
  "checkoutUrl": "https://checkout.stripe.com/...",
  "sessionId": "cs_..."
}
```

### POST /api/webhooks/stripe
Handles Stripe webhook events.

**Events**:
- `checkout.session.completed`: Payment successful, update meeting status
- `checkout.session.expired`: Payment failed/expired

## Phase 2 (Not Implemented)

The following features are planned for Phase 2:
- AI transcription integration (OpenAI Whisper or AssemblyAI)
- Minutes generation with state-specific templates
- DOCX and PDF generation
- Email delivery
- User dashboard
- Admin panel

## Contributing

This is a private MVP project. Contact the team for contribution guidelines.

## License

Proprietary - All rights reserved

## Support

For support, email support@strata-ai.com or call 1300 STRATA AI.
