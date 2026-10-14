import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { QRCodeGenerator } from '@/components/admin/QRCodeGenerator'
import { CAMP_CONFIG } from '@/lib/constants'

export default async function QRCodePage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  return (
    <div className="p-4 md:p-8 md:pt-8 pt-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">QR Code Generator</h1>
        <p className="text-gray-500 text-sm mt-1 hindi">प्रचार और पैम्फलेट के लिए QR कोड डाउनलोड करें</p>
      </div>

      <QRCodeGenerator defaultUrl={CAMP_CONFIG.registrationUrl} campDetails={CAMP_CONFIG} />
    </div>
  )
}
