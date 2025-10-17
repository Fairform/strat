'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { AUSTRALIAN_STATES } from '@/types'

export default function StateCompliance() {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-md font-bold text-primary mb-4">
            Compliant Across All Australian States
          </h2>
          <p className="text-body-lg text-secondary max-w-2xl mx-auto">
            Minutes generated following state-specific legislation requirements
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {AUSTRALIAN_STATES.map((state, index) => (
            <motion.div
              key={state.code}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-surface rounded-xl p-6 border border-border text-center"
            >
              <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-3" />
              <div className="text-heading-md font-bold text-primary mb-2">
                {state.code}
              </div>
              <div className="text-body-sm text-secondary">
                {state.name}
              </div>
              <div className="text-label text-secondary mt-2">
                {state.legislation}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
