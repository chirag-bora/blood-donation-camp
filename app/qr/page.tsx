import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { QRCodeGenerator } from '@/components/admin/QRCodeGenerator'
import { CAMP_CONFIG } from '@/lib/constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QR Code for Pamphlet | रक्तदान शिविर',
  description: 'Download high-resolution QR code and printable pamphlet standee for Blood Donation Camp.',
}

export default function PublicQRPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />

      <div className="py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-blood-700 bg-red-100 px-3.5 py-1 rounded-full">
              Pamphlet & Standee QR
            </span>
            <h1 className="hindi text-3xl sm:text-4xl font-black text-gray-900 mt-3 mb-2">
              रक्तदान शिविर पैम्फलेट QR कोड
            </h1>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">
              इस QR कोड को अपने पैम्फलेट, सोशल मीडिया या स्टैंडी पर प्रिंट करें।
              स्कैन करने पर तुरंत 1-मिनट का पंजीकरण फॉर्म खुलेगा।
            </p>
          </div>

          <QRCodeGenerator
            defaultUrl={CAMP_CONFIG.registrationUrl}
            campDetails={{
              name: CAMP_CONFIG.name,
              dateHindi: CAMP_CONFIG.dateHindi,
              venueHindi: CAMP_CONFIG.venueHindi,
              time: CAMP_CONFIG.time,
            }}
          />
        </div>
      </div>

      <Footer />
    </main>
  )
}
