# Deployment Guide - Strata AI

This guide covers deploying Strata AI to Vercel (recommended) and other platforms.

## Prerequisites

- GitHub, GitLab, or Bitbucket account
- Stripe account with API keys
- Domain name (optional, Vercel provides free subdomain)

## Deploying to Vercel (Recommended)

Vercel is the recommended deployment platform for Next.js applications.

### Step 1: Push to Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote repository
git remote add origin https://github.com/yourusername/strata-ai.git

# Push to GitHub
git push -u origin main
```

### Step 2: Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Vercel will automatically detect Next.js

### Step 3: Configure Environment Variables

In Vercel project settings, add the following environment variables:

**Required:**
```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

**Optional:**
```
NODE_ENV=production
```

### Step 4: Deploy

1. Click "Deploy"
2. Vercel will build and deploy your application
3. Your site will be live at `https://your-project.vercel.app`

### Step 5: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

## Deploying to Other Platforms

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next

# Environment variables
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### AWS Amplify

1. Connect your Git repository
2. Build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Add environment variables in app settings

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t strata-ai .
docker run -p 3000:3000 -e STRIPE_SECRET_KEY=sk_live_... strata-ai
```

## Environment Variables

### Production Environment Variables

```env
# Stripe (REQUIRED)
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxxxxx

# Optional
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://strata-ai.com
```

### Getting Stripe Keys

1. Go to [stripe.com](https://stripe.com) and login
2. Navigate to Developers → API keys
3. Copy your Live keys (starts with `sk_live_` and `pk_live_`)
4. **Never commit these keys to git!**

## Post-Deployment Checklist

### Security
- [ ] Environment variables are set correctly
- [ ] Stripe is in live mode (not test mode)
- [ ] API routes are protected
- [ ] CORS is configured properly
- [ ] Rate limiting is enabled (if applicable)

### Performance
- [ ] Run Lighthouse audit (target: 90+ scores)
- [ ] Test on slow 3G network
- [ ] Verify images are optimized
- [ ] Check bundle size

### SEO
- [ ] Verify meta tags
- [ ] Submit sitemap to Google Search Console
- [ ] Check OpenGraph images
- [ ] Verify robots.txt

### Testing
- [ ] Test payment flow end-to-end
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test accessibility with screen reader

### Monitoring
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Set up analytics (e.g., Google Analytics, Plausible)
- [ ] Monitor Stripe dashboard for payments
- [ ] Set up uptime monitoring

## Performance Optimization

### Image Optimization

Next.js automatically optimizes images. Ensure you're using the `next/image` component:

```tsx
import Image from 'next/image';

<Image
  src="/hero.png"
  alt="Hero"
  width={800}
  height={600}
  priority
/>
```

### Font Optimization

Fonts are optimized using `next/font`:

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
```

### Bundle Size Analysis

```bash
# Analyze bundle size
ANALYZE=true npm run build
```

## Monitoring and Analytics

### Vercel Analytics

Enable in Vercel dashboard:
1. Go to your project
2. Navigate to Analytics tab
3. Enable Web Analytics

### Google Analytics

Add to `src/app/layout.tsx`:

```tsx
import Script from 'next/script';

// Add in <head>
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

## Troubleshooting

### Build Fails

**Issue:** TypeScript errors during build

```bash
# Check for type errors locally
npm run type-check
```

**Issue:** Missing environment variables

- Verify all required env vars are set in Vercel dashboard
- Check variable names match exactly

### Runtime Errors

**Issue:** Stripe payments not working

- Verify you're using live keys (not test keys)
- Check Stripe dashboard for webhook errors
- Ensure HTTPS is enabled

**Issue:** Images not loading

- Check images exist in `public/` directory
- Verify Next.js Image optimization is working
- Check network tab for 404 errors

### Performance Issues

**Issue:** Slow page load

- Run Lighthouse audit
- Check bundle size
- Verify images are optimized
- Enable caching headers

## Rollback

If you need to rollback a deployment on Vercel:

1. Go to Deployments tab
2. Find the previous working deployment
3. Click the three dots (...)
4. Select "Promote to Production"

## Continuous Deployment

Vercel automatically deploys when you push to your main branch:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel will automatically deploy
```

### Preview Deployments

Every pull request gets a preview deployment:

1. Create a feature branch
2. Push changes
3. Open pull request
4. Vercel comments with preview URL

## Support

For deployment issues:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- Strata AI: support@strata-ai.com
