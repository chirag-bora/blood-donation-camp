import * as XLSX from 'xlsx'
import { sanitizeExportCell, formatIST } from './security'

// Human-readable labels
const BLOOD_GROUP_LABELS: Record<string, string> = {
  A_POSITIVE: 'A+', A_NEGATIVE: 'A-', B_POSITIVE: 'B+', B_NEGATIVE: 'B-',
  AB_POSITIVE: 'AB+', AB_NEGATIVE: 'AB-', O_POSITIVE: 'O+', O_NEGATIVE: 'O-',
  UNKNOWN: 'Unknown',
}

const TIME_SLOT_LABELS: Record<string, string> = {
  SLOT_9_10: '9:00–10:00 AM', SLOT_10_11: '10:00–11:00 AM', SLOT_11_12: '11:00 AM–12:00 PM',
  SLOT_12_1: '12:00–1:00 PM', SLOT_1_2: '1:00–2:00 PM', SLOT_2_3: '2:00–3:00 PM',
  SLOT_3_4: '3:00–4:00 PM', SLOT_4_5: '4:00–5:00 PM', NO_PREFERENCE: 'No Preference',
}

const GENDER_LABELS: Record<string, string> = {
  MALE: 'Male', FEMALE: 'Female', OTHER: 'Other', PREFER_NOT_TO_SAY: 'Prefer Not to Say',
}

type ExportRow = {
  referenceNumber: string
  fullName: string
  mobileNumber: string
  age?: number | null
  gender?: string | null
  city?: string | null
  bloodGroup?: string | null
  previousDonation: string
  preferredTimeSlot?: string | null
  status: string
  registeredAt: Date
  consentGiven: boolean
  marketingConsent: boolean
}

function formatRow(row: ExportRow) {
  return {
    'Reference No': sanitizeExportCell(row.referenceNumber),
    'Full Name': sanitizeExportCell(row.fullName),
    'Mobile Number': sanitizeExportCell(row.mobileNumber),
    'Age': row.age != null ? String(row.age) : '',
    'Gender': sanitizeExportCell(GENDER_LABELS[row.gender ?? ''] ?? row.gender ?? ''),
    'City': sanitizeExportCell(row.city ?? ''),
    'Blood Group': sanitizeExportCell(BLOOD_GROUP_LABELS[row.bloodGroup ?? ''] ?? row.bloodGroup ?? 'Not Specified'),
    'Previous Donor': row.previousDonation === 'YES' ? 'Yes' : row.previousDonation === 'NO' ? 'No' : 'Not Specified',
    'Preferred Time': sanitizeExportCell(TIME_SLOT_LABELS[row.preferredTimeSlot ?? ''] ?? 'Not Specified'),
    'Status': sanitizeExportCell(row.status),
    'Registered At (IST)': sanitizeExportCell(formatIST(row.registeredAt)),
    'Consent Given': row.consentGiven ? 'Yes' : 'No',
    'Marketing Consent': row.marketingConsent ? 'Yes' : 'No',
  }
}

export function generateCSV(rows: ExportRow[]): string {
  const formatted = rows.map(formatRow)
  if (formatted.length === 0) return 'No records found'
  
  const headers = Object.keys(formatted[0])
  const csvRows = [
    headers.join(','),
    ...formatted.map((row) =>
      headers.map((h) => `"${(row as Record<string, string>)[h].replace(/"/g, '""')}"`).join(',')
    ),
  ]
  return csvRows.join('\n')
}

export function generateExcel(rows: ExportRow[]): Buffer {
  const formatted = rows.map(formatRow)
  const worksheet = XLSX.utils.json_to_sheet(formatted.length > 0 ? formatted : [{ 'No Records': 'No records found' }])
  
  // Auto-size columns
  const colWidths = Object.keys(formatted[0] || {}).map((key) => ({
    wch: Math.max(key.length, ...formatted.map((r) => String((r as Record<string, string>)[key]).length)) + 2,
  }))
  worksheet['!cols'] = colWidths

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Donor Registrations')
  
  return Buffer.from(XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' }))
}
