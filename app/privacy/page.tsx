import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { CAMP_CONFIG, ORGANIZERS } from '@/lib/constants'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <div className="card space-y-6">
          <h1 className="text-3xl font-black text-gray-900 border-b pb-4">Privacy Policy & Donor Consent Notice</h1>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-gray-800">1. Purpose of Data Collection</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We collect your name, mobile number, approximate age, city, blood group (if known), and donation preferences solely for coordinating the <strong>{CAMP_CONFIG.nameEn} ({CAMP_CONFIG.name})</strong> scheduled on <strong>{CAMP_CONFIG.date}</strong> at <strong>{CAMP_CONFIG.venue}</strong>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-gray-800">2. Voluntary Registration & Medical Disclaimer</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Submitting an online registration form is an expression of interest to donate blood. It does not certify or guarantee medical eligibility. Certified medical and healthcare personnel from authorized partner blood banks will perform full pre-donation screening (hemoglobin test, blood pressure, health history, etc.) on-site prior to any donation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-gray-800">3. Access & Data Security</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your personal details are stored in an encrypted and access-controlled database. Only verified organizers of this camp are granted administrative credentials to manage registrations, confirm attendee time slots, and ensure seamless logistics. We never sell, lease, or distribute your private contact details to commercial third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-gray-800">4. Right to Correction or Deletion</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              You maintain the full right to withdraw your registration, update your information, or request complete removal/anonymization of your records at any time. To execute this, please call or message any of the organizing leads listed below:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {ORGANIZERS.map((org) => (
                <li key={org.phone}>
                  <strong>{org.name}:</strong> <a href={`tel:+91${org.phone}`} className="text-blood-700 underline">{org.display}</a>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-gray-800">5. Retention Policy</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Registration data will be retained for post-camp aggregate reporting and inventory planning. If you opted into notifications for future voluntary camps, we may reach out for upcoming community drives.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
