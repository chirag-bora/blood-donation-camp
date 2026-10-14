'use client'
import Image from 'next/image'
import { Calendar, Clock, MapPin, Heart, Sparkles, ChevronDown } from 'lucide-react'
import { CAMP_CONFIG } from '@/lib/constants'

export function TemplePamphletHeader() {
  return (
    <header className="relative w-full overflow-hidden bg-gradient-to-b from-[#FFF5F5] via-white to-[#FFF0F0] border-b-4 border-blood-700 shadow-md">
      {/* 1. Divine Top Blessing Header Bar (Red Ribbon from Pamphlet) */}
      <div className="bg-gradient-to-r from-blood-800 via-blood-700 to-blood-800 text-white py-2 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between text-xs sm:text-sm font-bold tracking-wide">
          <span className="flex items-center gap-1 font-hindi text-amber-200">
            🙏 जय गणेश
          </span>
          <div className="text-center flex items-center justify-center gap-2">
            <span className="text-[11px] text-red-200 uppercase tracking-widest hidden sm:inline">जय जबर</span>
            <span className="font-hindi text-base sm:text-lg text-amber-300 font-black tracking-normal">
              🚩 जय माँ उष्ट्रवाहिनी
            </span>
          </div>
          <span className="font-hindi text-amber-200 text-right">
            जय श्री सोमेश्वर गिरी जी महाराज 🙏
          </span>
        </div>
      </div>

      {/* 2. Main Pamphlet Visual Frame */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Actual Pamphlet Image Container with border and glow */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-red-200/80 bg-white group">
          <div className="relative w-full aspect-[16/9] max-h-[460px]">
            <Image
              src="/pamphlet_banner.jpg"
              alt="माँ उष्ट्रवाहिनी रक्तदान शिविर - जोधपुर"
              fill
              priority
              className="object-contain object-center sm:object-cover sm:object-center transition-transform duration-700 group-hover:scale-[1.01]"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Quick Floating Badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-black/60 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>माँ उष्ट्रवाहिनी रक्तदान शिविर 2026</span>
          </div>
        </div>

        {/* 3. Event Highlights Quick Strip */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Date */}
          <div className="bg-white rounded-2xl p-4 border border-red-100 shadow-sm flex items-center gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blood-700 to-blood-800 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blood-700/20">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider block">शिविर दिनांक / Date</span>
              <span className="font-hindi text-base sm:text-lg font-black text-gray-900 block leading-tight">
                {CAMP_CONFIG.dateHindi}
              </span>
            </div>
          </div>

          {/* Time */}
          <div className="bg-white rounded-2xl p-4 border border-red-100 shadow-sm flex items-center gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blood-700 to-blood-800 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blood-700/20">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider block">शिविर समय / Timings</span>
              <span className="text-base sm:text-lg font-black text-gray-900 block leading-tight">
                {CAMP_CONFIG.time}
              </span>
            </div>
          </div>

          {/* Venue */}
          <div className="bg-white rounded-2xl p-4 border border-red-100 shadow-sm flex items-center gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blood-700 to-blood-800 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blood-700/20">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider block">स्थान / Venue</span>
              <span className="font-hindi text-xs sm:text-sm font-bold text-gray-900 block leading-snug">
                {CAMP_CONFIG.venueHindi}
              </span>
            </div>
          </div>
        </div>

        {/* 4. Slogan Ribbon Bar */}
        <div className="mt-4 bg-gradient-to-r from-red-600 via-blood-700 to-blood-900 rounded-2xl p-3.5 sm:p-4 text-white text-center shadow-lg shadow-blood-700/20 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 font-hindi text-lg sm:text-xl font-black text-amber-200">
            <Heart className="w-5 h-5 fill-white text-white animate-heartbeat-bounce" />
            <span>रक्तदान महादान</span>
          </div>
          <span className="hidden sm:inline text-red-300">•</span>
          <p className="font-hindi text-sm sm:text-base font-medium text-white/95">
            "आपका एक कदम, किसी को दे सकता है नया जीवन"
          </p>
        </div>
      </div>
    </header>
  )
}
