import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getDashboardStats } from '@/lib/registration'

export async function GET() {
  try {
    await requireAdmin()
    const stats = await getDashboardStats()
    return NextResponse.json({ success: true, stats })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[GET /api/admin/stats] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 })
  }
}
