import Link from 'next/link'
import { Heart, Phone, Calendar, MapPin } from 'lucide-react'
import { CAMP_CONFIG, ORGANIZERS } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blood-700 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <div>
                <div className="text-white font-bold hindi">रक्तदान शिविर</div>
                <div className="text-xs text-gray-400">Blood Donation Camp 2026</div>
              </div>
            </div>
            <p className="hindi text-sm text-gray-400 leading-relaxed">
              एक स्वैच्छिक रक्तदान शिविर, जोधपुर, राजस्थान।
            </p>
          </div>

          {/* Event Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Event Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blood-400 flex-shrink-0" />
                <span className="hindi">{CAMP_CONFIG.dateHindi}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 flex-shrink-0">🕘</span>
                <span>{CAMP_CONFIG.time}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blood-400 flex-shrink-0 mt-0.5" />
                <span className="hindi">{CAMP_CONFIG.venueHindi}</span>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-semibold mb-4 hindi">संपर्क / Contact</h4>
            <div className="space-y-2">
              {ORGANIZERS.slice(0, 3).map((org) => (
                <a
                  key={org.phone}
                  href={`tel:+91${org.phone}`}
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors group"
                >
                  <Phone className="w-3.5 h-3.5 text-blood-400" />
                  <span>{org.name} — {org.display}</span>
                </a>
              ))}
              {ORGANIZERS.slice(3).map((org) => (
                <a
                  key={org.phone}
                  href={`tel:+91${org.phone}`}
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-blood-400" />
                  <span>{org.name} — {org.display}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Blood Donation Camp, Jodhpur. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/register" className="hover:text-gray-300 transition-colors">Register</Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-xs text-gray-500 border-t border-gray-800 pt-4">
          <strong className="text-gray-400">Disclaimer:</strong> This website is for registration of interest only. Submitting this form does not guarantee eligibility for blood donation. Medical eligibility will be assessed by qualified personnel at the camp. Contact organizers for queries.
        </div>
      </div>
    </footer>
  )
}
