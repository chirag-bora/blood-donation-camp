'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Download, Eye, Edit3, Filter, RefreshCw } from 'lucide-react'
import { BLOOD_GROUP_LABELS, STATUS_LABELS } from '@/lib/constants'

interface Registration {
  id: string
  referenceNumber: string
  fullName: string
  mobileNumber: string
  age?: number | null
  bloodGroup?: string | null
  status: string
  registeredAt: Date | string
  isDuplicate: boolean
  city?: string | null
}

interface DonorsClientProps {
  initialData: {
    registrations: Registration[]
    total: number
    totalPages: number
    page: number
    pageSize: number
  }
  initialFilters: {
    search: string
    bloodGroup: string
    status: string
    page: number
  }
}

export function DonorsClient({ initialData, initialFilters }: DonorsClientProps) {
  const router = useRouter()
  const [search, setSearch] = useState(initialFilters.search)
  const [bloodGroup, setBloodGroup] = useState(initialFilters.bloodGroup)
  const [status, setStatus] = useState(initialFilters.status)
  const [selectedDonor, setSelectedDonor] = useState<Registration | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [statusNotes, setStatusNotes] = useState('')

  function handleFilterSubmit(e: React.FormEvent) {
    e.preventDefault()
    const query = new URLSearchParams()
    if (search) query.set('search', search)
    if (bloodGroup && bloodGroup !== 'ALL') query.set('bloodGroup', bloodGroup)
    if (status && status !== 'ALL') query.set('status', status)
    query.set('page', '1')
    router.push(`/admin/donors?${query.toString()}`)
  }

  function handleReset() {
    setSearch('')
    setBloodGroup('ALL')
    setStatus('ALL')
    router.push('/admin/donors')
  }

  async function handleStatusUpdate(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedDonor || !newStatus) return
    setIsUpdating(true)
    try {
      const res = await fetch(`/api/admin/donors/${selectedDonor.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes: statusNotes }),
      })
      if (res.ok) {
        setSelectedDonor(null)
        router.refresh()
      } else {
        alert('Failed to update status')
      }
    } catch {
      alert('Network error')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls / Filter Bar */}
      <div className="card">
        <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, ref..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input pl-9"
            />
          </div>

          <div>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="form-input"
            >
              <option value="ALL">All Blood Groups</option>
              {Object.entries(BLOOD_GROUP_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-input"
            >
              <option value="ALL">All Statuses</option>
              {Object.entries(STATUS_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-1">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button type="button" onClick={handleReset} className="btn-secondary px-3" title="Reset Filters">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Export Buttons */}
        <div className="mt-4 pt-4 border-t flex flex-wrap justify-between items-center gap-4 text-sm text-gray-500">
          <div>Total records found: <strong className="text-gray-900">{initialData.total}</strong></div>
          <div className="flex gap-2">
            <a
              href={`/api/admin/export?format=csv&bloodGroup=${bloodGroup}&status=${status}&search=${encodeURIComponent(search)}`}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 font-medium text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </a>
            <a
              href={`/api/admin/export?format=excel&bloodGroup=${bloodGroup}&status=${status}&search=${encodeURIComponent(search)}`}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-green-200 bg-green-50 rounded-lg hover:bg-green-100 text-green-800 font-medium text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export Excel
            </a>
          </div>
        </div>
      </div>

      {/* Donors Table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b">
              <tr>
                <th className="py-3 px-4">Ref No.</th>
                <th className="py-3 px-4">Donor Name</th>
                <th className="py-3 px-4">Mobile</th>
                <th className="py-3 px-4">Blood Group</th>
                <th className="py-3 px-4">Age</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Registered On</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {initialData.registrations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-400">
                    No donor records found.
                  </td>
                </tr>
              ) : (
                initialData.registrations.map((donor) => {
                  const stat = STATUS_LABELS[donor.status] || { label: donor.status, color: 'gray' }
                  return (
                    <tr key={donor.id} className="hover:bg-red-50/30 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-xs text-blood-700">
                        {donor.referenceNumber}
                        {donor.isDuplicate && (
                          <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-amber-100 text-amber-800 rounded font-sans">Duplicate</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">{donor.fullName}</td>
                      <td className="py-3 px-4 font-mono">{donor.mobileNumber}</td>
                      <td className="py-3 px-4 font-bold text-gray-800">
                        {BLOOD_GROUP_LABELS[donor.bloodGroup || ''] || donor.bloodGroup || '-'}
                      </td>
                      <td className="py-3 px-4">{donor.age || '-'}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2.5 py-1 text-xs rounded-full font-medium ${
                          donor.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                          donor.status === 'DONATION_COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                          donor.status === 'ATTENDED' ? 'bg-purple-100 text-purple-800' :
                          donor.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-800' :
                          donor.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {stat.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-gray-400">
                        {new Date(donor.registeredAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedDonor(donor)
                            setNewStatus(donor.status)
                            setStatusNotes('')
                          }}
                          className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-blood-700 transition-colors"
                          title="Update Status"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {initialData.totalPages > 1 && (
          <div className="p-4 border-t flex justify-between items-center text-sm">
            <span className="text-gray-500">
              Page {initialData.page} of {initialData.totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={initialData.page <= 1}
                onClick={() => {
                  const query = new URLSearchParams()
                  if (search) query.set('search', search)
                  if (bloodGroup) query.set('bloodGroup', bloodGroup)
                  if (status) query.set('status', status)
                  query.set('page', String(initialData.page - 1))
                  router.push(`/admin/donors?${query.toString()}`)
                }}
                className="btn-secondary py-1.5 px-3 text-xs disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={initialData.page >= initialData.totalPages}
                onClick={() => {
                  const query = new URLSearchParams()
                  if (search) query.set('search', search)
                  if (bloodGroup) query.set('bloodGroup', bloodGroup)
                  if (status) query.set('status', status)
                  query.set('page', String(initialData.page + 1))
                  router.push(`/admin/donors?${query.toString()}`)
                }}
                className="btn-secondary py-1.5 px-3 text-xs disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Update Status Modal */}
      {selectedDonor && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="card max-w-md w-full bg-white animate-in fade-in zoom-in-95 duration-150">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Update Donor Status</h2>
            <p className="text-sm text-gray-500 mb-4">
              {selectedDonor.fullName} ({selectedDonor.referenceNumber})
            </p>

            <form onSubmit={handleStatusUpdate} className="space-y-4">
              <div>
                <label className="form-label">New Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="form-input"
                  required
                >
                  <option value="REGISTERED">Registered</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="ATTENDED">Attended</option>
                  <option value="DONATION_COMPLETED">Donation Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="form-label">Internal Notes (Optional)</label>
                <textarea
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  placeholder="Notes about phone confirmation, eligibility, etc."
                  className="form-input min-h-[80px]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedDonor(null)}
                  disabled={isUpdating}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="btn-primary flex-1"
                >
                  {isUpdating ? 'Saving...' : 'Save Status'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
