export type BuildingSize = 'small' | 'medium' | 'large'

export type AustralianState = 'NSW' | 'VIC' | 'QLD' | 'SA' | 'WA' | 'TAS' | 'ACT' | 'NT'

export type MeetingType = 'agm' | 'egm' | 'committee' | 'special'

export type MeetingStatus = 'pending' | 'processing' | 'completed' | 'failed'

export interface MeetingFormData {
  buildingSize: BuildingSize
  state: AustralianState
  meetingType: MeetingType
  buildingName: string
  meetingDate: string
  email: string
  file: File | null
}

export interface PricingTier {
  size: BuildingSize
  label: string
  description: string
  price: number
  units: string
}

export interface StateInfo {
  code: AustralianState
  name: string
  legislation: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FeatureCard {
  icon: string
  title: string
  description: string
}

export interface TestimonialCard {
  name: string
  role: string
  company: string
  content: string
  avatar?: string
}

export const PRICING_TIERS: PricingTier[] = [
  {
    size: 'small',
    label: 'Small',
    description: 'Less than 20 units',
    price: 199,
    units: '<20 units'
  },
  {
    size: 'medium',
    label: 'Medium',
    description: '20-100 units',
    price: 349,
    units: '20-100 units'
  },
  {
    size: 'large',
    label: 'Large',
    description: '100+ units',
    price: 499,
    units: '100+ units'
  }
]

export const AUSTRALIAN_STATES: StateInfo[] = [
  { code: 'NSW', name: 'New South Wales', legislation: 'Strata Schemes Management Act 2015' },
  { code: 'VIC', name: 'Victoria', legislation: 'Owners Corporations Act 2006' },
  { code: 'QLD', name: 'Queensland', legislation: 'Body Corporate and Community Management Act 1997' },
  { code: 'SA', name: 'South Australia', legislation: 'Community Titles Act 1996' },
  { code: 'WA', name: 'Western Australia', legislation: 'Strata Titles Act 1985' },
  { code: 'TAS', name: 'Tasmania', legislation: 'Strata Titles Act 1998' },
  { code: 'ACT', name: 'Australian Capital Territory', legislation: 'Unit Titles Act 2001' },
  { code: 'NT', name: 'Northern Territory', legislation: 'Unit Titles Act 2009' }
]

export const MEETING_TYPES = [
  { value: 'agm', label: 'Annual General Meeting (AGM)' },
  { value: 'egm', label: 'Extraordinary General Meeting (EGM)' },
  { value: 'committee', label: 'Committee Meeting' },
  { value: 'special', label: 'Special Meeting' }
]

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How does Strata AI work?',
    answer: 'Upload your meeting recording (audio or video), select your building size and state, and our AI will transcribe and generate legally compliant minutes following your state\'s legislation. You\'ll receive DOCX and PDF files via email within 10 minutes.'
  },
  {
    question: 'What file formats do you accept?',
    answer: 'We accept MP3, WAV, MP4, and MOV files up to 500MB in size and 3 hours in duration. Most modern recording devices and software produce files in these formats.'
  },
  {
    question: 'How long does processing take?',
    answer: 'Most meetings are processed within 10 minutes. Larger meetings (2-3 hours) may take up to 15 minutes. You\'ll receive an email notification when your minutes are ready.'
  },
  {
    question: 'Is it legally compliant?',
    answer: 'Yes. Our AI is trained on the specific legislation for all 8 Australian states and territories. The generated minutes follow the required format and include all mandatory elements for legal compliance.'
  },
  {
    question: 'Which states are supported?',
    answer: 'We support all Australian states and territories: NSW, VIC, QLD, SA, WA, TAS, ACT, and NT. Each has different legislation requirements, which our AI automatically applies.'
  },
  {
    question: 'What if I\'m not satisfied?',
    answer: 'We offer a 100% money-back guarantee. If the generated minutes don\'t meet your expectations or contain errors, contact us within 7 days for a full refund.'
  },
  {
    question: 'How do I receive the minutes?',
    answer: 'Minutes are delivered to your email as both DOCX (editable) and PDF (print-ready) files. You can download them immediately from the email or access them from your account dashboard.'
  },
  {
    question: 'Can I edit the minutes?',
    answer: 'Yes. The DOCX file is fully editable in Microsoft Word or Google Docs. You can make any changes needed before distributing to building owners or filing with authorities.'
  }
]
