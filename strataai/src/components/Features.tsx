'use client'

import { motion } from 'framer-motion'
import { Building2, MessageSquare, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: Building2,
    title: 'Portfolio in One Place',
    description: 'Centralise rent, leases, and units in one dashboard.'
  },
  {
    icon: MessageSquare,
    title: 'Tenant Communication',
    description: 'Chat, announce, and resolve issues instantly.'
  },
  {
    icon: BarChart3,
    title: 'Owner Reporting',
    description: 'Automated financial and occupancy insights.'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-bg">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group"
            >
              <feature.icon className="w-10 h-10 text-accent mb-6" />

              <h3 className="text-heading-lg text-text mb-3 relative">
                {feature.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </h3>

              <p className="text-body-md text-text-muted">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
