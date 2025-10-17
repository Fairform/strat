'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { formatCurrency } from '@/lib/validation'

const tiers = [
  {
    id: 'small',
    name: 'Small Building',
    price: 199,
    units: 'Under 20 units',
    features: [
      'State-compliant minutes',
      'DOCX + PDF format',
      '10-minute delivery',
      'Email support',
      'Unlimited revisions (24hrs)',
    ],
  },
  {
    id: 'medium',
    name: 'Medium Building',
    price: 349,
    units: '20-100 units',
    features: [
      'State-compliant minutes',
      'DOCX + PDF format',
      '10-minute delivery',
      'Priority email support',
      'Unlimited revisions (24hrs)',
      'Custom templates',
    ],
    highlighted: true,
  },
  {
    id: 'large',
    name: 'Large Building',
    price: 499,
    units: '100+ units',
    features: [
      'State-compliant minutes',
      'DOCX + PDF format',
      '5-minute delivery',
      'Priority support',
      'Unlimited revisions (48hrs)',
      'Custom templates',
      'Dedicated account manager',
    ],
  },
]

export default function Pricing() {
  const handleScrollToUpload = () => {
    document.querySelector('#upload')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToB2B = () => {
    document.querySelector('#for-businesses')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Pay per meeting. No subscriptions. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`card relative ${
                tier.highlighted
                  ? 'border-2 border-primary-600 shadow-xl'
                  : 'card-hover'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="badge bg-primary-600 text-white px-4 py-1">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-display font-bold text-neutral-900 mb-2">
                  {tier.name}
                </h3>
                <div className="text-sm text-neutral-600 mb-4">{tier.units}</div>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-display font-bold text-neutral-900">
                    {formatCurrency(tier.price)}
                  </span>
                  <span className="text-neutral-600">/meeting</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleScrollToUpload}
                className={`w-full ${
                  tier.highlighted ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-neutral-600 mb-4">
            Managing multiple properties?
          </p>
          <button
            onClick={handleScrollToB2B}
            className="link text-lg font-semibold"
          >
            View Business Plans <ArrowRight className="inline w-5 h-5 ml-1" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
