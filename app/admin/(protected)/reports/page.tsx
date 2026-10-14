import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getDashboardStats } from '@/lib/registration'
import { BloodGroupChart } from '@/components/charts/BloodGroupChart'
import { RegistrationTrendChart } from '@/components/charts/RegistrationTrendChart'
import { CAMP_CONFIG } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export default async function ReportsPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  let stats = null
  try {
    stats = await getDashboardStats()
  } catch (e) {
    console.error(e)
  }

  return (
    <div className="p-4 md:p-8 md:pt-8 pt-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-500 text-sm mt-1 hindi">भविष्य के शिविरों के लिए पंजीकरण और उपस्थिति का विश्लेषण</p>
      </div>

      {stats ? (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="text-xs uppercase text-gray-400 font-semibold mb-1">Conversion / Attended</div>
              <div className="text-3xl font-black text-blood-700">
                {stats.total > 0 ? ((stats.attended / stats.total) * 100).toFixed(1) : 0}%
              </div>
              <p className="text-xs text-gray-500 mt-1">{stats.attended} of {stats.total} donors attended</p>
            </div>

            <div className="card text-center">
              <div className="text-xs uppercase text-gray-400 font-semibold mb-1">Successful Donations</div>
              <div className="text-3xl font-black text-emerald-600">
                {stats.attended > 0 ? ((stats.donationCompleted / stats.attended) * 100).toFixed(1) : 0}%
              </div>
              <p className="text-xs text-gray-500 mt-1">{stats.donationCompleted} completed of {stats.attended} attendees</p>
            </div>

            <div className="card text-center">
              <div className="text-xs uppercase text-gray-400 font-semibold mb-1">Cancellation Rate</div>
              <div className="text-3xl font-black text-gray-700">
                {stats.total > 0 ? ((stats.cancelled / stats.total) * 100).toFixed(1) : 0}%
              </div>
              <p className="text-xs text-gray-500 mt-1">{stats.cancelled} cancellations</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h2 className="font-bold text-gray-900 mb-4">Blood Inventory Forecast</h2>
              <BloodGroupChart data={stats.byBloodGroup} />
            </div>
            <div className="card">
              <h2 className="font-bold text-gray-900 mb-4">Registration Momentum</h2>
              <RegistrationTrendChart data={stats.dailyTrend} />
            </div>
          </div>
        </div>
      ) : (
        <div className="card text-gray-500 text-center py-10">No report data available yet.</div>
      )}
    </div>
  )
}
