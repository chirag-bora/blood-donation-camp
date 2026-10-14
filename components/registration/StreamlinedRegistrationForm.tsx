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
  Sparkles,
  Droplet,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']

export function StreamlinedRegistrationForm() {
  const router = useRouter()

  const [fullName, setFullName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [age, setAge] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [city, setCity] = useState('')
  const [previousDonation, setPreviousDonation] = useState<'Yes' | 'No' | 'Prefer not to say'>('Prefer not to say')
  const [consentGiven, setConsentGiven] = useState(false)

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage('')

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('कृपया अपना पूरा नाम लिखें (कम से कम 2 अक्षर)।')
      return
    }

    const cleanPhone = mobileNumber.replace(/[^0-9]/g, '')
    if (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      setErrorMessage('कृपया मान्य 10 अंकों का भारतीय मोबाइल नंबर दर्ज करें (6, 7, 8 या 9 से शुरू)।')
      return
    }

    const numAge = parseInt(age, 10)
    if (isNaN(numAge) || numAge < 18 || numAge > 65) {
      setErrorMessage('रक्तदान के लिए आयु 18 से 65 वर्ष के बीच होनी चाहिए।')
      return
    }

    if (!consentGiven) {
      setErrorMessage('पंजीकरण पूर्ण करने के लिए कृपया सहमति बॉक्स को चेक करें।')
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
      setErrorMessage('नेटवर्क समस्या! कृपया अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="register" className="relative w-full max-w-2xl mx-auto scroll-mt-6">
      {/* Glow aura background */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-blood-600 via-amber-500 to-blood-800 rounded-[32px] blur-md opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse-glow" />

      {/* Main Container Card */}
      <div className="relative bg-white rounded-[28px] shadow-2xl border-2 border-red-100 overflow-hidden">
        {/* Form Card Header Banner */}
        <div className="bg-gradient-to-r from-blood-800 via-blood-700 to-blood-800 p-6 sm:p-7 text-white text-center relative">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-amber-200 mb-2 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>1-मिनट त्वरित पंजीकरण / Quick Registration</span>
          </div>

          <h2 className="font-hindi text-2xl sm:text-3xl font-black tracking-tight text-white">
            रक्तदाता पंजीकरण फॉर्म
          </h2>
          <p className="text-xs sm:text-sm text-red-100 mt-1">
            माँ उष्ट्रवाहिनी रक्तदान शिविर — 18 अक्टूबर 2026, जोधपुर
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6" noValidate>
          {/* Full Name */}
          <div className="group">
            <label className="block text-sm font-bold text-gray-800 mb-1.5">
              <span className="font-hindi">पूरा नाम</span> / Full Name <span className="text-blood-700">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blood-700/60 group-focus-within:text-blood-700 transition-colors">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="अपना पूरा नाम लिखें (e.g. राहुल शर्मा)"
                className="w-full pl-11 pr-4 py-3.5 bg-red-50/20 border-2 border-gray-200 focus:border-blood-700 focus:bg-white rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blood-700/10 transition-all font-medium text-base"
              />
            </div>
          </div>

          {/* Mobile & Age Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mobile Number */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-800 mb-1.5">
                <span className="font-hindi">मोबाइल नंबर</span> / Mobile <span className="text-blood-700">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-600 font-bold text-sm">
                  +91
                </div>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  inputMode="numeric"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="10 अंकों का नंबर"
                  className="w-full pl-12 pr-4 py-3.5 bg-red-50/20 border-2 border-gray-200 focus:border-blood-700 focus:bg-white rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blood-700/10 transition-all font-mono text-base font-semibold"
                />
              </div>
            </div>

            {/* Age */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-800 mb-1.5">
                <span className="font-hindi">आयु</span> / Age (18–65 वर्ष) <span className="text-blood-700">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blood-700/60 group-focus-within:text-blood-700 transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>
                <input
                  type="number"
                  min={18}
                  max={65}
                  required
                  inputMode="numeric"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="आपकी उम्र (Years)"
                  className="w-full pl-11 pr-4 py-3.5 bg-red-50/20 border-2 border-gray-200 focus:border-blood-700 focus:bg-white rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blood-700/10 transition-all text-base font-medium"
                />
              </div>
            </div>
          </div>

          {/* Blood Group Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-bold text-gray-800">
                <span className="font-hindi">रक्त समूह</span> / Blood Group{' '}
                <span className="text-xs font-normal text-gray-400">(Optional)</span>
              </label>
              <span className="text-xs text-blood-700 font-bold flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-md">
                <Droplet className="w-3.5 h-3.5 fill-blood-700" />
                {bloodGroup ? `चयनित: ${bloodGroup}` : 'पता नहीं होने पर Unknown चुनें'}
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {BLOOD_GROUPS.map((bg) => {
                const isSelected = bloodGroup === bg
                return (
                  <button
                    type="button"
                    key={bg}
                    onClick={() => setBloodGroup(isSelected ? '' : bg)}
                    className={`py-3 px-2 rounded-2xl font-black text-sm transition-all duration-200 flex items-center justify-center border-2 cursor-pointer ${
                      isSelected
                        ? 'bg-blood-700 border-blood-700 text-white shadow-lg shadow-blood-700/30 scale-105'
                        : 'bg-white border-red-100 text-gray-700 hover:border-blood-400 hover:bg-red-50/40'
                    }`}
                  >
                    {bg === 'Unknown' ? 'पता नहीं' : bg}
                  </button>
                )
              })}
            </div>
          </div>

          {/* City / Locality (Optional) */}
          <div className="group">
            <label className="block text-sm font-bold text-gray-800 mb-1.5">
              <span className="font-hindi">क्षेत्र / मोहल्ला</span> / City or Locality{' '}
              <span className="text-xs font-normal text-gray-400">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blood-700/60 group-focus-within:text-blood-700 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="जोधपुर में आपका क्षेत्र (e.g. जादव मोहल्ला, पावटा, सूरसागर)"
                className="w-full pl-11 pr-4 py-3.5 bg-red-50/20 border-2 border-gray-200 focus:border-blood-700 focus:bg-white rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blood-700/10 transition-all text-base"
              />
            </div>
          </div>

          {/* Previous Blood Donation */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1.5">
              <span className="font-hindi">क्या आपने पहले कभी रक्तदान किया है?</span> / Donated blood before?
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {(['Yes', 'No', 'Prefer not to say'] as const).map((opt) => {
                const isSelected = previousDonation === opt
                const label = opt === 'Yes' ? 'हाँ (Yes)' : opt === 'No' ? 'नहीं (No)' : 'पहला अनुभव'
                return (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setPreviousDonation(opt)}
                    className={`py-3 px-2 rounded-2xl text-xs sm:text-sm font-bold transition-all border-2 text-center cursor-pointer ${
                      isSelected
                        ? 'bg-blood-100/80 border-blood-700 text-blood-900 ring-2 ring-blood-700/20'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="bg-gradient-to-r from-red-50/90 to-amber-50/50 rounded-2xl p-4 border border-red-200/80">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-1 w-5 h-5 rounded-lg text-blood-700 accent-blood-700 focus:ring-blood-700 flex-shrink-0 cursor-pointer"
              />
              <span className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                <strong className="text-gray-900">स्वेच्छा से सहमति:</strong> मैं इस रक्तदान शिविर हेतु
                पंजीकरण कर रहा/रही हूँ। मेरा डेटा आयोजकों के पास सुरक्षित रहेगा। अंतिम स्वास्थ्य जांच शिविर में चिकित्सकों
                द्वारा की जाएगी।
              </span>
            </label>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="flex items-start gap-2.5 bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-sm text-red-800 animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <span className="font-semibold">{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4.5 px-6 rounded-2xl bg-gradient-to-r from-blood-700 via-blood-600 to-blood-800 hover:from-blood-800 hover:to-blood-900 text-white font-black text-lg sm:text-xl shadow-xl shadow-blood-700/30 hover:shadow-blood-700/50 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="font-hindi">गूगल शीट में सहेजा जा रहा है...</span>
              </>
            ) : (
              <>
                <Heart className="w-6 h-6 fill-white text-white group-hover:scale-125 transition-transform animate-heartbeat-bounce" />
                <span className="font-hindi text-xl">रक्तदान हेतु पंजीकरण करें</span>
                <span className="text-xs sm:text-sm font-semibold opacity-90 hidden sm:inline">
                  (Submit)
                </span>
              </>
            )}
          </button>

          {/* Trust Footer */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>गूगल शीट से सीधे कनेक्टेड • 100% सुरक्षित</span>
          </div>
        </form>
      </div>
    </div>
  )
}
