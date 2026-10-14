import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, MapPin, Heart, ChevronDown, Sparkles } from 'lucide-react'
import { CAMP_CONFIG } from '@/lib/constants'
import { BloodDropSVG } from '@/components/ui/BloodDropSVG'

export function Hero() {
  return (
    <section id="home" className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden bg-gradient-to-b from-red-50/80 via-white to-red-50/30">
      {/* Decorative background circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-red-200/40 to-blood-100/30 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Blessing Line from pamphlet */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white/90 border border-red-100 px-4 py-1.5 rounded-full shadow-xs text-xs sm:text-sm text-gray-700 font-medium">
            <span className="text-blood-700 font-bold">जय गणेश</span>
            <span className="text-gray-300">•</span>
            <span className="hindi font-semibold text-blood-800">जय माँ उष्ट्रवाहिनी</span>
            <span className="text-gray-300">•</span>
            <span className="hindi text-gray-600">जय श्री सोमेश्वर गिरी जी महाराज</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Live Campaign Pill */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blood-700 to-blood-900 text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-md mb-6">
              <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
              <span>18 अक्टूबर 2026, रविवार — जोधपुर शिविर</span>
            </div>

            {/* Main Emotional Headline */}
            <h1 className="hindi text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.15] mb-4">
              रक्तदान <span className="bg-gradient-to-r from-blood-700 via-blood-600 to-blood-800 bg-clip-text text-transparent">महादान ❤️</span>
            </h1>

            {/* Emotional Punchlines from Pamphlet */}
            <div className="bg-blood-50/80 border-l-4 border-blood-700 p-4 rounded-r-2xl mb-6 text-left max-w-xl mx-auto lg:mx-0">
              <p className="hindi text-lg sm:text-xl font-bold text-blood-900 leading-snug">
                "आपका एक कदम, किसी को दे सकता है नया जीवन।"
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Your one voluntary blood donation can be the lifeline someone is praying for.
              </p>
            </div>

            {/* Event Summary Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-red-100 shadow-sm mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-100 text-blood-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase text-gray-400">दिनांक / Date</div>
                  <div className="hindi text-sm font-bold text-gray-900">{CAMP_CONFIG.dateHindi}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-100 text-blood-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase text-gray-400">समय / Time</div>
                  <div className="text-sm font-bold text-gray-900">{CAMP_CONFIG.time}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-100 text-blood-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase text-gray-400">स्थान / Venue</div>
                  <div className="hindi text-xs font-bold text-gray-900 leading-tight">श्री जय नारायण व्यास विद्यालय, जोधपुर</div>
                </div>
              </div>
            </div>

            {/* Quick Action Anchor Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#register-section"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blood-700 via-blood-600 to-blood-800 text-white font-extrabold text-lg sm:text-xl shadow-xl shadow-blood-700/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
              >
                <Heart className="w-6 h-6 fill-white text-white group-hover:scale-125 transition-transform" />
                <span className="hindi">मैं रक्तदान करना चाहता/चाहती हूँ</span>
              </a>

              <Link
                href="/qr"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-white border-2 border-red-200 text-blood-800 font-bold hover:bg-red-50 transition-all text-sm sm:text-base"
              >
                <span>📱 पैम्फलेट QR कोड / Print QR</span>
              </Link>
            </div>
          </div>

          {/* Right Visual Column: Blood Drop Illustration & Pamphlet Badge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              <div className="absolute inset-2 bg-gradient-to-b from-red-200/50 to-blood-200/40 rounded-full animate-pulse-slow" />
              <BloodDropSVG className="w-full h-full drop-shadow-2xl relative z-10 animate-float" />

              {/* Float Card 1: 100% Voluntary */}
              <div className="absolute -top-3 right-0 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-red-100 flex items-center gap-2 z-20">
                <span className="text-xl">🩸</span>
                <div>
                  <div className="text-xs font-bold text-gray-900">100% स्वैच्छिक</div>
                  <div className="text-[10px] text-gray-500">Voluntary Camp</div>
                </div>
              </div>

              {/* Float Card 2: Safe & Certified */}
              <div className="absolute -bottom-2 left-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-red-100 flex items-center gap-2 z-20">
                <span className="text-xl">🩺</span>
                <div>
                  <div className="text-xs font-bold text-gray-900">प्रशिक्षित चिकित्सा दल</div>
                  <div className="text-[10px] text-blood-700 font-semibold">Certified Blood Bank</div>
                </div>
              </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="mt-6 text-center">
              <a
                href="#register-section"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blood-700 transition-colors"
              >
                <span>सीधे पंजीकरण फॉर्म पर जाएं</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
