import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getRegistrationsForExport } from '@/lib/registration'
import { generateCSV, generateExcel } from '@/lib/export'

export async function GET(request: NextRequest) {
  try {
    await requireAdmin()

    const url = new URL(request.url)
    const format = url.searchParams.get('format') || 'csv'
    const bloodGroup = url.searchParams.get('bloodGroup') || undefined
    const status = url.searchParams.get('status') || undefined
    const dateFrom = url.searchParams.get('dateFrom') || undefined
    const dateTo = url.searchParams.get('dateTo') || undefined

    const rows = await getRegistrationsForExport({ bloodGroup, status, dateFrom, dateTo })

    const timestamp = new Date().toISOString().split('T')[0]

    if (format === 'excel') {
      const buffer = generateExcel(rows)
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="donor-registrations-${timestamp}.xlsx"`,
          'Cache-Control': 'no-store',
        },
      })
    } else {
      const csv = generateCSV(rows)
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="donor-registrations-${timestamp}.csv"`,
          'Cache-Control': 'no-store',
        },
      })
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[GET /api/admin/export] Error:', error)
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}
