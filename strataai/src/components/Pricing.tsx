'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'

const tiers = [
  {
    name: 'Start',
    price: '99',
    period: '/month',
    description: 'For up to 50 units',
    features: [
      'Single property dashboard',
      'Tenant portal',
      'Basic reporting',
      'Email support',
      'Mobile app access'
    ],
    cta: 'Start Free Trial',
    highlighted: false
  },
  {
    name: 'Scale',
    price: '299',
    period: '/month',
    description: 'Portfolio view, white-label portal',
    features: [
      'Up to 200 units',
      'Multi-property view',
      'Advanced analytics',
      'White-label portal',
      'Priority support',
      'Custom branding'
    ],
    cta: 'Start Free Trial',
    highlighted: true
  },
  {
    name: 'Pro',
    price: '499',
    period: '/month',
    description: 'Multi-property + analytics suite',
    features: [
      'Unlimited units',
      'Custom integrations',
      'API access',
      'Dedicated account manager',
      '24/7 support',
      'Custom workflows'
    ],
    cta: 'Contact Sales',
    highlighted: false
  }
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-surface">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-md font-bold text-text mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-body-lg text-text-muted max-w-2xl mx-auto">
            Choose the plan that fits your portfolio. Start with a 14-day free trial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`card relative ${
                tier.highlighted
                  ? 'ring-2 ring-accent shadow-lg'
                  : ''
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <h3 className="text-heading-lg text-text mb-2">{tier.name}</h3>
              <p className="text-small text-text-muted mb-6">{tier.description}</p>

              <div className="mb-6">
                <span className="text-display-md text-text">AU ${tier.price}</span>
                <span className="text-text-muted">{tier.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-small text-text">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={tier.highlighted ? 'btn-primary w-full text-center' : 'btn-secondary w-full text-center'}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
