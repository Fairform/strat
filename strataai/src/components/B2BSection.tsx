'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Users, Zap, Shield, Headphones } from 'lucide-react'
import { formatCurrency } from '@/lib/validation'

const b2bTiers = [
  {
    id: 'starter',
    name: 'Starter',
    range: '1-20 meetings/month',
    price: 299,
    savings: 'Save up to $200/month',
  },
  {
    id: 'growth',
    name: 'Growth',
    range: '21-50 meetings/month',
    price: 249,
    savings: 'Save up to $7,500/month',
    highlighted: true,
  },
  {
    id: 'professional',
    name: 'Professional',
    range: '51-100 meetings/month',
    price: 199,
    savings: 'Save up to $30,000/month',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    range: '100+ meetings/month',
    price: 149,
    savings: 'Custom pricing available',
  },
]

const features = [
  { icon: Users, text: 'Dedicated account manager' },
  { icon: Zap, text: 'Priority processing' },
  { icon: Shield, text: 'White-label options' },
  { icon: Headphones, text: '24/7 support' },
]

export default function B2BSection() {
  return (
    <section id="for-businesses" className="py-16 md:py-24 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Users className="w-4 h-4" />
            For Strata Management Companies
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
            Enterprise Solutions
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Volume pricing for strata management companies processing multiple meetings
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {b2bTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`card ${
                tier.highlighted ? 'border-2 border-primary-600 bg-primary-50' : 'card-hover'
              }`}
            >
              <div className="text-center">
                <h3 className="text-xl font-display font-bold text-neutral-900 mb-2">
                  {tier.name}
                </h3>
                <div className="text-sm text-neutral-600 mb-4">{tier.range}</div>
                <div className="mb-4">
                  <span className="text-3xl font-display font-bold text-primary-600">
                    {formatCurrency(tier.price)}
                  </span>
                  <span className="text-neutral-600 text-sm">/meeting</span>
                </div>
                <div className="text-sm font-medium text-success-600">
                  {tier.savings}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Features */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card bg-gradient-primary text-white"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display font-bold mb-2">
                Enterprise Features
              </h3>
              <p className="text-white/90">
                Everything you need to scale your strata management business
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{feature.text}</span>
                  </motion.div>
                )
              })}
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>API integration for your existing systems</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Bulk upload dashboard for multiple meetings</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Custom templates and branding options</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Training and onboarding for your team</span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a
                href="mailto:enterprise@strata-ai.com"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-neutral-100 transition-colors"
              >
                Book Enterprise Demo
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
