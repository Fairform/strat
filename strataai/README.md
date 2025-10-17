# Strata AI - AI-Powered Meeting Minutes Generator

> Generate legally compliant strata meeting minutes in 10 minutes, not 4-6 hours.

Strata AI is a production-ready Next.js application that helps Australian strata schemes and body corporate managers automatically generate state-compliant meeting minutes from audio/video recordings.

## Features

- AI-Powered Transcription: Upload meeting recordings and get accurate transcriptions
- State-Specific Compliance: Compliant with legislation for all 8 Australian states/territories
- Automatic Processing: 10-minute average turnaround time
- Professional Output: DOCX + PDF formats
- Stripe Integration: Secure payment processing
- Responsive Design: Mobile-first, accessible (WCAG 2.1 AA)

## Tech Stack

- Framework: Next.js 15.5.5 (App Router)
- React: 19.1.0
- TypeScript: 5.6.3
- Styling: Tailwind CSS 4.0
- Animations: Framer Motion
- Forms: React Hook Form + Zod
- Payments: Stripe
- Testing: Jest + React Testing Library

## Quick Start

```bash
# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local

# Run development server
pnpm dev

# Open http://localhost:3000
```

## Environment Variables

Create a `.env.local` file:

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Available Scripts

- `pnpm dev` - Run development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests
- `pnpm test:coverage` - Run tests with coverage
- `pnpm type-check` - Run TypeScript type checking

## Project Structure

```
strataai/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/              # Utilities and helpers
│   └── types/            # TypeScript types
├── public/               # Static assets
└── ...config files
```

## Pricing Tiers

### B2C (Individual Buildings)
- Small (<20 units): $199/meeting
- Medium (20-100 units): $349/meeting
- Large (100+ units): $499/meeting

### B2B (Management Companies)
- Starter: $299/meeting (1-20/month)
- Growth: $249/meeting (21-50/month)
- Professional: $199/meeting (51-100/month)
- Enterprise: Custom pricing (100+/month)

## State Compliance

Compliant with legislation for NSW, VIC, QLD, SA, WA, TAS, ACT, NT.

## Support

Email: support@strata-ai.com
Phone: 1300 STRATA AI (1300 787 282)

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.
