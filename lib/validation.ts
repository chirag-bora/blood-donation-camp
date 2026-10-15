import { z } from 'zod'

// Normalize Indian phone number: strip non-digits, country code, spaces, dashes
export function normalizePhoneNumber(phone: string): string {
  let normalized = phone.replace(/[^0-9]/g, '')
  if (normalized.length > 10 && normalized.startsWith('91')) {
    normalized = normalized.slice(2)
  }
  return normalized
}

// Indian mobile regex (10 digits starting with 6, 7, 8, or 9)
export const indianMobileRegex = /^[6-9]\d{9}$/

// 1. Primary Streamlined Registration Schema
export const DonorRegistrationSchema = z.object({
  fullName: z
    .string()
    .min(2, 'कृपया अपना पूरा नाम लिखें (कम से कम 2 अक्षर)')
    .max(100, 'नाम बहुत लंबा है'),
  mobileNumber: z
    .string()
    .optional()
    .default('')
    .transform((val) => (val ? normalizePhoneNumber(val) : ''))
    .refine(
      (val) => !val || indianMobileRegex.test(val),
      {
        message: 'यदि मोबाइल नंबर दे रहे हैं, तो मान्य 10 अंकों का भारतीय मोबाइल नंबर दर्ज करें (शुरुआत 6, 7, 8 या 9 से)',
      }
    ),
  age: z.coerce
    .number({ invalid_type_error: 'आयु अंकों में दर्ज करें' })
    .int('आयु पूर्णांक होनी चाहिए')
    .min(18, 'रक्तदान के लिए न्यूनतम आयु 18 वर्ष आवश्यक है')
    .max(65, 'रक्तदान के लिए अधिकतम आयु 65 वर्ष है'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown', ''])
    .default('Unknown')
    .optional(),
  city: z.string().max(80, 'क्षेत्र का नाम बहुत लंबा है').optional().default(''),
  previousDonation: z
    .enum(['Yes', 'No', 'Prefer not to say'])
    .default('Prefer not to say'),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: 'पंजीकरण के लिए सहमति देना अनिवार्य है' }),
  }),
})

export type DonorRegistrationData = z.infer<typeof DonorRegistrationSchema>

// 2. Admin & Multi-step Compatibility Schemas
export const AdminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const StatusUpdateSchema = z.object({
  registrationId: z.string(),
  status: z.enum(['REGISTERED', 'CONTACTED', 'CONFIRMED', 'ATTENDED', 'DONATION_COMPLETED', 'CANCELLED']),
  notes: z.string().max(500).optional(),
})

export const DonorFiltersSchema = z.object({
  search: z.string().max(100).optional(),
  bloodGroup: z.string().optional(),
  status: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['registeredAt', 'fullName', 'bloodGroup', 'status']).default('registeredAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export const Step1Schema = z.object({
  fullName: z.string().min(2),
  mobileNumber: z
    .string()
    .optional()
    .default('')
    .transform((val) => (val ? normalizePhoneNumber(val) : ''))
    .refine((val) => !val || indianMobileRegex.test(val), {
      message: 'Valid 10-digit mobile number required if provided',
    }),
  age: z.number().optional().nullable(),
  dateOfBirth: z.string().optional().nullable(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']).optional().nullable(),
  city: z.string().optional().nullable(),
  preferredLanguage: z.enum(['HINDI', 'ENGLISH']).default('HINDI'),
})

export const Step2Schema = z.object({
  bloodGroup: z.string().optional().nullable(),
  previousDonation: z.enum(['YES', 'NO', 'PREFER_NOT_TO_SAY']).default('PREFER_NOT_TO_SAY'),
  lastDonationDate: z.string().optional().nullable(),
  preferredTimeSlot: z.string().optional().nullable(),
  preferredContactMethod: z.enum(['PHONE_CALL', 'SMS']).default('PHONE_CALL'),
})

export const Step3Schema = z.object({
  consentGiven: z.boolean(),
  marketingConsent: z.boolean().default(false),
})

export const FullRegistrationSchema = Step1Schema.merge(Step2Schema).merge(Step3Schema)

export type Step1Data = z.infer<typeof Step1Schema>
export type Step2Data = z.infer<typeof Step2Schema>
export type Step3Data = z.infer<typeof Step3Schema>
export type FullRegistrationData = any
export type AdminLoginData = z.infer<typeof AdminLoginSchema>
export type StatusUpdateData = z.infer<typeof StatusUpdateSchema>
export type DonorFilters = z.infer<typeof DonorFiltersSchema>
