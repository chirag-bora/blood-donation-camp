import { getDashboardStats } from '@/lib/registration'
import { StatsCards } from '@/components/admin/StatsCards'
import { BloodGroupChart } from '@/components/charts/BloodGroupChart'
import { RegistrationTrendChart } from '@/components/charts/RegistrationTrendChart'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  let stats = null
  let error = null
  try {
    stats = await getDashboardStats()
  } catch (e) {
    error = 'Failed to load statistics. Please check the database connection.'
    console.error('Dashboard stats error:', e)
  }

  return (
    <div className="p-4 md:p-8 md:pt-8 pt-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1 hindi">रक्तदान शिविर — Registration Overview</p>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700">
          <p className="font-semibold">⚠️ Database Error</p>
          <p className="text-sm mt-1">{error}</p>
          <p className="text-xs mt-2 text-red-500">Ensure your DATABASE_URL is configured and the database is running.</p>
        </div>
      ) : stats ? (
        <>
          <StatsCards stats={stats} />

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="card">
              <h2 className="font-bold text-gray-900 mb-4">Blood Group Distribution</h2>
              <BloodGroupChart data={stats.byBloodGroup} />
            </div>
            <div className="card">
              <h2 className="font-bold text-gray-900 mb-4">Registrations (Last 30 Days)</h2>
              <RegistrationTrendChart data={stats.dailyTrend} />
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
