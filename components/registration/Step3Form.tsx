'use client'
import { useState } from 'react'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { BLOOD_GROUP_LABELS, TIME_SLOT_LABELS, CAMP_CONFIG } from '@/lib/constants'
import type { FormData } from './RegistrationForm'
import type { Step3Data } from '@/lib/validation'

interface Props {
  formData: FormData
  onComplete: (data: Step3Data) => void
  onBack: () => void
  submitting: boolean
}

export function Step3Form({ formData, onComplete, onBack, submitting }: Props) {
  const [consent, setConsent] = useState(false)
  const [accuracy, setAccuracy] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs: string[] = []
    if (!accuracy) errs.push('Please confirm that your information is accurate.')
    if (!consent) errs.push('Please consent to data collection and use.')
    if (errs.length > 0) { setErrors(errs); return }
    setErrors([])
    onComplete({ consentGiven: true, marketingConsent: marketing })
  }

  const bloodGroupLabel = formData.bloodGroup
    ? BLOOD_GROUP_LABELS[formData.bloodGroup as string] ?? formData.bloodGroup
    : 'Not specified'

  const timeSlotLabel = formData.preferredTimeSlot
    ? TIME_SLOT_LABELS[formData.preferredTimeSlot as string] ?? formData.preferredTimeSlot
    : 'No preference'

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Review section */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-900 border-b pb-3 hindi mb-4">समीक्षा करें / Review Your Details</h2>
        <div className="space-y-3 text-sm">
          <ReviewRow label="पूरा नाम / Name" value={formData.fullName as string} />
          <ReviewRow label="मोबाइल / Mobile" value={formData.mobileNumber as string} />
          <ReviewRow label="आयु / Age" value={formData.age ? String(formData.age) : 'Not provided'} />
          <ReviewRow label="रक्त समूह / Blood Group" value={bloodGroupLabel} />
          <ReviewRow label="पसंदीदा समय / Time Slot" value={timeSlotLabel} />
          <ReviewRow label="शहर / City" value={(formData.city as string) || 'Not provided'} />
        </div>
        <button
          type="button"
          onClick={onBack}
          className="mt-4 text-sm text-blood-700 hover:text-blood-800 underline"
        >
          ← Edit information
        </button>
      </div>

      {/* Privacy notice */}
      <div className="card bg-blue-50 border border-blue-100">
        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-blue-600" />
          Privacy Notice
        </h3>
        <div className="text-xs text-gray-600 space-y-2">
          <p><strong>Purpose:</strong> Your information is collected for registration coordination and follow-up for this blood donation camp.</p>
          <p><strong>Access:</strong> Only authorized camp organizers can view your registration details. Your data is stored securely.</p>
          <p><strong>Retention:</strong> Registration records will be retained for a period appropriate for coordination and reporting purposes.</p>
          <p><strong>Rights:</strong> You may request correction or deletion of your record by contacting the organizers directly.</p>
          <p><strong>Camp details:</strong> {CAMP_CONFIG.date} | {CAMP_CONFIG.venue}</p>
          <p className="mt-2"><a href="/privacy" target="_blank" className="text-blood-700 underline">Read our full Privacy Policy →</a></p>
        </div>
      </div>

      {/* Consent checkboxes */}
      <div className="card space-y-4">
        <h3 className="font-bold text-gray-900 hindi">सहमति / Consent</h3>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={accuracy}
            onChange={(e) => setAccuracy(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-blood-700 flex-shrink-0"
          />
          <span className="text-sm text-gray-700">
            <strong>I confirm</strong> that the information I have provided is accurate to the best of my knowledge.
            <span className="block hindi text-xs text-gray-500 mt-0.5">मैं पुष्टि करता/करती हूँ कि दी गई जानकारी मेरी जानकारी के अनुसार सही है।</span>
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-blood-700 flex-shrink-0"
          />
          <span className="text-sm text-gray-700">
            <strong>I consent</strong> to the collection and use of my information for this blood donation camp's registration and coordination.
            <span className="block hindi text-xs text-gray-500 mt-0.5">मैं अपनी जानकारी के उपयोग के लिए सहमति देता/देती हूँ।</span>
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-blood-700 flex-shrink-0"
          />
          <span className="text-sm text-gray-600">
            <span className="bg-gray-100 text-gray-500 text-xs px-1.5 py-0.5 rounded mr-1">Optional</span>
            I would like to be informed about future blood donation camp announcements.
            <span className="block hindi text-xs text-gray-400 mt-0.5">मुझे भविष्य के रक्तदान शिविरों की जानकारी देते रहें।</span>
          </span>
        </label>

        {/* Important disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
          ⚠️ <strong>Important:</strong> Submitting this form is a registration of interest only. It does not guarantee eligibility for blood donation. Medical eligibility will be assessed by qualified personnel at the camp.
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 space-y-1">
            {errors.map((err, i) => (
              <p key={i} className="text-sm text-red-700 flex items-center gap-1">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {err}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack} disabled={submitting} className="btn-secondary flex-1">
          ← Back
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary flex-2 flex items-center justify-center gap-2 flex-1"
        >
          {submitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
          ) : (
            <><CheckCircle className="w-4 h-4" /> <span className="hindi">पंजीकरण जमा करें</span> / Submit Registration</>
          )}
        </button>
      </div>
    </form>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-500 hindi text-xs">{label}</span>
      <span className="font-semibold text-gray-900 text-right">{value}</span>
    </div>
  )
}
