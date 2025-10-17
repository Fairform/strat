'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Upload, Brain, Mail, ArrowRight } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Upload Recording',
    description: 'Upload your meeting recording (audio or video)',
    details: 'Supports MP3, WAV, MP4, MOV, up to 3 hours',
    icon: Upload,
  },
  {
    id: 2,
    title: 'AI Processing',
    description: 'Our AI transcribes and generates state-compliant minutes',
    details: 'Follows legislation for NSW, VIC, QLD, SA, WA',
    icon: Brain,
  },
  {
    id: 3,
    title: 'Receive Minutes',
    description: 'Get DOCX + PDF via email in 10 minutes',
    details: 'Legally compliant, ready to distribute',
    icon: Mail,
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-4 py-2 rounded-full glass border border-emerald-500/20"
          >
            <span className="text-sm text-emerald-400 font-semibold uppercase tracking-wider">
              Simple Process
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-white">How It </span>
            <span className="gradient-text">Works</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Three simple steps to get legally compliant meeting minutes
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative"
              >
                <div className="glass rounded-2xl p-8 border border-white/10 hover:border-emerald-400/30 transition-all hover-lift">
                  {/* Step number badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center text-slate-900 text-xl font-bold shadow-lg">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-emerald-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  <p className="text-sm text-gray-400">
                    {step.details}
                  </p>
                </div>

                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <ArrowRight className="w-8 h-8 text-emerald-400/50" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="#upload"
            className="inline-flex items-center px-8 py-4 text-base font-semibold text-slate-900 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
