import { z } from 'zod'
import type {
  AustralianState,
  BuildingSize,
  FileValidation
} from '@/types'
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/types'

// Australian State Schema
export const australianStateSchema = z.enum([
  'NSW',
  'VIC',
  'QLD',
  'SA',
  'WA',
  'TAS',
  'ACT',
  'NT',
])

// Meeting Type Schema
export const meetingTypeSchema = z.enum([
  'AGM',
  'EGM',
  'Committee Meeting',
  'Special Meeting',
])

// Building Size Schema
export const buildingSizeSchema = z.enum(['small', 'medium', 'large'])

// Upload Form Schema
export const uploadFormSchema = z.object({
  buildingSize: buildingSizeSchema,
  state: australianStateSchema,
  meetingType: meetingTypeSchema,
  buildingName: z
    .string()
    .min(2, 'Building name must be at least 2 characters')
    .max(100, 'Building name must be less than 100 characters'),
  meetingDate: z
    .string()
    .refine((date: string) => {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate <= today
    }, 'Meeting date cannot be in the future'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  acceptedTerms: z
    .boolean()
    .refine((val) => val === true, 'You must accept the terms and conditions'),
})

export type UploadFormSchema = z.infer<typeof uploadFormSchema>

// File Validation Function
export const validateFile = (file: File | null): FileValidation => {
  if (!file) {
    return {
      valid: false,
      error: 'Please select a file to upload',
    }
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    const maxSizeMB = Math.floor(MAX_FILE_SIZE / (1024 * 1024))
    return {
      valid: false,
      error: `File size must be less than ${maxSizeMB}MB`,
    }
  }

  // Check file type
  if (!ALLOWED_FILE_TYPES.includes(file.type as typeof ALLOWED_FILE_TYPES[number])) {
    return {
      valid: false,
      error: 'File type not supported. Please upload an audio or video file (MP3, WAV, MP4, MOV)',
    }
  }

  // Check file name
  if (file.name.length > 255) {
    return {
      valid: false,
      error: 'File name is too long',
    }
  }

  return {
    valid: true,
    file,
  }
}

// Format file size for display
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

// Get file extension
export const getFileExtension = (filename: string): string => {
  const parts = filename.split('.')
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : ''
}

// Email validation (additional client-side)
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone number validation (Australian format)
export const isValidAustralianPhone = (phone: string): boolean => {
  // Matches: 04xx xxx xxx, 1300 xxx xxx, 1800 xxx xxx, (0x) xxxx xxxx
  const phoneRegex = /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$|^1[38]00[ -]?[0-9]{3}[ -]?[0-9]{3}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Sanitize filename
export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .substring(0, 255)
}

// Get pricing for building size
export const getPricing = (buildingSize: BuildingSize): number => {
  const pricing = {
    small: 199,
    medium: 349,
    large: 499,
  }
  return pricing[buildingSize]
}

// Format currency (Australian Dollars)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format date
export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

// Get state full name
export const getStateFullName = (state: AustralianState): string => {
  const stateNames: Record<AustralianState, string> = {
    NSW: 'New South Wales',
    VIC: 'Victoria',
    QLD: 'Queensland',
    SA: 'South Australia',
    WA: 'Western Australia',
    TAS: 'Tasmania',
    ACT: 'Australian Capital Territory',
    NT: 'Northern Territory',
  }
  return stateNames[state]
}

// Validate upload request (for API route)
export const validateUploadRequest = (data: Record<string, unknown>): { success: boolean; error?: string } => {
  try {
    const schema = z.object({
      buildingSize: buildingSizeSchema,
      state: australianStateSchema,
      meetingType: meetingTypeSchema,
      buildingName: z.string().min(2).max(100),
      meetingDate: z.string(),
      email: z.string().email(),
    });

    schema.parse(data);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: 'Validation failed' };
  }
}
