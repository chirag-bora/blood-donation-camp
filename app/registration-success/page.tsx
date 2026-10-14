import Link from 'next/link'
import { Metadata } from 'next'
import { CheckCircle2, Calendar, Clock, MapPin, Phone, Heart, Share2, ArrowRight } from 'lucide-react'
import { CAMP_CONFIG, ORGANIZERS } from '@/lib/constants'
import { SuccessActions } from '@/components/registration/SuccessActions'

export const metadata: Metadata = {
  title: 'पंजीकरण सफल रहा! | Registration Successful',
  robots: { index: false, follow: false },
}

interface Props {
  searchParams: Promise<{ ref?: string; name?: string }>
}

export default async function SuccessPage({ searchParams }: Props) {
  const params = await searchParams
  const ref = params.ref || 'RD-2026-PENDING'
  const name = params.name ? decodeURIComponent(params.name) : 'रक्तदाता'

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50/80 via-white to-red-50/40 py-10 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-lg w-full space-y-6">
        {/* Main Success Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-red-100 text-center relative overflow-hidden">
          {/* Subtle top red ribbon */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blood-700 via-blood-600 to-blood-800" />

          {/* Celebratory Icon */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4 mt-2">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-60" style={{ animationDuration: '2.5s' }} />
            <div className="relative w-16 h-16 bg-gradient-to-tr from-blood-700 to-blood-900 rounded-full flex items-center justify-center shadow-lg shadow-blood-700/30">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
          </div>

          <h1 className="hindi text-2xl sm:text-3xl font-black text-gray-900 mb-1.5">
            आपका पंजीकरण सफल रहा! ❤️
          </h1>

          <p className="text-blood-700 font-bold text-base mb-2">
            नमस्कार, {name}!
          </p>

          <p className="hindi text-sm text-gray-600 leading-relaxed mb-6">
            रक्तदान के इस महादान अभियान में सहभागिता दर्शाने के लिए आपका कोटि-कोटि धन्यवाद।
            आपकी यह एक पहल किसी जरूरतमंद को नया जीवन दे सकती है।
          </p>

          {/* Reference Badge */}
          <div className="bg-blood-50/70 border border-blood-200 rounded-2xl p-4 mb-6">
            <span className="text-[11px] font-bold text-blood-700 uppercase tracking-widest block mb-1">
              पंजीकरण संदर्भ क्रमांक / Registration ID
            </span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-blood-900 tracking-wider">
              {ref}
            </span>
            <span className="text-xs text-gray-500 block mt-1 hindi">
              (यह विवरण आयोजकों की गूगल शीट में स्वतः दर्ज हो चुका है)
            </span>
          </div>

          {/* Quick Camp Details Card */}
          <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-2.5 text-xs sm:text-sm text-gray-700 mb-6 border border-gray-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blood-700 flex-shrink-0" />
              <span className="font-semibold hindi">{CAMP_CONFIG.dateHindi}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blood-700 flex-shrink-0" />
              <span>{CAMP_CONFIG.time}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blood-700 flex-shrink-0 mt-0.5" />
              <span className="hindi leading-tight">{CAMP_CONFIG.venueHindi}</span>
            </div>
          </div>

          {/* Medical Disclaimer Note */}
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-left mb-6 text-xs text-amber-900 leading-relaxed">
            <strong>⚠️ महत्वपूर्ण सूचना:</strong> यह ऑनलाइन फॉर्म रुचि का पंजीकरण है।
            रक्तदान से पूर्व हीमोग्लोबिन, ब्लड प्रेशर व सामान्य स्वास्थ्य जांच शिविर में अधिकृत
            चिकित्सकों द्वारा की जाएगी।
          </div>

          {/* Action Buttons: Save / Print Pass & Home */}
          <SuccessActions />
        </div>

        {/* Organizer Quick Contacts Card */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-red-50">
          <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center justify-between">
            <span className="hindi">किसी भी सहायता के लिए संपर्क करें</span>
            <span className="text-xs text-blood-700 font-semibold">Organizers</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {ORGANIZERS.map((org) => (
              <a
                key={org.phone}
                href={`tel:+91${org.phone}`}
                className="flex items-center justify-between p-2.5 bg-red-50/50 hover:bg-red-100/70 rounded-xl text-gray-800 transition-colors"
              >
                <span className="font-semibold">{org.name}</span>
                <span className="font-mono text-blood-700 font-bold">{org.display}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-blood-700 font-medium transition-colors"
          >
            <span>← मुख्य पृष्ठ पर वापस जाएं (Back to Home)</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
