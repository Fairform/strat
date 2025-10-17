'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-heading-lg font-bold text-primary mb-4">
              Strata AI
            </h3>
            <p className="text-body-sm text-secondary">
              AI-powered meeting minutes for Australian strata schemes. Fast, compliant, and affordable.
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-body-md font-medium text-primary mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#how-it-works" className="text-body-sm text-secondary hover:text-primary transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-body-sm text-secondary hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-body-sm text-secondary hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#upload" className="text-body-sm text-secondary hover:text-primary transition-colors">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-body-md font-medium text-primary mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-body-sm text-secondary hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-body-sm text-secondary hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-body-sm text-secondary hover:text-primary transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-body-md font-medium text-primary mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@strata-ai.com" className="text-body-sm text-secondary hover:text-primary transition-colors">
                  support@strata-ai.com
                </a>
              </li>
              <li>
                <a href="tel:1300787282" className="text-body-sm text-secondary hover:text-primary transition-colors">
                  1300 STRATA AI
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-body-sm text-secondary mb-4 md:mb-0">
            © 2025 Strata AI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
