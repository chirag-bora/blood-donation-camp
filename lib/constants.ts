// Central Camp Details - Source of Truth
export const CAMP_CONFIG = {
  name: 'माँ उष्ट्रवाहिनी रक्तदान शिविर',
  nameEn: 'Maa Ushtravahini Raktdaan Shivir',
  titleHindi: 'रक्तदान शिविर',
  sloganHindi: 'रक्तदान महादान',
  subSloganHindi: 'आपका एक कदम, किसी को दे सकता है नया जीवन ❤️',
  date: '18 October 2026, Sunday',
  dateHindi: '18 अक्टूबर 2026, रविवार',
  time: 'प्रातः 9:00 बजे से सायं 5:00 बजे तक',
  timeShort: '9:00 AM – 5:00 PM',
  venue: 'Shri Jai Narayan Vyas Vidyalaya, Jadav Mohalla, Jodhpur, Rajasthan',
  venueHindi: 'श्री जय नारायण व्यास विद्यालय, जादव मोहल्ला, जोधपुर',
  mapUrl: 'https://maps.google.com/?q=Shri+Jai+Narayan+Vyas+Vidyalaya+Jodhpur',
  registrationUrl: process.env.NEXT_PUBLIC_REGISTRATION_URL || 'https://blood-donation-camp-one.vercel.app/',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://blood-donation-camp-one.vercel.app',
} as const

export const ORGANIZERS = [
  { name: 'Dr. Ankit Kalla', phone: '8114416153', display: '81144 16153' },
  { name: 'Mohit Vyas', phone: '8209136206', display: '82091 36206' },
  { name: 'Er. Chirag Bora', phone: '8955560932', display: '89555 60932' },
  { name: 'Dev Joshi', phone: '7014720642', display: '70147 20642' },
  { name: 'Er. Mukul Raj Vyas', phone: '8239885138', display: '82398 85138' },
  { name: 'Abhishek Parihar', phone: '9145847050', display: '91458 47050' },
] as const

export const BLOOD_GROUP_LABELS: Record<string, string> = {
  A_POSITIVE: 'A+', A_NEGATIVE: 'A-', B_POSITIVE: 'B+', B_NEGATIVE: 'B-',
  AB_POSITIVE: 'AB+', AB_NEGATIVE: 'AB-', O_POSITIVE: 'O+', O_NEGATIVE: 'O-',
  UNKNOWN: 'Unknown / मुझे नहीं पता',
}

export const TIME_SLOT_LABELS: Record<string, string> = {
  SLOT_9_10: '9:00 – 10:00 AM',
  SLOT_10_11: '10:00 – 11:00 AM',
  SLOT_11_12: '11:00 AM – 12:00 PM',
  SLOT_12_1: '12:00 – 1:00 PM',
  SLOT_1_2: '1:00 – 2:00 PM',
  SLOT_2_3: '2:00 – 3:00 PM',
  SLOT_3_4: '3:00 – 4:00 PM',
  SLOT_4_5: '4:00 – 5:00 PM',
  NO_PREFERENCE: 'No Preference / कोई भी समय',
}

export const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  REGISTERED: { label: 'Registered', color: 'blue' },
  CONTACTED: { label: 'Contacted', color: 'yellow' },
  CONFIRMED: { label: 'Confirmed', color: 'green' },
  ATTENDED: { label: 'Attended', color: 'purple' },
  DONATION_COMPLETED: { label: 'Donation Completed', color: 'emerald' },
  CANCELLED: { label: 'Cancelled', color: 'red' },
  ANONYMIZED: { label: 'Anonymized', color: 'gray' },
}
