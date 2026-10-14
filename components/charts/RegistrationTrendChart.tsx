'use client'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DataPoint {
  date: string
  count: number
}

export function RegistrationTrendChart({ data }: { data: DataPoint[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
        No registration data available yet.
      </div>
    )
  }

  const formatted = data.map((d) => ({
    date: new Date(d.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    count: d.count,
  }))

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={formatted} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: '1px solid #fee2e2', fontSize: 12 }}
          formatter={(value) => [value, 'Registrations']}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#D71920"
          strokeWidth={2}
          fill="#fff1f1"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
