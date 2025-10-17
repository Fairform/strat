'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { PRICING_TIERS } from '@/types'

const features = [
  'State-compliant minutes',
  'DOCX + PDF format',
  '10-minute delivery',
  'Email support',
  'Money-back guarantee'
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-md font-bold text-primary mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-body-lg text-secondary max-w-2xl mx-auto">
            Pay per meeting. No subscriptions, no hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier, index) => {
            const isMostPopular = tier.size === 'medium'
            const cardClassName = `bg-surface rounded-2xl p-8 border ${
              isMostPopular
                ? 'border-accent ring-2 ring-accent ring-opacity-50'
                : 'border-border'
            } relative`
            const buttonClassName = `block w-full py-3 text-center rounded-lg transition-all ${
              isMostPopular
                ? 'bg-accent text-white hover:bg-blue-600'
                : 'bg-surface-elevated text-primary border border-border hover:border-primary'
            }`

            return (
              <motion.div
                key={tier.size}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cardClassName}
              >
                {isMostPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent px-4 py-1 rounded-full">
                    <span className="text-label text-white uppercase">Most Popular</span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-heading-lg font-bold text-primary mb-2">
                    {tier.label}
                  </h3>
                  <p className="text-body-sm text-secondary">{tier.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-primary">${tier.price}</span>
                    <span className="text-body-sm text-secondary ml-2">/meeting</span>
                  </div>
                  <p className="text-body-sm text-secondary mt-1">{tier.units}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start text-body-sm text-secondary">
                      <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#upload"
                  className={buttonClassName}
                >
                  Get Started
                </Link>
              </motion.div>
            )
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-surface rounded-2xl p-8 border border-border"
          >
            <div className="mb-6">
              <h3 className="text-heading-lg font-bold text-primary mb-2">
                Enterprise
              </h3>
              <p className="text-body-sm text-secondary">For strata management firms</p>
            </div>

            <div className="mb-6">
              <div className="text-5xl font-bold text-primary mb-2">Custom</div>
              <p className="text-body-sm text-secondary">Contact us for pricing</p>
            </div>

            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start text-body-sm text-secondary">
                  <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
              <li className="flex items-start text-body-sm text-secondary">
                <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span>Bulk discounts</span>
              </li>
              <li className="flex items-start text-body-sm text-secondary">
                <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span>API access</span>
              </li>
              <li className="flex items-start text-body-sm text-secondary">
                <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span>Dedicated support</span>
              </li>
            </ul>

            <a
              href="mailto:enterprise@strata-ai.com"
              className="block w-full py-3 text-center rounded-lg bg-surface-elevated text-primary border border-border hover:border-primary transition-all"
            >
              Contact Sales
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
