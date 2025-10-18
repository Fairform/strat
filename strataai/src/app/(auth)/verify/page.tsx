'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  const handleResend = async () => {
    if (!email) return

    setResending(true)
    try {
      // TODO: Implement resend verification email
      await new Promise(resolve => setTimeout(resolve, 1000))
      setResent(true)
    } catch (error) {
      console.error('Failed to resend email:', error)
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F5F2] via-white to-[#F6F5F2] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/atrio-logo.svg"
              alt="Atrio"
              width={120}
              height={40}
              className="mx-auto"
            />
          </Link>
        </div>

        {/* Verify Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-[#C4733A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#C4733A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Check your email
          </h1>

          <p className="text-gray-600 mb-6">
            We&apos;ve sent a verification link to
            {email && (
              <span className="block font-medium text-gray-900 mt-2">
                {email}
              </span>
            )}
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              Click the link in the email to verify your account and get started with Atrio.
            </p>
          </div>

          {/* Resend */}
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Didn&apos;t receive the email?
            </p>

            {resent ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                Verification email resent successfully!
              </div>
            ) : (
              <button
                onClick={handleResend}
                disabled={resending}
                className="text-[#C4733A] hover:text-[#A05D2E] font-medium text-sm transition-colors disabled:opacity-50"
              >
                {resending ? 'Sending...' : 'Resend verification email'}
              </button>
            )}
          </div>

          {/* Tips */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3">
              Troubleshooting tips:
            </p>
            <ul className="text-xs text-gray-600 space-y-2 text-left">
              <li className="flex items-start">
                <svg className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Check your spam or junk folder
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Make sure you entered the correct email address
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Wait a few minutes and check again
              </li>
            </ul>
          </div>
        </div>

        {/* Back to login */}
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
