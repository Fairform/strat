'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-20">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-surface rounded-full border border-border mb-6">
            <span className="text-label text-secondary uppercase">Powered by AI</span>
          </div>

          {/* Headline */}
          <h1 className="text-display-lg font-bold text-primary mb-6 max-w-4xl mx-auto">
            Meeting Minutes in 10 Minutes
          </h1>

          {/* Subheadline */}
          <p className="text-heading-md text-secondary mb-12 max-w-3xl mx-auto">
            AI-powered strata meeting minutes. Upload your recording, get legally compliant 
            minutes for all Australian states. From $199.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="#upload"
              className="px-8 py-4 bg-accent text-white rounded-lg hover:bg-blue-600 transition-all hover:scale-105 text-body-lg font-medium"
            >
              Upload Recording
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-4 bg-transparent text-white border border-border rounded-lg hover:border-primary transition-all text-body-lg font-medium"
            >
              Watch Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">300k+</div>
              <div className="text-body-sm text-secondary">Strata Schemes</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">10 Min</div>
              <div className="text-body-sm text-secondary">Processing</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">4-6 Hrs</div>
              <div className="text-body-sm text-secondary">Saved</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">All 8</div>
              <div className="text-body-sm text-secondary">States Compliant</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
