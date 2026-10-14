import { PrismaClient, AdminRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Seed camp settings
  const settings = [
    { key: 'camp_name', value: 'रक्तदान शिविर', description: 'Camp name in Hindi' },
    { key: 'camp_name_en', value: 'Blood Donation Camp', description: 'Camp name in English' },
    { key: 'camp_date', value: '2026-10-18', description: 'Camp date (ISO format)' },
    { key: 'camp_date_display', value: '18 October 2026, Sunday', description: 'Display date in English' },
    { key: 'camp_date_hindi', value: '18 अक्टूबर 2026, रविवार', description: 'Display date in Hindi' },
    { key: 'camp_time', value: '9:00 AM – 5:00 PM', description: 'Camp timings' },
    { key: 'camp_venue', value: 'Shri Jai Narayan Vyas Vidyalaya, Jadav Mohalla, Jodhpur, Rajasthan', description: 'Venue in English' },
    { key: 'camp_venue_hindi', value: 'श्री जय नारायण व्यास विद्यालय, जादव मोहल्ला, जोधपुर', description: 'Venue in Hindi' },
    { key: 'camp_map_url', value: 'https://maps.google.com/?q=Shri+Jai+Narayan+Vyas+Vidyalaya+Jodhpur', description: 'Google Maps URL' },
    { key: 'consent_policy_version', value: '1.0', description: 'Current consent policy version' },
    { key: 'data_retention_months', value: '24', description: 'Data retention period in months' },
  ]

  for (const setting of settings) {
    await prisma.campSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value, description: setting.description },
      create: setting,
    })
  }
  console.log('✅ Camp settings seeded')

  // Seed admin user
  const adminEmail = process.env.ADMIN_SEED_EMAIL || 'admin@blooddonate.local'
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'ChangeThisPassword@123'
  
  if (!adminPassword || adminPassword === 'ChangeThisPassword@123') {
    console.warn('⚠️  WARNING: Using default admin password. Set ADMIN_SEED_PASSWORD environment variable for production.')
  }

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  })

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12)
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: 'System Administrator',
        role: AdminRole.SUPER_ADMIN,
        isActive: true,
      },
    })
    console.log(`✅ Admin user created: ${adminEmail}`)
    console.log('⚠️  IMPORTANT: Change the admin password immediately after first login!')
  } else {
    console.log(`ℹ️  Admin user already exists: ${adminEmail}`)
  }

  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
