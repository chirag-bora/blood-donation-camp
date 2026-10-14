import { Calendar, Clock, MapPin, Phone } from 'lucide-react'
import { CAMP_CONFIG, ORGANIZERS } from '@/lib/constants'

export function CampDetails() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">
            <span className="hindi">शिविर का विवरण</span>
          </h2>
          <p className="section-subtitle">Camp Details</p>
        </div>

        {/* Main detail cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="card text-center hover:shadow-card-hover transition-shadow">
            <div className="w-14 h-14 bg-blood-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-7 h-7 text-blood-700" />
            </div>
            <div className="text-xs font-semibold text-blood-700 uppercase tracking-wider mb-2">दिनांक / Date</div>
            <div className="hindi text-lg font-bold text-gray-900">{CAMP_CONFIG.dateHindi}</div>
            <div className="text-gray-500 text-sm mt-1">{CAMP_CONFIG.date}</div>
          </div>

          <div className="card text-center hover:shadow-card-hover transition-shadow">
            <div className="w-14 h-14 bg-blood-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-7 h-7 text-blood-700" />
            </div>
            <div className="text-xs font-semibold text-blood-700 uppercase tracking-wider mb-2">समय / Time</div>
            <div className="text-lg font-bold text-gray-900">{CAMP_CONFIG.time}</div>
            <div className="hindi text-gray-500 text-sm mt-1">प्रातः से सायं</div>
          </div>

          <div className="card text-center hover:shadow-card-hover transition-shadow">
            <div className="w-14 h-14 bg-blood-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-blood-700" />
            </div>
            <div className="text-xs font-semibold text-blood-700 uppercase tracking-wider mb-2">स्थान / Venue</div>
            <div className="hindi text-base font-bold text-gray-900">{CAMP_CONFIG.venueHindi}</div>
            <a
              href={CAMP_CONFIG.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blood-700 hover:text-blood-800 text-sm mt-2 inline-block underline"
            >
              View on Map →
            </a>
          </div>
        </div>

        {/* Contacts */}
        <div className="bg-blood-50 rounded-2xl p-6 md:p-8" id="contact">
          <div className="flex items-center gap-2 mb-6">
            <Phone className="w-5 h-5 text-blood-700" />
            <h3 className="font-bold text-lg text-gray-900 hindi">संपर्क सूत्र / Contact</h3>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ORGANIZERS.map((org) => (
              <a
                key={org.phone}
                href={`tel:+91${org.phone}`}
                className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-card transition-shadow group"
              >
                <div className="w-10 h-10 bg-blood-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{org.name}</div>
                  <div className="text-blood-700 text-sm font-mono group-hover:text-blood-800">{org.display}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
