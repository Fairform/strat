'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTA() {
  return (
    <section
      className="py-20"
      style={{ background: 'linear-gradient(90deg, #C4733A 0%, #DDA56C 100%)' }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-display-md text-white mb-6">
            Ready to modernise your property operations?
          </h2>

          <p className="text-body-lg text-white/90 mb-8">
            Join leading developers who trust Atrio to manage their build-to-rent portfolios.
          </p>

          <Link
            href="/signup"
            className="inline-block bg-white text-accent px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition"
          >
            Get Started →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
