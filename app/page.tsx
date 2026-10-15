'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Heart,
  User,
  Phone,
  Calendar,
  MapPin,
  AlertCircle,
  Loader2,
  Droplet,
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react'
import { ORGANIZERS, CAMP_CONFIG } from '@/lib/constants'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']

export default function SingleScreenApp() {
  const router = useRouter()

  const [fullName, setFullName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [age, setAge] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [city, setCity] = useState('')
  const [previousDonation, setPreviousDonation] = useState<'Yes' | 'No' | 'Prefer not to say'>('Prefer not to say')
  const [consentGiven, setConsentGiven] = useState(true)

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showContacts, setShowContacts] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage('')

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('कृपया अपना नाम लिखें (कम से कम 2 अक्षर)।')
      return
    }

    const cleanPhone = mobileNumber.replace(/[^0-9]/g, '')
    if (cleanPhone.length > 0 && (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone))) {
      setErrorMessage('यदि मोबाइल नंबर दे रहे हैं, तो मान्य 10 अंकों का नंबर दर्ज करें (6, 7, 8 या 9 से शुरू)।')
      return
    }

    const numAge = parseInt(age, 10)
    if (isNaN(numAge) || numAge < 18 || numAge > 65) {
      setErrorMessage('रक्तदान के लिए आयु 18 से 65 वर्ष के बीच होनी चाहिए।')
      return
    }

    if (!consentGiven) {
      setErrorMessage('पंजीकरण के लिए सहमति देना आवश्यक है।')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          mobileNumber: cleanPhone,
          age: numAge,
          bloodGroup: bloodGroup || 'Unknown',
          city: city.trim(),
          previousDonation,
          consentGiven: true,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        router.push(
          `/registration-success?ref=${encodeURIComponent(result.referenceNumber)}&name=${encodeURIComponent(fullName.trim())}`
        )
      } else {
        setErrorMessage(result.error || 'पंजीकरण सहेजने में विफल। कृपया पुनः प्रयास करें।')
      }
    } catch {
      setErrorMessage('इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#FFFBFB] text-gray-900 flex flex-col justify-between selection:bg-red-500 selection:text-white antialiased">
      {/* 1. Divine Blessing Ribbon (Top Sticky-ish) */}
      <div className="bg-gradient-to-r from-blood-800 via-blood-700 to-blood-800 text-white py-1.5 px-3 text-[11px] sm:text-xs font-semibold shadow-xs">
        <div className="max-w-md mx-auto flex items-center justify-between text-amber-200 font-hindi">
          <span>🙏 जय गणेश</span>
          <span className="font-bold text-white text-[12px] sm:text-sm">🚩 जय माँ उष्ट्रवाहिनी</span>
          <span>जय श्री सोमेश्वर गिरी जी 🙏</span>
        </div>
      </div>

      {/* 2. Main Mobile-First Viewport Container */}
      <div className="flex-1 w-full max-w-md mx-auto px-4 py-4 sm:py-6 flex flex-col justify-center">
        {/* Camp Header Card */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 bg-red-100/90 text-blood-800 text-[11px] font-extrabold px-3 py-1 rounded-full mb-2">
            <span className="w-2 h-2 rounded-full bg-blood-700 animate-ping" />
            <span className="font-hindi">माँ उष्ट्रवाहिनी रक्तदान शिविर 2026</span>
          </div>

          <h1 className="font-hindi text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
            रक्तदान <span className="text-blood-700">महादान ❤️</span>
          </h1>

          <p className="font-hindi text-xs sm:text-sm text-gray-600 mt-1 font-medium">
            "आपका एक कदम, किसी को दे सकता है नया जीवन"
          </p>

          {/* Compact Camp Meta Pill Strip */}
          <div className="mt-3 bg-white border border-red-100 rounded-2xl p-2.5 shadow-sm text-left grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-3.5 h-3.5 text-blood-700 flex-shrink-0" />
              <span className="font-bold font-hindi">18 अक्टूबर 2026, रवि</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-3.5 h-3.5 text-blood-700 flex-shrink-0" />
              <span className="font-medium">9:00 AM – 5:00 PM</span>
            </div>
            <div className="col-span-2 flex items-start gap-2 text-gray-600 text-[11px] pt-1 border-t border-gray-100">
              <MapPin className="w-3.5 h-3.5 text-blood-700 flex-shrink-0 mt-0.5" />
              <span className="font-hindi leading-tight">श्री जय नारायण व्यास विद्यालय, जादव मोहल्ला, जोधपुर</span>
            </div>
          </div>
        </div>

        {/* 3. The Modern Interactive Form Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-red-100 relative overflow-hidden backdrop-blur-sm">
          {/* Subtle top red glow line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blood-700 via-amber-500 to-blood-800" />

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                <span className="font-hindi">पूरा नाम</span> / Full Name <span className="text-blood-700">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blood-700/60">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="अपना नाम लिखें (e.g. राहुल शर्मा)"
                  className="w-full pl-9 pr-3 py-2.5 bg-red-50/20 border border-gray-200 focus:border-blood-700 focus:bg-white rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-3 focus:ring-blood-700/15 transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Mobile Number & Age */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  <span className="font-hindi">मोबाइल नंबर</span> <span className="text-gray-400 font-normal text-[10px]">(ऐच्छिक / Opt)</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-500 font-bold text-xs">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    inputMode="numeric"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="10 अंक (Optional)"
                    className="w-full pl-9 pr-2 py-2.5 bg-red-50/20 border border-gray-200 focus:border-blood-700 focus:bg-white rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-3 focus:ring-blood-700/15 transition-all font-mono text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  <span className="font-hindi">आयु</span> / Age (18–65) <span className="text-blood-700">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blood-700/60">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    min={18}
                    max={65}
                    required
                    inputMode="numeric"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="उम्र (Years)"
                    className="w-full pl-9 pr-2 py-2.5 bg-red-50/20 border border-gray-200 focus:border-blood-700 focus:bg-white rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-3 focus:ring-blood-700/15 transition-all text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Blood Group: Compact Interactive Pills */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700">
                  <span className="font-hindi">रक्त समूह</span> / Blood Group
                </label>
                <span className="text-[11px] text-blood-700 font-bold flex items-center gap-1">
                  <Droplet className="w-3 h-3 fill-blood-700" />
                  {bloodGroup ? `चयनित: ${bloodGroup}` : 'Unknown चुनें'}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5">
                {BLOOD_GROUPS.map((bg) => {
                  const isSelected = bloodGroup === bg
                  return (
                    <button
                      type="button"
                      key={bg}
                      onClick={() => setBloodGroup(isSelected ? '' : bg)}
                      className={`py-2 px-1 rounded-xl font-black text-xs transition-all flex items-center justify-center border cursor-pointer ${
                        isSelected
                          ? 'bg-blood-700 border-blood-700 text-white shadow-md shadow-blood-700/30 scale-105'
                          : 'bg-white border-red-100 text-gray-700 hover:border-blood-300 hover:bg-red-50/40'
                      }`}
                    >
                      {bg === 'Unknown' ? 'पता नहीं' : bg}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Locality & Previous Donation in 2 compact columns */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  <span className="font-hindi">क्षेत्र</span> / Locality <span className="text-[10px] text-gray-400">(Opt)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-blood-700/60">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="जोधपुर क्षेत्र"
                    className="w-full pl-8 pr-2 py-2 bg-red-50/20 border border-gray-200 focus:border-blood-700 focus:bg-white rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blood-700/15 transition-all text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  <span className="font-hindi">पहले रक्तदान?</span>
                </label>
                <div className="flex gap-1">
                  {(['Yes', 'No'] as const).map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setPreviousDonation(opt)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        previousDonation === opt
                          ? 'bg-blood-100 border-blood-700 text-blood-900 font-extrabold'
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {opt === 'Yes' ? 'हाँ' : 'नहीं'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Consent Box */}
            <div className="bg-red-50/50 rounded-xl p-2.5 border border-red-100 text-[11px] text-gray-600 leading-snug">
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-blood-700 accent-blood-700 focus:ring-blood-700 flex-shrink-0 cursor-pointer"
                />
                <span className="font-hindi text-gray-700">
                  <strong>सहमति:</strong> मैं 18 अक्टूबर के शिविर हेतु स्वेच्छा से पंजीकरण कर रहा/रही हूँ।
                </span>
              </label>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-2.5 text-xs text-red-700 font-semibold animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Big Action Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blood-700 via-blood-600 to-blood-800 hover:from-blood-800 hover:to-blood-900 text-white font-extrabold text-base shadow-lg shadow-blood-700/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="font-hindi text-sm">गूगल शीट में सहेजा जा रहा है...</span>
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 fill-white text-white animate-heartbeat-bounce" />
                  <span className="font-hindi text-lg">रक्तदान पंजीकरण करें ❤️</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* 4. Click to View Organizer Contacts */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setShowContacts(!showContacts)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blood-800 hover:text-blood-900 bg-red-100/60 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            <span>📞 आयोजक संपर्क सूत्र (Organizer Contacts)</span>
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showContacts ? 'rotate-90' : ''}`} />
          </button>

          {showContacts && (
            <div className="mt-3 bg-white rounded-2xl p-3 border border-red-100 shadow-md grid grid-cols-2 gap-2 text-left animate-in fade-in zoom-in-95">
              {ORGANIZERS.map((org) => (
                <a
                  key={org.phone}
                  href={`tel:+91${org.phone}`}
                  className="p-2 bg-red-50/50 hover:bg-red-100/70 rounded-xl text-gray-800 transition-colors flex items-center justify-between text-[11px]"
                >
                  <span className="font-bold truncate">{org.name}</span>
                  <span className="font-mono text-blood-700 font-bold ml-1">{org.display}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5. Minimal Footer */}
      <footer className="py-2.5 text-center text-[10px] text-gray-400 border-t border-red-50 bg-white">
        माँ उष्ट्रवाहिनी रक्तदान शिविर • 18 अक्टूबर 2026, जोधपुर
      </footer>
    </main>
  )
}
