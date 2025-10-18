'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Column 1: Logo & Description */}
          <div>
            <Image
              src="/atrio-logo.svg"
              alt="Atrio"
              width={100}
              height={32}
              className="mb-4"
            />
            <p className="text-small text-text-muted">
              The Operating System for Build-to-Rent Developers
            </p>
          </div>

          {/* Column 2: Product Links */}
          <div>
            <h4 className="text-text font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-text-muted hover:text-accent transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-text-muted hover:text-accent transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-text-muted hover:text-accent transition">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-text-muted hover:text-accent transition">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div>
            <h4 className="text-text font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-text-muted hover:text-accent transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-muted hover:text-accent transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-text-muted hover:text-accent transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-muted hover:text-accent transition">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <p className="text-small text-text-muted mb-4 md:mb-0">
            © 2025 Atrio. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="https://linkedin.com"
              className="text-text-muted hover:text-accent transition"
            >
              LinkedIn
            </Link>
            <Link
              href="https://twitter.com"
              className="text-text-muted hover:text-accent transition"
            >
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
