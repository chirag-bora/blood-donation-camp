import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { StreamlinedRegistrationForm } from '@/components/registration/StreamlinedRegistrationForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'रक्तदान शिविर पंजीकरण | Blood Donation Camp Registration',
  description: '18 अक्टूबर 2026, रविवार — श्री जय नारायण व्यास विद्यालय, जादव मोहल्ला, जोधपुर। रक्तदान हेतु अपना पंजीकरण करें।',
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50/70 via-white to-red-50/30 flex flex-col justify-between">
      <Navbar />

      <div className="py-10 md:py-14">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <h1 className="hindi text-3xl sm:text-4xl font-black text-gray-900 mb-2">
              रक्तदान शिविर पंजीकरण
            </h1>
            <p className="text-sm text-gray-600">
              18 अक्टूबर 2026, रविवार • जोधपुर, राजस्थान
            </p>
          </div>

          <StreamlinedRegistrationForm />
        </div>
      </div>

      <Footer />
    </main>
  )
}
