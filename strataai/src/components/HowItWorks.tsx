'use client'

import { motion } from 'framer-motion'
import { Upload, Cpu, FileCheck } from 'lucide-react'

const steps = [
  {
    number: '1',
    icon: Upload,
    title: 'Upload Recording',
    description: 'Upload your meeting recording (audio or video)',
    detail: 'Supports MP3, WAV, MP4, MOV, up to 3 hours'
  },
  {
    number: '2',
    icon: Cpu,
    title: 'AI Processing',
    description: 'AI transcribes and generates state-compliant minutes',
    detail: 'Follows legislation for NSW, VIC, QLD, SA, WA, TAS, ACT, NT'
  },
  {
    number: '3',
    icon: FileCheck,
    title: 'Receive Minutes',
    description: 'Get DOCX + PDF via email in 10 minutes',
    detail: 'Legally compliant, ready to distribute'
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-md font-bold text-primary mb-4">
            How It Works
          </h2>
          <p className="text-body-lg text-secondary max-w-2xl mx-auto">
            Three simple steps to get your legally compliant meeting minutes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-surface rounded-2xl p-8 border border-border card-hover"
            >
              {/* Number Badge */}
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-6">
                <span className="text-heading-lg font-bold text-white">{step.number}</span>
              </div>

              {/* Icon */}
              <div className="mb-6">
                <step.icon className="w-10 h-10 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-heading-lg font-bold text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-body-md text-secondary mb-4">
                {step.description}
              </p>
              <p className="text-body-sm text-secondary">
                {step.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
