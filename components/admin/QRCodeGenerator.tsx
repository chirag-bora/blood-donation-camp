'use client'
import { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import { Download, Printer, Globe, Sparkles, CheckCircle2 } from 'lucide-react'

interface QRCodeGeneratorProps {
  defaultUrl: string
  campDetails: {
    name: string
    dateHindi: string
    venueHindi: string
    time: string
  }
}

export function QRCodeGenerator({ defaultUrl, campDetails }: QRCodeGeneratorProps) {
  const [url, setUrl] = useState(defaultUrl)
  const [dataUrl, setDataUrl] = useState('')

  useEffect(() => {
    generateQR(url)
  }, [url])

  async function generateQR(targetUrl: string) {
    if (!targetUrl) return
    try {
      const code = await QRCode.toDataURL(targetUrl, {
        width: 800,
        margin: 2,
        color: {
          dark: '#B91C1C', // Rich blood red
          light: '#FFFFFF',
        },
      })
      setDataUrl(code)
    } catch (err) {
      console.error('QR code generation error:', err)
    }
  }

  function handleDownload() {
    if (!dataUrl) return
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `Maa-Ushtravahini-Raktdaan-QR.png`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Vercel Deployment Guidance Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-red-50 border-2 border-amber-300/80 rounded-2xl p-5 text-amber-950 text-sm shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-black flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
            ⚠️
          </div>
          <div>
            <h3 className="font-extrabold text-base mb-1">
              महत्वपूर्ण: Vercel पर डिप्लॉय करने के बाद अपना लाइव लिंक यहाँ डालें
            </h3>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              अभी यह QR कोड डिफ़ॉल्ट रूप से <strong>http://localhost:3000</strong> पर है।
              जैसे ही आप इस वेबसाइट को <strong>Vercel</strong> पर डिप्लॉय करेंगे, अपना लाइव Vercel URL
              (जैसे <code>https://maa-ushtravahini-raktdaan.vercel.app</code>) नीचे दिए गए बॉक्स में पेस्ट कर दें।
              QR कोड तुरंत आपके नए लिंक से अपडेट होकर हाई-रिज़ॉल्यूशन PNG में डाउनलोड हो जाएगा।
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div className="md:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-red-100 shadow-xl space-y-5">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blood-700" />
            <span>QR कोड लिंक सेटिंग्स</span>
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              Registration URL (वेबसाइट लिंक)
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-domain.vercel.app"
              className="w-full px-4 py-3 bg-red-50/20 border-2 border-gray-200 focus:border-blood-700 focus:bg-white rounded-2xl text-gray-900 font-mono text-sm focus:outline-none focus:ring-4 focus:ring-blood-700/10 transition-all"
            />
            <p className="text-xs text-gray-400 mt-1.5">
              पैम्फलेट पर प्रिंट करने से पहले सुनिश्चित करें कि लिंक सही खुल रहा है।
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={handleDownload}
              disabled={!dataUrl}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blood-700 via-blood-600 to-blood-800 hover:from-blood-800 hover:to-blood-900 text-white font-extrabold text-base shadow-lg shadow-blood-700/25 hover:shadow-blood-700/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              <span>डाउनलोड हाई-रिज़ॉल्यूशन QR (800x800 PNG)</span>
            </button>

            <button
              onClick={() => window.print()}
              className="w-full py-3.5 px-6 rounded-2xl bg-white border-2 border-blood-700 text-blood-800 font-bold hover:bg-blood-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Printer className="w-4 h-4" />
              <span>प्रिंट प्रीव्यू (Print Pamphlet Standee)</span>
            </button>
          </div>
        </div>

        {/* Live Standee Preview Column */}
        <div className="md:col-span-6 bg-gradient-to-b from-white via-red-50/30 to-white rounded-3xl p-6 sm:p-8 border-2 border-red-200 shadow-xl text-center flex flex-col items-center justify-center print:border-none print:shadow-none">
          <div className="text-xs font-bold uppercase text-red-700 bg-red-100 px-3 py-1 rounded-full mb-2">
            Pamphlet Standee Preview
          </div>

          <h3 className="font-hindi text-xl sm:text-2xl font-black text-gray-900 mb-1">
            {campDetails.name}
          </h3>
          <p className="font-hindi text-xs sm:text-sm font-bold text-blood-700 mb-4">
            {campDetails.dateHindi} • {campDetails.time}
          </p>

          {dataUrl ? (
            <div className="p-4 bg-white rounded-3xl shadow-lg border-2 border-red-100 inline-block">
              <img
                src={dataUrl}
                alt="Blood Donation QR Code"
                className="w-56 h-56 sm:w-64 sm:h-64 object-contain mx-auto"
              />
            </div>
          ) : (
            <div className="w-56 h-56 bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400">
              Generating QR...
            </div>
          )}

          <div className="mt-4">
            <span className="inline-block px-4 py-1.5 bg-blood-700 text-white rounded-full font-bold text-sm tracking-wide font-hindi shadow-md shadow-blood-700/20">
              📱 स्कैन करें और पंजीकरण करें
            </span>
            <p className="text-xs text-gray-500 mt-2 font-hindi">
              स्थान: {campDetails.venueHindi}
            </p>
            <p className="text-[11px] text-gray-400 font-mono mt-1 max-w-xs truncate mx-auto">
              {url}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
