// Australian States and Territories
export type AustralianState =
  | 'NSW'
  | 'VIC'
  | 'QLD'
  | 'SA'
  | 'WA'
  | 'TAS'
  | 'ACT'
  | 'NT'

// Meeting Types
export type MeetingType =
  | 'AGM'
  | 'EGM'
  | 'Committee Meeting'
  | 'Special Meeting'

// Building Size (for pricing)
export type BuildingSize = 'small' | 'medium' | 'large'

// Meeting Status
export type MeetingStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'

// Upload Form Data
export interface UploadFormData {
  buildingSize: BuildingSize
  state: AustralianState
  meetingType: MeetingType
  buildingName: string
  meetingDate: string
  email: string
  file: File | null
  acceptedTerms: boolean
}

// Meeting Record
export interface Meeting {
  id: string
  buildingSize: BuildingSize
  state: AustralianState
  meetingType: MeetingType
  buildingName: string
  meetingDate: string
  email: string
  fileName: string
  fileSize: number
  status: MeetingStatus
  price: number
  createdAt: string
  updatedAt: string
  completedAt?: string
}

// User (for future authentication)
export interface User {
  id: string
  email: string
  name: string
  role: 'individual' | 'business' | 'enterprise'
  createdAt: string
}

// Pricing Tier
export interface PricingTier {
  id: BuildingSize
  name: string
  description: string
  price: number
  units: string
  features: string[]
  highlighted?: boolean
}

// B2B Pricing Tier
export interface B2BPricingTier {
  id: string
  name: string
  description: string
  pricePerMeeting: number
  minMeetings: number
  maxMeetings?: number
  features: string[]
  highlighted?: boolean
}

// Testimonial
export interface Testimonial {
  id: string
  name: string
  title: string
  company: string
  location: string
  testimonial: string
  rating: number
  avatar?: string
}

// FAQ Item
export interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'general' | 'pricing' | 'legal' | 'technical'
}

// State Compliance Info
export interface StateCompliance {
  state: AustralianState
  stateName: string
  legislation: string
  description: string
}

// How It Works Step
export interface HowItWorksStep {
  id: number
  title: string
  description: string
  details: string
  icon: string
}

// Trust Metric
export interface TrustMetric {
  id: string
  value: string
  label: string
  description?: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface UploadResponse {
  meetingId: string
  paymentUrl: string
  message: string
}

// Stripe Payment Intent
export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: string
  clientSecret: string
}

// Form Validation Errors
export type FormErrors<T> = {
  [K in keyof T]?: string
}

// File Upload Validation
export interface FileValidation {
  valid: boolean
  error?: string
  file?: File
}

// Allowed file types and constraints
export const ALLOWED_FILE_TYPES = [
  'audio/mpeg',
  'audio/wav',
  'audio/mp3',
  'audio/mp4',
  'audio/x-m4a',
  'video/mp4',
  'video/quicktime',
  'video/x-msvideo',
] as const

export const MAX_FILE_SIZE = 500 * 1024 * 1024 // 500MB
export const MAX_DURATION = 3 * 60 * 60 // 3 hours in seconds

// Pricing constants
export const PRICING_TIERS: Record<BuildingSize, number> = {
  small: 199,
  medium: 349,
  large: 499,
} as const
