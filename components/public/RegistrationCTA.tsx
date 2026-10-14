import Link from 'next/link'
import { CAMP_CONFIG } from '@/lib/constants'

export function RegistrationCTA() {
  return (
    <section className="py-20 bg-red-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="text-5xl mb-6">🩸</div>
        <h2 className="hindi text-3xl md:text-4xl font-black text-white mb-4">
          आज ही संकल्प लें
        </h2>
        <p className="hindi text-red-100 text-xl mb-2">
          रक्तदान करें, जीवन बचाने में सहयोग दें।
        </p>
        <p className="text-red-200 mb-8">
          {CAMP_CONFIG.date} · {CAMP_CONFIG.time}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="bg-white text-blood-700 hover:bg-red-50 font-bold rounded-xl px-8 py-4 text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Register Now — अभी पंजीकरण करें
          </Link>
          <a
            href="#contact"
            className="border-2 border-white text-white hover:bg-white/10 font-semibold rounded-xl px-8 py-4 text-lg transition-all"
          >
            Contact Organizers
          </a>
        </div>
      </div>
    </section>
  )
}
