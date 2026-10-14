import { Users, Heart, Droplets, Shield } from 'lucide-react'

const reasons = [
  {
    icon: Heart,
    titleHindi: 'जीवन बचाने में सहयोग',
    title: 'Help Save Lives',
    desc: 'Blood is urgently needed by patients in hospitals every day. Your voluntary donation helps ensure availability for those in need.',
    descHindi: 'अस्पतालों में रोज़ाना रोगियों को रक्त की आवश्यकता होती है।',
  },
  {
    icon: Users,
    titleHindi: 'समाज सेवा का अवसर',
    title: 'Community Service',
    desc: 'Become part of a community of caring individuals who volunteer their time and blood to support their neighbors.',
    descHindi: 'समाज की सेवा में भागीदार बनें और एक नेक काम करें।',
  },
  {
    icon: Droplets,
    titleHindi: 'स्वैच्छिक रक्तदान',
    title: 'Voluntary Donation',
    desc: 'Voluntary blood donation is the safest and most ethical source of blood supply. Your willing participation makes a real difference.',
    descHindi: 'स्वैच्छिक रक्तदान सबसे सुरक्षित और नैतिक तरीका है।',
  },
  {
    icon: Shield,
    titleHindi: 'सुरक्षित और पेशेवर',
    title: 'Safe & Professional',
    desc: 'All blood collection is conducted by qualified medical personnel following established health guidelines.',
    descHindi: 'सभी रक्तदान प्रशिक्षित चिकित्सा कर्मियों द्वारा किया जाता है।',
  },
]

export function WhyDonate() {
  return (
    <section id="benefits" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">
            <span className="hindi">रक्तदान क्यों करें?</span>
          </h2>
          <p className="section-subtitle">Why Donate Blood?</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="card hover:shadow-card-hover transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 bg-blood-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blood-700 transition-colors">
                <r.icon className="w-6 h-6 text-blood-700 group-hover:text-white transition-colors" />
              </div>
              <h3 className="hindi font-bold text-gray-900 mb-1">{r.titleHindi}</h3>
              <p className="text-xs text-blood-700 font-semibold mb-3">{r.title}</p>
              <p className="hindi text-sm text-gray-600 mb-2">{r.descHindi}</p>
              <p className="text-xs text-gray-500">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Important disclaimer */}
        <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Note:</strong> Submitting the online registration form is a registration of interest only. Final eligibility for blood donation will be determined by qualified medical personnel at the camp through a proper screening process.
        </div>
      </div>
    </section>
  )
}
