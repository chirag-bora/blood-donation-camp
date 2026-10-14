'use client'
import { useState } from 'react'
import { User, Phone, Calendar, MapPin } from 'lucide-react'
import { Step1Schema, type Step1Data } from '@/lib/validation'
import type { FormData } from './RegistrationForm'

interface Props {
  defaultValues: FormData
  onComplete: (data: Step1Data) => void
}

export function Step1Form({ defaultValues, onComplete }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [values, setValues] = useState({
    fullName: (defaultValues.fullName as string) || '',
    mobileNumber: (defaultValues.mobileNumber as string) || '',
    age: defaultValues.age ? String(defaultValues.age) : '',
    gender: (defaultValues.gender as string) || '',
    city: (defaultValues.city as string) || '',
    preferredLanguage: (defaultValues.preferredLanguage as string) || 'HINDI',
  })

  function handleChange(field: string, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => { const n = {...prev}; delete n[field]; return n })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = Step1Schema.safeParse({
      ...values,
      age: values.age ? parseInt(values.age) : null,
      gender: values.gender || null,
      city: values.city || null,
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
      <h2 className="text-lg font-bold text-gray-900 border-b pb-3 hindi">व्यक्तिगत जानकारी</h2>

      {/* Full Name */}
      <div>
        <label className="form-label" htmlFor="fullName">
          <User className="w-4 h-4 inline mr-1" />
          <span className="hindi">पूरा नाम</span> <span className="text-red-500">*</span>
          <span className="text-gray-400 font-normal ml-1">(Full Name)</span>
        </label>
        <input
          id="fullName"
          type="text"
          value={values.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="अपना पूरा नाम लिखें / Enter your full name"
          className="form-input"
          maxLength={100}
          required
          autoComplete="name"
        />
        {errors.fullName && <p className="form-error">⚠ {errors.fullName}</p>}
      </div>

      {/* Mobile */}
      <div>
        <label className="form-label" htmlFor="mobileNumber">
          <Phone className="w-4 h-4 inline mr-1" />
          <span className="hindi">मोबाइल नंबर</span> <span className="text-red-500">*</span>
          <span className="text-gray-400 font-normal ml-1">(Mobile Number)</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">+91</span>
          <input
            id="mobileNumber"
            type="tel"
            value={values.mobileNumber}
            onChange={(e) => handleChange('mobileNumber', e.target.value)}
            placeholder="10-digit mobile number"
            className="form-input pl-12"
            maxLength={13}
            required
            autoComplete="tel"
            inputMode="numeric"
          />
        </div>
        {errors.mobileNumber && <p className="form-error">⚠ {errors.mobileNumber}</p>}
      </div>

      {/* Age */}
      <div>
        <label className="form-label" htmlFor="age">
          <Calendar className="w-4 h-4 inline mr-1" />
          <span className="hindi">आयु</span>
          <span className="text-gray-400 font-normal ml-1">(Age) — Optional</span>
        </label>
        <input
          id="age"
          type="number"
          value={values.age}
          onChange={(e) => handleChange('age', e.target.value)}
          placeholder="Enter your age (18–65)"
          className="form-input"
          min={18}
          max={65}
          inputMode="numeric"
        />
        <p className="text-xs text-gray-400 mt-1">Age 18–65. Medical eligibility is assessed at the camp.</p>
        {errors.age && <p className="form-error">⚠ {errors.age}</p>}
      </div>

      {/* Gender */}
      <div>
        <label className="form-label">
          <span className="hindi">लिंग</span>
          <span className="text-gray-400 font-normal ml-1">(Gender) — Optional</span>
        </label>
        <select
          value={values.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
          className="form-input"
        >
          <option value="">Select (Optional)</option>
          <option value="MALE">Male / पुरुष</option>
          <option value="FEMALE">Female / महिला</option>
          <option value="OTHER">Other / अन्य</option>
          <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
        </select>
      </div>

      {/* City */}
      <div>
        <label className="form-label" htmlFor="city">
          <MapPin className="w-4 h-4 inline mr-1" />
          <span className="hindi">शहर / क्षेत्र</span>
          <span className="text-gray-400 font-normal ml-1">(City/Locality) — Optional</span>
        </label>
        <input
          id="city"
          type="text"
          value={values.city}
          onChange={(e) => handleChange('city', e.target.value)}
          placeholder="Your city or locality"
          className="form-input"
          maxLength={100}
        />
      </div>

      {/* Preferred Language */}
      <div>
        <label className="form-label">
          <span className="hindi">पसंदीदा भाषा</span>
          <span className="text-gray-400 font-normal ml-1">(Preferred Language)</span>
        </label>
        <div className="flex gap-3">
          {[{ val: 'HINDI', label: 'हिंदी' }, { val: 'ENGLISH', label: 'English' }].map((opt) => (
            <label key={opt.val} className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
              values.preferredLanguage === opt.val ? 'border-blood-700 bg-blood-50' : 'border-gray-200 hover:border-blood-300'
            }`}>
              <input
                type="radio"
                name="preferredLanguage"
                value={opt.val}
                checked={values.preferredLanguage === opt.val}
                onChange={(e) => handleChange('preferredLanguage', e.target.value)}
                className="accent-blood-700"
              />
              <span className="font-medium hindi">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="btn-primary w-full">
        Next — <span className="hindi">आगे बढ़ें</span> →
      </button>
    </form>
  )
}
