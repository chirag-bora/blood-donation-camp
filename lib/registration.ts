import { customAlphabet } from 'nanoid'
import { prisma } from './db'
import { FullRegistrationData, normalizePhoneNumber } from './validation'
import { RegistrationStatus } from '@prisma/client'

// Generate readable, non-sequential reference number (e.g., RD-2026-AB3K9)
const nanoid = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 6)

export function generateReferenceNumber(): string {
  return `RD-2026-${nanoid()}`
}

// ============================================================
// CREATE REGISTRATION
// ============================================================
export async function createRegistration(data: FullRegistrationData) {
  const normalizedMobile = normalizePhoneNumber(data.mobileNumber)
  
  // Check for potential duplicate (same normalized mobile)
  const existingRegistration = await prisma.donorRegistration.findFirst({
    where: {
      mobileNumberNormalized: normalizedMobile,
      status: { not: RegistrationStatus.CANCELLED },
    },
  })

  // Generate unique reference number
  let referenceNumber: string
  let attempts = 0
  do {
    referenceNumber = generateReferenceNumber()
    const existing = await prisma.donorRegistration.findUnique({ where: { referenceNumber } })
    if (!existing) break
    attempts++
  } while (attempts < 5)

  const registration = await prisma.donorRegistration.create({
    data: {
      referenceNumber,
      fullName: data.fullName.trim(),
      mobileNumber: data.mobileNumber,
      mobileNumberNormalized: normalizedMobile,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      age: data.age ?? null,
      gender: data.gender ?? null,
      city: data.city?.trim() ?? null,
      preferredLanguage: data.preferredLanguage,
      bloodGroup: data.bloodGroup ?? null,
      previousDonation: data.previousDonation,
      lastDonationDate: data.lastDonationDate ? new Date(data.lastDonationDate) : null,
      preferredTimeSlot: data.preferredTimeSlot ?? null,
      preferredContactMethod: data.preferredContactMethod,
      consentGiven: data.consentGiven,
      consentTimestamp: new Date(),
      consentPolicyVersion: '1.0',
      marketingConsent: data.marketingConsent,
      marketingConsentTimestamp: data.marketingConsent ? new Date() : null,
      isDuplicate: !!existingRegistration,
      duplicateOfId: existingRegistration?.id ?? null,
      status: RegistrationStatus.REGISTERED,
      statusHistory: {
        create: {
          newStatus: RegistrationStatus.REGISTERED,
          notes: 'Registration created via public form',
        },
      },
    },
    select: {
      id: true,
      referenceNumber: true,
      fullName: true,
      registeredAt: true,
      isDuplicate: true,
    },
  })

  return { registration, isDuplicate: !!existingRegistration }
}

