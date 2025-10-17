'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Metric {
  value: string
  label: string
  description: string
}

const metrics: Metric[] = [
  {
    value: '300,000+',
    label: 'Strata Schemes',
    description: 'in Australia',
  },
  {
    value: '1.2M',
    label: 'Annual Meetings',
    description: 'per year',
  },
  {
    value: '$360M+',
    label: 'Market Opportunity',
    description: 'annually',
  },
  {
    value: '10 Min',
    label: 'Processing Time',
    description: 'average',
  },
]

export default function TrustMetrics() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="py-12 bg-neutral-50 border-y border-neutral-200"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={
                isVisible
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-display font-bold text-primary-600 mb-2">
                {metric.value}
              </div>
              <div className="text-sm sm:text-base font-semibold text-neutral-900 mb-1">
                {metric.label}
              </div>
              <div className="text-xs sm:text-sm text-neutral-600">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
