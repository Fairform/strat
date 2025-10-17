'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Play, Sparkles } from 'lucide-react'

export default function Hero() {
  const handleScrollToUpload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.querySelector('#upload')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const stats = [
    { value: '300k+', label: 'Strata Schemes' },
    { value: '10 min', label: 'Processing' },
    { value: '4-6 hrs', label: 'Time Saved' },
    { value: '99%', label: 'Cost Savings' },
  ]

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* News Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 border border-emerald-500/20">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-gray-200 font-medium">
              Trusted by 300k+ Australian Strata Schemes
            </span>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-white">AI Built For</span>
            <br />
            <span className="gradient-text text-6xl sm:text-7xl lg:text-8xl">
              Strata Meetings
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your recordings into legally compliant meeting minutes in{' '}
            <span className="text-emerald-400 font-semibold">10 minutes</span>.
            Automated motions, votes, and state-specific compliance for all Australian states.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <a
              href="#upload"
              onClick={handleScrollToUpload}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-900 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
            >
              <span className="relative z-10 flex items-center">
                Generate Minutes Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <button className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white glass rounded-lg border border-white/10 transition-all hover:border-emerald-400/50 hover:bg-white/10">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-emerald-400/30 transition-all"
              >
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Demo Video/Visual Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 max-w-6xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl">
            {/* Video Container */}
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative">
              {/* Placeholder for demo video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center hover-lift cursor-pointer">
                    <Play className="w-10 h-10 text-slate-900" />
                  </div>
                  <p className="text-gray-400 text-sm">Watch how it works</p>
                </div>
              </div>

              {/* Floating compliance badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-6 right-6 glass rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">All States</div>
                    <div className="text-sm font-semibold text-white">Compliant</div>
                  </div>
                </div>
              </motion.div>

              {/* Processing indicator */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-6 left-6 glass rounded-xl px-4 py-3 border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-white">
                    Processing: ~10 minutes
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Document Preview Section */}
            <div className="grid md:grid-cols-2 gap-px bg-white/5">
              <div className="bg-slate-900/50 p-6">
                <div className="text-xs font-semibold text-emerald-400 mb-2 uppercase tracking-wide">
                  Before
                </div>
                <div className="text-sm text-gray-400 mb-4">Audio Recording</div>
                <div className="space-y-2">
                  <div className="h-2 bg-white/10 rounded w-full"></div>
                  <div className="h-2 bg-white/10 rounded w-3/4"></div>
                  <div className="h-2 bg-white/10 rounded w-5/6"></div>
                </div>
              </div>
              <div className="bg-slate-900/50 p-6">
                <div className="text-xs font-semibold text-cyan-400 mb-2 uppercase tracking-wide">
                  After
                </div>
                <div className="text-sm text-gray-400 mb-4">Compliant Minutes</div>
                <div className="space-y-2">
                  <div className="h-2 bg-gradient-to-r from-emerald-400/30 to-cyan-400/30 rounded w-full"></div>
                  <div className="h-2 bg-gradient-to-r from-emerald-400/30 to-cyan-400/30 rounded w-4/5"></div>
                  <div className="h-2 bg-gradient-to-r from-emerald-400/30 to-cyan-400/30 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
