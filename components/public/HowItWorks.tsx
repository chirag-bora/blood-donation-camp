import { QrCode, ClipboardList, UserCheck } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: QrCode,
    titleHindi: 'QR स्कैन करें',
    title: 'Scan or Open Link',
    desc: 'Scan the QR code on the pamphlet or open the registration website directly on your phone.',
    descHindi: 'पैम्फलेट पर QR कोड स्कैन करें या सीधे वेबसाइट खोलें।',
  },
  {
    step: '02',
    icon: ClipboardList,
    titleHindi: 'फॉर्म भरें',
    title: 'Complete the Form',
    desc: 'Fill in your basic information and submit the online donor registration form.',
    descHindi: 'अपनी जानकारी भरें और पंजीकरण फॉर्म जमा करें।',
  },
  {
    step: '03',
    icon: UserCheck,
    titleHindi: 'शिविर में आएं',
    title: 'Visit the Camp',
    desc: 'Come to the camp on 18 October 2026. Qualified medical personnel will conduct a screening to assess your eligibility for donation.',
    descHindi: '18 अक्टूबर 2026 को शिविर में आएं। चिकित्सा दल आपकी जांच करेगा।',
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">
            <span className="hindi">पंजीकरण कैसे करें?</span>
          </h2>
          <p className="section-subtitle">How Registration Works</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={step.step} className="relative">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blood-100 z-0" />
              )}
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blood-700 text-white text-xl font-black mb-4 shadow-button relative">
                  <step.icon className="w-7 h-7" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-blood-700 rounded-full text-blood-700 text-xs font-black flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="hindi font-bold text-gray-900 text-lg mb-1">{step.titleHindi}</h3>
                <p className="text-blood-700 text-sm font-semibold mb-3">{step.title}</p>
                <p className="hindi text-sm text-gray-600 mb-2">{step.descHindi}</p>
                <p className="text-xs text-gray-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
