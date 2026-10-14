import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getRegistrations } from '@/lib/registration'
import { DonorFiltersSchema } from '@/lib/validation'

export async function GET(request: NextRequest) {
  try {
    await requireAdmin()

    const url = new URL(request.url)
    const params = Object.fromEntries(url.searchParams)
    const parsed = DonorFiltersSchema.safeParse({
      ...params,
      page: params.page ? parseInt(params.page) : 1,
      pageSize: params.pageSize ? parseInt(params.pageSize) : 20,
    })

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 })
    }

    const result = await getRegistrations(parsed.data)
    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[GET /api/admin/donors] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 })
  }
}
