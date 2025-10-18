# Atrio Setup Guide

Complete setup guide for the Atrio build-to-rent property management platform.

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Supabase account
- Stripe account
- Vercel Blob Storage account (optional)

## 1. Clone and Install

```bash
git clone <repository-url>
cd strataai
npm install
```

## 2. Database Setup

### PostgreSQL

Create a new PostgreSQL database:

```bash
createdb atrio
```

### Prisma Setup

1. Copy the environment file:
```bash
cp .env.example .env.local
```

2. Update `DATABASE_URL` in `.env.local`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/atrio?schema=public"
```

3. Run migrations:
```bash
npx prisma migrate dev
```

4. Generate Prisma client:
```bash
npx prisma generate
```

## 3. Supabase Setup

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be provisioned
3. Go to Project Settings > API
4. Copy the following values to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

### Configure Authentication

1. In Supabase Dashboard, go to Authentication > URL Configuration
2. Add your redirect URLs:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/verify`

3. Enable Email provider in Authentication > Providers

### Optional: Email Templates

Customize email templates in Authentication > Email Templates:
- Confirmation email
- Password reset
- Magic link

## 4. Stripe Setup

### Create Stripe Account

1. Sign up at [stripe.com](https://stripe.com)
2. Get your API keys from Developers > API keys
3. Add to `.env.local`:

```env
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### Create Products and Prices

1. Go to Products in Stripe Dashboard
2. Create three products with monthly subscriptions:

**Start Plan**
- Name: Atrio Start
- Price: $99/month
- Copy the Price ID to `STRIPE_PRICE_START`

**Scale Plan**
- Name: Atrio Scale
- Price: $299/month
- Copy the Price ID to `STRIPE_PRICE_SCALE`

**Pro Plan**
- Name: Atrio Pro
- Price: $499/month
- Copy the Price ID to `STRIPE_PRICE_PRO`

### Configure Webhooks

1. Go to Developers > Webhooks in Stripe Dashboard
2. Click "Add endpoint"
3. Endpoint URL: `https://your-domain.com/api/webhooks/stripe`
   - For local development, use Stripe CLI:
     ```bash
     stripe listen --forward-to localhost:3000/api/webhooks/stripe
     ```
4. Select events to send:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook signing secret to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```

## 5. Vercel Blob Storage (Optional)

If using file uploads:

1. Create a Vercel account and project
2. Install Vercel Blob:
   ```bash
   npm install @vercel/blob
   ```
3. Get token from Vercel Dashboard
4. Add to `.env.local`:
   ```env
   BLOB_READ_WRITE_TOKEN="vercel_blob_..."
   ```

## 6. Environment Variables

Complete `.env.local` file should look like:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/atrio?schema=public"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Stripe Price IDs
STRIPE_PRICE_START="price_..."
STRIPE_PRICE_SCALE="price_..."
STRIPE_PRICE_PRO="price_..."

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN="vercel_blob_..."

# App
NEXT_PUBLIC_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="Atrio <noreply@atrio.com>"
```

## 7. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 8. Testing Stripe Integration

### Test Mode

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

Use any future expiry date and any CVC.

### Webhook Testing

Use Stripe CLI for local webhook testing:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events
stripe trigger customer.subscription.created
stripe trigger invoice.payment_succeeded
```

## 9. Production Deployment

### Environment Variables

Set all environment variables in your hosting platform (Vercel, Railway, etc.)

### Database Migration

```bash
npx prisma migrate deploy
```

### Stripe

1. Switch to live mode in Stripe Dashboard
2. Create live products and prices
3. Update webhook endpoint URL to production domain
4. Update environment variables with live keys

### Supabase

1. Update Site URL and Redirect URLs to production domain
2. Configure custom SMTP (optional)

## Database Schema

The application includes the following models:

- **User** - User accounts with subscription info
- **Property** - Build-to-rent properties
- **Unit** - Individual units within properties
- **TenantCommunication** - Communication logs
- **Building** - Legacy strata buildings
- **Meeting** - Legacy meeting records
- **Document** - File storage metadata
- **Notification** - User notifications

## Features Implemented

- Authentication (Supabase)
- Subscription management (Stripe)
- User dashboard
- Settings page
- Webhook handling for subscription events
- Protected routes with middleware

## Next Steps

1. Implement property management UI
2. Add analytics dashboard
3. Build tenant communication features
4. Implement file upload for documents
5. Add email notifications
6. Create admin panel

## Troubleshooting

### Database Connection Error

- Verify PostgreSQL is running
- Check `DATABASE_URL` format
- Ensure database exists

### Supabase Auth Not Working

- Verify environment variables
- Check redirect URLs configuration
- Ensure email provider is enabled

### Stripe Webhooks Not Received

- Use Stripe CLI for local testing
- Verify webhook endpoint is accessible
- Check webhook signing secret matches

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma client
npx prisma generate
```

## Support

For issues and questions:
- Check existing GitHub issues
- Create a new issue with reproduction steps
- Include error logs and environment details
