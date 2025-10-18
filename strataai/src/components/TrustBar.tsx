'use client'

import { motion } from 'framer-motion'

export default function TrustBar() {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-text-muted text-sm mb-12"
        >
          Trusted by boutique developers and property innovators
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale">
          {/* Placeholder for client logos */}
          <div className="w-32 h-12 bg-text/10 rounded" />
          <div className="w-32 h-12 bg-text/10 rounded" />
          <div className="w-32 h-12 bg-text/10 rounded" />
          <div className="w-32 h-12 bg-text/10 rounded" />
        </div>
      </div>
    </section>
  )
}
