import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getRegistrations } from '@/lib/registration'
import { DonorsClient } from '@/components/admin/DonorsClient'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: Promise<{
    search?: string
    bloodGroup?: string
    status?: string
    page?: string
  }>
}

export default async function DonorsPage({ searchParams }: Props) {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const params = await searchParams
  const page = params.page ? parseInt(params.page) : 1
  const search = params.search || ''
  const bloodGroup = params.bloodGroup || 'ALL'
  const status = params.status || 'ALL'

  let data: any = { registrations: [], total: 0, totalPages: 1, page: 1, pageSize: 20 }
  try {
    data = await getRegistrations({
      search,
      bloodGroup,
      status,
      page,
      pageSize: 20,
    })
  } catch (e) {
    console.error('Error fetching donors:', e)
  }

  return (
    <div className="p-4 md:p-8 md:pt-8 pt-20">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donor Management</h1>
          <p className="text-gray-500 text-sm mt-1 hindi">पंजीकृत रक्तदाताओं की सूची</p>
        </div>
      </div>

      <DonorsClient initialData={data} initialFilters={{ search, bloodGroup, status, page }} />
    </div>
  )
}
