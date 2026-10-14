'use client'
import { useState } from 'react'
import { Droplets, Clock } from 'lucide-react'
import { Step2Schema, type Step2Data } from '@/lib/validation'
import { BLOOD_GROUP_LABELS, TIME_SLOT_LABELS } from '@/lib/constants'
import type { FormData } from './RegistrationForm'

interface Props {
  defaultValues: FormData
  onComplete: (data: Step2Data) => void
  onBack: () => void
}

export function Step2Form({ defaultValues, onComplete, onBack }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [values, setValues] = useState({
    bloodGroup: (defaultValues.bloodGroup as string) || '',
    previousDonation: (defaultValues.previousDonation as string) || 'PREFER_NOT_TO_SAY',
    lastDonationDate: (defaultValues.lastDonationDate as string) || '',
    preferredTimeSlot: (defaultValues.preferredTimeSlot as string) || 'NO_PREFERENCE',
    preferredContactMethod: (defaultValues.preferredContactMethod as string) || 'PHONE_CALL',
  })

  function handleChange(field: string, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => { const n = {...prev}; delete n[field]; return n })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = Step2Schema.safeParse({
      ...values,
      bloodGroup: values.bloodGroup || null,
      lastDonationDate: values.lastDonationDate || null,
    })
    if (!parsed.success) {
      const errs: Record<string, string> = {}
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) errs[err.path[0] as string] = err.message
      })
      setErrors(errs)
      return
    }
    onComplete(parsed.data)
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5" noValidate>
      <h2 className="text-lg font-bold text-gray-900 border-b pb-3 hindi">रक्तदान जानकारी</h2>

      {/* Blood Group */}
      <div>
        <label className="form-label">
          <Droplets className="w-4 h-4 inline mr-1" />
          <span className="hindi">रक्त समूह</span>
          <span className="text-gray-400 font-normal ml-1">(Blood Group) — Optional</span>
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {Object.entries(BLOOD_GROUP_LABELS).filter(([k]) => k !== 'UNKNOWN').map(([key, label]) => (
            <label key={key} className={`flex items-center justify-center p-2.5 rounded-xl border-2 cursor-pointer font-bold text-sm transition-all ${
              values.bloodGroup === key ? 'border-blood-700 bg-blood-700 text-white' : 'border-gray-200 hover:border-blood-300 text-gray-700'
            }`}>
              <input
                type="radio"
                name="bloodGroup"
                value={key}
                checked={values.bloodGroup === key}
                onChange={(e) => handleChange('bloodGroup', e.target.value)}
                className="sr-only"
              />
              {label}
            </label>
          ))}
          <label className={`col-span-2 flex items-center justify-center p-2.5 rounded-xl border-2 cursor-pointer text-sm transition-all ${
            values.bloodGroup === 'UNKNOWN' || values.bloodGroup === '' ? 'border-blood-700 bg-blood-50 text-blood-700' : 'border-gray-200 hover:border-blood-300 text-gray-500'
          }`}>
            <input
              type="radio"
              name="bloodGroup"
              value="UNKNOWN"
              checked={values.bloodGroup === 'UNKNOWN' || values.bloodGroup === ''}
              onChange={(e) => handleChange('bloodGroup', e.target.value)}
              className="sr-only"
            />
            <span className="hindi text-xs">मुझे नहीं पता / Unknown</span>
          </label>
        </div>
      </div>

      {/* Previous Donation */}
      <div>
        <label className="form-label">
          <span className="hindi">क्या आपने पहले रक्तदान किया है?</span>
          <span className="text-gray-400 font-normal ml-1">(Previous Donation?)</span>
        </label>
        <div className="flex gap-3">
          {[
            { val: 'YES', label: 'हाँ / Yes' },
            { val: 'NO', label: 'नहीं / No' },
            { val: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' },
          ].map((opt) => (
            <label key={opt.val} className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer text-sm transition-all ${
              values.previousDonation === opt.val ? 'border-blood-700 bg-blood-50 text-blood-700 font-semibold' : 'border-gray-200 hover:border-blood-300 text-gray-600'
            }`}>
              <input
                type="radio"
                name="previousDonation"
                value={opt.val}
                checked={values.previousDonation === opt.val}
                onChange={(e) => handleChange('previousDonation', e.target.value)}
                className="sr-only"
              />
              <span className="hindi text-xs text-center">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Last donation date - only if YES */}
      {values.previousDonation === 'YES' && (
        <div>
          <label className="form-label" htmlFor="lastDonationDate">
            <span className="hindi">अंतिम रक्तदान की तारीख</span>
            <span className="text-gray-400 font-normal ml-1">(Last Donation Date) — Optional</span>
          </label>
          <input
            id="lastDonationDate"
            type="date"
            value={values.lastDonationDate}
            onChange={(e) => handleChange('lastDonationDate', e.target.value)}
            className="form-input"
            max={new Date().toISOString().split('T')[0]}
          />
          <p className="text-xs text-gray-400 mt-1">Medical personnel will verify the donation interval at the camp.</p>
        </div>
      )}

      {/* Preferred Time Slot */}
      <div>
        <label className="form-label">
          <Clock className="w-4 h-4 inline mr-1" />
          <span className="hindi">पसंदीदा समय</span>
          <span className="text-gray-400 font-normal ml-1">(Preferred Time Slot) — Optional</span>
        </label>
        <select
          value={values.preferredTimeSlot}
          onChange={(e) => handleChange('preferredTimeSlot', e.target.value)}
          className="form-input"
        >
          {Object.entries(TIME_SLOT_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <p className="text-xs text-gray-400 mt-1">Camp hours: 9:00 AM – 5:00 PM</p>
      </div>

      {/* Contact Method */}
      <div>
        <label className="form-label">
          <span className="hindi">संपर्क का माध्यम</span>
          <span className="text-gray-400 font-normal ml-1">(Preferred Contact)</span>
        </label>
        <div className="flex gap-3">
          {[{ val: 'PHONE_CALL', label: '📞 Phone Call' }, { val: 'SMS', label: '💬 SMS' }].map((opt) => (
            <label key={opt.val} className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
              values.preferredContactMethod === opt.val ? 'border-blood-700 bg-blood-50' : 'border-gray-200 hover:border-blood-300'
            }`}>
              <input
                type="radio"
                name="preferredContactMethod"
                value={opt.val}
                checked={values.preferredContactMethod === opt.val}
                onChange={(e) => handleChange('preferredContactMethod', e.target.value)}
                className="accent-blood-700"
              />
              <span className="text-sm font-medium">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack} className="btn-secondary flex-1">
          ← Back
        </button>
        <button type="submit" className="btn-primary flex-1">
          Next → <span className="hindi">आगे बढ़ें</span>
        </button>
      </div>
    </form>
  )
}
