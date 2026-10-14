'use client'
import { useState } from 'react'
import { Step1Form } from './Step1Form'
import { Step2Form } from './Step2Form'
import { Step3Form } from './Step3Form'
import { ProgressBar } from './ProgressBar'
import type { Step1Data, Step2Data, Step3Data } from '@/lib/validation'

export type FormData = Partial<Step1Data & Step2Data & Step3Data>

const STEPS = [
  { number: 1, label: 'व्यक्तिगत जानकारी', labelEn: 'Personal Info' },
  { number: 2, label: 'रक्तदान जानकारी', labelEn: 'Donation Info' },
  { number: 3, label: 'सहमति और समीक्षा', labelEn: 'Consent & Review' },
]

export function RegistrationForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; referenceNumber?: string; error?: string } | null>(null)

  function handleStep1Complete(data: Step1Data) {
    setFormData((prev) => ({ ...prev, ...data }))
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleStep2Complete(data: Step2Data) {
    setFormData((prev) => ({ ...prev, ...data }))
    setStep(3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleStep3Complete(data: Step3Data) {
    const allData = { ...formData, ...data }
    setSubmitting(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allData),
      })
      const result = await res.json()
      if (res.ok && result.success) {
        // Redirect to success page
        window.location.href = `/registration-success?ref=${result.referenceNumber}&name=${encodeURIComponent(result.name)}`
      } else {
        setSubmitResult({ success: false, error: result.error || 'Registration failed. Please try again.' })
      }
    } catch {
      setSubmitResult({ success: false, error: 'Network error. Please check your connection and try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (submitResult?.error) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{submitResult.error}</p>
          <button onClick={() => setSubmitResult(null)} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ProgressBar currentStep={step} steps={STEPS} />
      
      {step === 1 && (
        <Step1Form
          defaultValues={formData}
          onComplete={handleStep1Complete}
        />
      )}
      {step === 2 && (
        <Step2Form
          defaultValues={formData}
          onComplete={handleStep2Complete}
          onBack={() => { setStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        />
      )}
      {step === 3 && (
        <Step3Form
          formData={formData}
          onComplete={handleStep3Complete}
          onBack={() => { setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          submitting={submitting}
        />
      )}
    </div>
  )
}