// ============================================================
// GET REGISTRATIONS (admin)
// ============================================================
export async function getRegistrations(filters: {
  search?: string
  bloodGroup?: string
  status?: string
  dateFrom?: string
  dateTo?: string
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}) {
  const {
    search,
    bloodGroup,
    status,
    dateFrom,
    dateTo,
    page = 1,
    pageSize = 20,
    sortBy = 'registeredAt',
    sortOrder = 'desc',
  } = filters

  const where: Record<string, unknown> = {}

  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: 'insensitive' } },
      { mobileNumber: { contains: search } },
      { mobileNumberNormalized: { contains: search } },
      { referenceNumber: { contains: search, mode: 'insensitive' } },
    ]
  }

  if (bloodGroup && bloodGroup !== 'ALL') {
    where.bloodGroup = bloodGroup
  }

  if (status && status !== 'ALL') {
    where.status = status
  }

  if (dateFrom || dateTo) {
    where.registeredAt = {}
    if (dateFrom) (where.registeredAt as Record<string, Date>).gte = new Date(dateFrom)
    if (dateTo) {
      const endDate = new Date(dateTo)
      endDate.setHours(23, 59, 59, 999)
      ;(where.registeredAt as Record<string, Date>).lte = endDate
    }
  }

  const [total, registrations] = await Promise.all([
    prisma.donorRegistration.count({ where }),
    prisma.donorRegistration.findMany({
      where,
      select: {
        id: true,
        referenceNumber: true,
        fullName: true,
        mobileNumber: true,
        age: true,
        dateOfBirth: true,
        bloodGroup: true,
        preferredTimeSlot: true,
        status: true,
        registeredAt: true,
        isDuplicate: true,
        city: true,
        gender: true,
        previousDonation: true,
        consentGiven: true,
        marketingConsent: true,
      },
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ])

  return {
    registrations,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

// ============================================================
// GET SINGLE REGISTRATION (admin)
// ============================================================
export async function getRegistrationById(id: string) {
  return prisma.donorRegistration.findUnique({
    where: { id },
    include: {
      statusHistory: {
        include: { changedBy: { select: { name: true, email: true } } },
        orderBy: { changedAt: 'desc' },
      },
    },
  })
}

// ============================================================
// UPDATE STATUS
// ============================================================
export async function updateRegistrationStatus(
  id: string,
  newStatus: RegistrationStatus,
  adminId: string,
  notes?: string
) {
  const current = await prisma.donorRegistration.findUnique({ where: { id }, select: { status: true } })
  if (!current) throw new Error('Registration not found')

  return prisma.$transaction([
    prisma.donorRegistration.update({
      where: { id },
      data: { status: newStatus },
    }),
    prisma.registrationStatusHistory.create({
      data: {
        registrationId: id,
        previousStatus: current.status,
        newStatus,
        changedById: adminId,
        notes,
      },
    }),
  ])
}

// ============================================================
// DASHBOARD STATISTICS
// ============================================================
export async function getDashboardStats() {
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfWeek = new Date(startOfToday)
  startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay())
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [
    totalRegistrations,
    todayRegistrations,
    weekRegistrations,
    monthRegistrations,
    byStatus,
    byBloodGroup,
    dailyTrend,
  ] = await Promise.all([
    prisma.donorRegistration.count(),
    prisma.donorRegistration.count({ where: { registeredAt: { gte: startOfToday } } }),
    prisma.donorRegistration.count({ where: { registeredAt: { gte: startOfWeek } } }),
    prisma.donorRegistration.count({ where: { registeredAt: { gte: startOfMonth } } }),
    prisma.donorRegistration.groupBy({ by: ['status'], _count: { id: true } }),
    prisma.donorRegistration.groupBy({ by: ['bloodGroup'], _count: { id: true }, where: { bloodGroup: { not: null } } }),
    // Last 30 days daily registrations
    prisma.$queryRaw<{ date: string; count: number }[]>`
      SELECT 
        DATE(registered_at AT TIME ZONE 'Asia/Kolkata') as date,
        COUNT(*)::int as count
      FROM donor_registrations
      WHERE registered_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(registered_at AT TIME ZONE 'Asia/Kolkata')
      ORDER BY date ASC
    `,
  ])

  const statusMap = Object.fromEntries(byStatus.map((s) => [s.status, s._count.id]))
  const bloodGroupMap = Object.fromEntries(byBloodGroup.map((b) => [b.bloodGroup!, b._count.id]))

  return {
    total: totalRegistrations,
    today: todayRegistrations,
    thisWeek: weekRegistrations,
    thisMonth: monthRegistrations,
    confirmed: statusMap['CONFIRMED'] ?? 0,
    attended: statusMap['ATTENDED'] ?? 0,
    donationCompleted: statusMap['DONATION_COMPLETED'] ?? 0,
    cancelled: statusMap['CANCELLED'] ?? 0,
    contacted: statusMap['CONTACTED'] ?? 0,
    registered: statusMap['REGISTERED'] ?? 0,
    byBloodGroup: bloodGroupMap,
    dailyTrend,
  }
}

// ============================================================
// EXPORT REGISTRATIONS
// ============================================================
export async function getRegistrationsForExport(filters: {
  bloodGroup?: string
  status?: string
  dateFrom?: string
  dateTo?: string
}) {
  const where: Record<string, unknown> = {}
  if (filters.bloodGroup && filters.bloodGroup !== 'ALL') where.bloodGroup = filters.bloodGroup
  if (filters.status && filters.status !== 'ALL') where.status = filters.status
  if (filters.dateFrom || filters.dateTo) {
    where.registeredAt = {}
    if (filters.dateFrom) (where.registeredAt as Record<string, Date>).gte = new Date(filters.dateFrom)
    if (filters.dateTo) {
      const endDate = new Date(filters.dateTo)
      endDate.setHours(23, 59, 59, 999)
      ;(where.registeredAt as Record<string, Date>).lte = endDate
    }
  }

  return prisma.donorRegistration.findMany({
    where,
    select: {
      referenceNumber: true,
      fullName: true,
      mobileNumber: true,
      age: true,
      gender: true,
      city: true,
      bloodGroup: true,
      previousDonation: true,
      preferredTimeSlot: true,
      status: true,
      registeredAt: true,
      consentGiven: true,
      marketingConsent: true,
    },
    orderBy: { registeredAt: 'desc' },
  })
}
