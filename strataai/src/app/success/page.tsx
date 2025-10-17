import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <CheckCircle2 className="w-20 h-20 text-success mx-auto mb-6" />
          <h1 className="text-display-md font-bold text-primary mb-4">
            Payment Successful!
          </h1>
          <p className="text-body-lg text-secondary mb-8">
            Your meeting recording has been received and is being processed. You&apos;ll receive your minutes via email within 10 minutes.
          </p>
        </div>

        <div className="bg-surface rounded-xl p-6 border border-border mb-8">
          <h2 className="text-heading-lg font-bold text-primary mb-4">
            What happens next?
          </h2>
          <ul className="text-left space-y-3 text-body-md text-secondary">
            <li className="flex items-start">
              <span className="text-accent mr-2">1.</span>
              <span>AI transcribes your meeting recording</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">2.</span>
              <span>Minutes generated following state legislation</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">3.</span>
              <span>DOCX and PDF files sent to your email</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">4.</span>
              <span>Review, edit if needed, and distribute</span>
            </li>
          </ul>
        </div>

        <Link
          href="/"
          className="inline-block px-8 py-4 bg-accent text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}
