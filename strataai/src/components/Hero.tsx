'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-20"
      style={{
        background: 'linear-gradient(180deg, #F6F5F2 0%, #ECE9E2 100%)',
      }}
    >
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-display-lg text-text mb-6 leading-tight">
              The Operating System for Build-to-Rent Developers
            </h1>

            <p className="text-body-lg text-text-muted mb-8 max-w-lg">
              Manage leasing, rent, maintenance, and tenants from one elegant platform.
              Built for boutique developers who demand simplicity and power.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo" className="btn-primary">
                See Demo
              </Link>
              <Link href="#features" className="btn-secondary">
                Learn More
              </Link>
            </div>

            {/* Stats - moved below CTAs for better flow */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-border">
              <div>
                <div className="text-4xl font-bold text-text mb-1">93%</div>
                <div className="text-sm text-text-muted">Avg Occupancy</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-text mb-1">10hrs</div>
                <div className="text-sm text-text-muted">Saved/Week</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-text mb-1">100+</div>
                <div className="text-sm text-text-muted">Properties</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-surface border border-border">
              {/* Placeholder for dashboard image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent-light/10 to-accent/10">
                <div className="text-center p-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </div>
                  <p className="text-text-muted text-sm">
                    Dashboard Preview
                  </p>
                </div>
              </div>
            </div>

            {/* Floating accent element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-light/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
