import { Phone, Users, ShieldCheck } from 'lucide-react'
import { ORGANIZERS } from '@/lib/constants'

export function TempleContactsSection() {
  return (
    <section id="contact" className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blood-800 via-blood-700 to-blood-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1 rounded-full text-xs font-bold text-amber-200 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>शिविर समन्वय समिति / Coordination Team</span>
          </div>
          <h2 className="font-hindi text-2xl sm:text-3xl font-black text-amber-300">
            संपर्क सूत्र
          </h2>
          <p className="text-xs sm:text-sm text-red-100 mt-1">
            किसी भी जानकारी अथवा सहयोग के लिए सीधे आयोजकों से फोन पर संपर्क करें
          </p>
        </div>

        {/* 6 Click-to-call Organizer cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 relative z-10">
          {ORGANIZERS.map((org) => (
            <a
              key={org.phone}
              href={`tel:+91${org.phone}`}
              className="bg-white/95 hover:bg-white text-gray-900 rounded-2xl p-3.5 flex items-center justify-between shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all group"
            >
              <div>
                <div className="font-bold text-sm text-gray-900 group-hover:text-blood-700 transition-colors">
                  {org.name}
                </div>
                <div className="text-xs font-mono font-bold text-blood-700 mt-0.5">
                  {org.display}
                </div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-red-100 group-hover:bg-blood-700 group-hover:text-white text-blood-700 flex items-center justify-center transition-colors flex-shrink-0 shadow-xs">
                <Phone className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-6 pt-4 border-t border-white/15 text-center text-xs text-red-100/80 leading-relaxed font-hindi">
          स्थान: श्री जय नारायण व्यास विद्यालय, जादव मोहल्ला, जोधपुर (राजस्थान) • 18 अक्टूबर 2026
        </div>
      </div>
    </section>
  )
}
