# Atrio

Premium build-to-rent property management platform for boutique developers. Built with Next.js 15, TypeScript, Supabase, and Stripe.

## Overview

Atrio is a modern, full-featured SaaS platform designed specifically for build-to-rent property developers. It provides portfolio management, tenant communication, and advanced analytics in a premium, easy-to-use interface.

## Design Philosophy

Inspired by Chatbase.co and Apple.com aesthetics:
- **Premium feel**: Warm off-white background (#F6F5F2) with copper accents (#C4733A)
- **Minimal & architectural**: Clean layouts with ample whitespace
- **Smooth animations**: Framer Motion transitions throughout
- **Mobile-responsive**: Works beautifully on all devices

## Features

### Authentication & User Management
- Secure authentication via Supabase
- Email verification workflow
- Password reset functionality
- Protected routes with middleware

### Subscription Management
- Three pricing tiers (Start, Scale, Pro)
- 14-day free trial (no credit card required)
- Stripe-powered billing
- Customer portal for subscription management
- Webhook integration for real-time updates

### Dashboard
- Portfolio overview with key metrics
- Recent activity feed
- Quick actions for common tasks
- Getting started guide

### Property Management
- Multi-property support
- Unit tracking and occupancy monitoring
- Tenant information management
- Financial reporting

### Settings
- Profile management
- Subscription and billing
- Security settings
- Account deletion

## Tech Stack

### Frontend
- **Framework**: Next.js 15.5.5 with App Router
- **React**: 19.1.0
- **TypeScript**: 5.x with strict mode
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12
- **Icons**: Lucide React

### Backend
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth
- **Payments**: Stripe Subscriptions
- **Storage**: Vercel Blob (optional)
- **API**: Next.js API Routes

### Infrastructure
- **Deployment**: Vercel (recommended)
- **Database Hosting**: Supabase/Railway/Neon
- **Email**: SMTP (Gmail/SendGrid/Postmark)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

See [SETUP.md](./SETUP.md) for detailed configuration instructions.

### 3. Set Up Database

```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
strataai/
├── src/
│   ├── app/
│   │   ├── (auth)/           # Authentication pages
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── verify/
│   │   ├── dashboard/        # Dashboard pages
│   │   │   ├── properties/
│   │   │   ├── analytics/
│   │   │   └── settings/
│   │   ├── api/              # API routes
│   │   │   ├── stripe/
│   │   │   └── webhooks/
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Landing page
│   │   └── globals.css
│   ├── components/
│   │   ├── dashboard/        # Dashboard components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   └── CTA.tsx
│   └── lib/
│       ├── supabase/         # Supabase clients
│       ├── stripe-server.ts  # Stripe server functions
│       ├── stripe.ts         # Stripe client
│       ├── db.ts             # Prisma client
│       └── auth.ts           # Auth helpers
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
├── SETUP.md                  # Detailed setup guide
├── DEPLOYMENT.md             # Deployment instructions
└── package.json
```

## Database Schema

### Core Models

- **User** - User accounts with subscription information
- **Property** - Build-to-rent properties
- **Unit** - Individual rental units
- **TenantCommunication** - Communication logs
- **Notification** - User notifications

### Legacy Models (from Strata AI)

- **Building** - Strata buildings
- **Meeting** - Meeting records
- **Document** - Document metadata

## API Routes

### Public
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Authenticated
- `POST /api/stripe/create-checkout-session` - Start subscription
- `POST /api/stripe/create-portal-session` - Manage subscription

### Webhooks
- `POST /api/webhooks/stripe` - Stripe webhook handler

## Pricing Plans

### Start - $99/month
- Up to 50 units
- Basic reporting
- Email support
- Mobile app access

### Scale - $299/month
- Up to 200 units
- Advanced analytics
- Priority support
- White-label portal
- Custom branding

### Pro - $499/month
- Unlimited units
- Custom integrations
- API access
- Dedicated manager
- 24/7 support
- Custom workflows

## Development

### Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Database
npx prisma migrate dev  # Create migration
npx prisma migrate deploy # Run migrations (production)
npx prisma generate     # Generate Prisma client
npx prisma studio       # Open Prisma Studio

# Stripe
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Testing Stripe

Use test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

## Deployment

See [SETUP.md](./SETUP.md) for complete deployment instructions.

### Quick Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## Contributing

This is a private project. For issues or feature requests, please contact the development team.

## License

Proprietary - All rights reserved

## Support

For setup help, see [SETUP.md](./SETUP.md)

For deployment help, see [DEPLOYMENT.md](./DEPLOYMENT.md)
