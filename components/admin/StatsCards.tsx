import { Users, UserCheck, Activity, TrendingUp, XCircle, CheckCircle, Calendar, Clock } from 'lucide-react'

interface Stats {
  total: number
  today: number
  thisWeek: number
  thisMonth: number
  confirmed: number
  attended: number
  donationCompleted: number
  cancelled: number
  contacted: number
  registered: number
  byBloodGroup: Record<string, number>
  dailyTrend: { date: string; count: number }[]
}

const BLOOD_GROUP_DISPLAY: Record<string, string> = {
  A_POSITIVE: 'A+', A_NEGATIVE: 'A-', B_POSITIVE: 'B+', B_NEGATIVE: 'B-',
  AB_POSITIVE: 'AB+', AB_NEGATIVE: 'AB-', O_POSITIVE: 'O+', O_NEGATIVE: 'O-', UNKNOWN: '?',
}

export function StatsCards({ stats }: { stats: Stats }) {
  const cards = [
    { icon: Users, label: 'Total Registrations', value: stats.total, color: 'blue', sub: 'All time' },
    { icon: Calendar, label: 'Today', value: stats.today, color: 'green', sub: 'New registrations' },
    { icon: Clock, label: 'This Week', value: stats.thisWeek, color: 'purple', sub: 'Last 7 days' },
    { icon: TrendingUp, label: 'This Month', value: stats.thisMonth, color: 'orange', sub: 'Current month' },
    { icon: UserCheck, label: 'Confirmed', value: stats.confirmed, color: 'emerald', sub: 'Confirmed donors' },
    { icon: Activity, label: 'Attended', value: stats.attended, color: 'indigo', sub: 'Camp attendance' },
    { icon: CheckCircle, label: 'Donations Completed', value: stats.donationCompleted, color: 'teal', sub: 'Verified donations' },
    { icon: XCircle, label: 'Cancelled', value: stats.cancelled, color: 'red', sub: 'Cancelled registrations' },
  ]

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    indigo: 'bg-indigo-100 text-indigo-700',
    teal: 'bg-teal-100 text-teal-700',
    red: 'bg-red-100 text-red-700',
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="card hover:shadow-card-hover transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorMap[card.color]}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-gray-900">{card.value.toLocaleString()}</div>
            <div className="text-sm font-semibold text-gray-700 mt-0.5">{card.label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Blood group summary */}
      {Object.keys(stats.byBloodGroup).length > 0 && (
        <div className="card">
          <h3 className="font-bold text-gray-900 mb-3">Blood Group Summary</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.byBloodGroup)
              .sort(([, a], [, b]) => b - a)
              .map(([group, count]) => (
                <div key={group} className="flex items-center gap-2 bg-blood-50 rounded-xl px-3 py-2">
                  <span className="font-black text-blood-700">{BLOOD_GROUP_DISPLAY[group] ?? group}</span>
                  <span className="text-gray-600 font-semibold">{count}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
