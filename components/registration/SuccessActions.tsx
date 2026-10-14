'use client'
import Link from 'next/link'
import { Printer } from 'lucide-react'

export function SuccessActions() {
  return (
    <div className="flex gap-3">
      <Link href="/" className="btn-secondary flex-1 text-center">
        ← Home
      </Link>
      <button
        type="button"
        onClick={() => window.print()}
        className="btn-primary flex-1 flex items-center justify-center gap-2"
      >
        <Printer className="w-4 h-4" /> Save / Print
      </button>
    </div>
  )
}
