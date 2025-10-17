'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, FileCheck } from 'lucide-react'

const states = [
  {
    state: 'NSW',
    name: 'New South Wales',
    legislation: 'Strata Schemes Management Act 2015',
    description: 'Full compliance with NSW strata legislation and regulations',
  },
  {
    state: 'VIC',
    name: 'Victoria',
    legislation: 'Owners Corporations Act 2006',
    description: 'Compliant with Victorian body corporate requirements',
  },
  {
    state: 'QLD',
    name: 'Queensland',
    legislation: 'Body Corporate and Community Management Act 1997',
    description: 'Meets all QLD body corporate legislative requirements',
  },
  {
    state: 'SA',
    name: 'South Australia',
    legislation: 'Strata Titles Act 1988',
    description: 'Fully compliant with SA strata titles legislation',
  },
  {
    state: 'WA',
    name: 'Western Australia',
    legislation: 'Strata Titles Act 1985',
    description: 'Adheres to WA strata titles act requirements',
  },
  {
    state: 'TAS',
    name: 'Tasmania',
    legislation: 'Strata Titles Act 1998',
    description: 'Complies with Tasmanian strata legislation',
  },
  {
    state: 'ACT',
    name: 'Australian Capital Territory',
    legislation: 'Unit Titles Act 2001',
    description: 'Meets ACT unit titles legislative standards',
  },
  {
    state: 'NT',
    name: 'Northern Territory',
    legislation: 'Unit Titles Act',
    description: 'Compliant with NT unit titles requirements',
  },
]

export default function StateCompliance() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-success-50 text-success-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <FileCheck className="w-4 h-4" />
            Legally Compliant Across Australia
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
            State-Specific Compliance
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Our AI understands the unique legislative requirements for every Australian state and territory
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {states.map((item, index) => (
            <motion.div
              key={item.state}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="card card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="text-2xl font-display font-bold text-primary-600 mb-1">
                    {item.state}
                  </div>
                  <div className="text-sm font-medium text-neutral-700">
                    {item.name}
                  </div>
                </div>
                <CheckCircle2 className="w-6 h-6 text-success-600 flex-shrink-0" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-semibold text-neutral-900">
                  {item.legislation}
                </div>
                <div className="text-sm text-neutral-600">
                  {item.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm text-neutral-600">
            <CheckCircle2 className="w-5 h-5 text-success-600" />
            <span>Updated regularly to reflect legislative changes</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
