'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Heart } from 'lucide-react'

export function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/', label: 'Home' },
    { href: '#register-section', label: 'Register' },
    { href: '#about', label: 'Camp Details' },
    { href: '/qr', label: '📱 Print QR' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-red-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-blood-700 rounded-full flex items-center justify-center group-hover:bg-blood-800 transition-colors">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <div className="text-blood-700 font-bold text-sm leading-tight hindi">रक्तदान शिविर</div>
              <div className="text-gray-500 text-xs leading-tight">Blood Donation Camp</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blood-700 hover:bg-blood-50 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="ml-2 btn-primary text-sm px-5 py-2"
            >
              Register as Donor
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-blood-50 hover:text-blood-700 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-red-50 bg-white pb-4 px-4">
          <div className="flex flex-col gap-1 pt-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-blood-700 hover:bg-blood-50 rounded-xl transition-all"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="mt-2 btn-primary text-center text-sm"
              onClick={() => setOpen(false)}
            >
              Register as Donor
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
