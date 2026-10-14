import { NextRequest, NextResponse } from 'next/server'
import { DonorRegistrationSchema } from '@/lib/validation'
import { rateLimit, getClientIp } from '@/lib/security'
import { customAlphabet } from 'nanoid'

// Non-sequential readable reference code: e.g. RD-2026-K9P4X7
const generateRefCode = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 6)

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting: 6 attempts per 10 minutes per IP
    const clientIp = getClientIp(request)
    const { allowed } = rateLimit(`donor_reg:${clientIp}`, {
      windowMs: 10 * 60 * 1000,
      max: 6,
    })

    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'बहुत अधिक अनुरोध! कृपया 10 मिनट बाद पुनः प्रयास करें। (Too many attempts. Please try again later.)',
        },
        { status: 429 }
      )
    }

    // 2. Body parsing
    let rawBody: unknown
    try {
      rawBody = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, error: 'अमान्य डेटा प्रारूप (Invalid JSON body).' },
        { status: 400 }
      )
    }

    // 3. Strict Server-Side Validation
    const validationResult = DonorRegistrationSchema.safeParse(rawBody)
    if (!validationResult.success) {
      const firstErrorMessage =
        validationResult.error.errors[0]?.message || 'कृपया सभी आवश्यक फ़ील्ड सही तरीके से भरें।'
      return NextResponse.json(
        {
          success: false,
          error: firstErrorMessage,
          fieldErrors: validationResult.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const donorData = validationResult.data
    const referenceNumber = `RD-2026-${generateRefCode()}`

    // 4. Send to Google Apps Script / Google Sheets
    const defaultScriptUrl =
      'https://script.google.com/macros/s/AKfycbyg9WUEVtBCeH5rt3ssdZk1_6yc2tzFryBpYP1XXxE7cZrENq3dREfVJQDEyT6MHmb2/exec'
    const defaultSecret = 'blood_camp_secret_2026'

    const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL || defaultScriptUrl
    const appsScriptSecret = process.env.APPS_SCRIPT_SECRET || defaultSecret

    if (!appsScriptUrl || appsScriptUrl.includes('YOUR_GOOGLE_APPS_SCRIPT_DEPLOYMENT_URL')) {
      // Configuration notice if user hasn't connected Google Sheets yet
      console.warn(
        '⚠️ GOOGLE_APPS_SCRIPT_URL not configured in .env. Falling back to local confirmation mode.'
      )
      return NextResponse.json({
        success: true,
        referenceNumber,
        fullName: donorData.fullName,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        notice: 'Google Sheet URL not configured yet. Form submitted locally.',
      })
    }

    // Forward to Google Apps Script
    const payload = {
      ...donorData,
      referenceNumber,
      secret: appsScriptSecret,
      submittedAt: new Date().toISOString(),
    }

    const scriptResponse = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!scriptResponse.ok) {
      throw new Error(`Google Apps Script responded with HTTP ${scriptResponse.status}`)
    }

    const sheetResult = await scriptResponse.json()
    if (!sheetResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: sheetResult.error || 'गूगल शीट में रिकॉर्ड सहेजने में विफल। कृपया पुनः प्रयास करें।',
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      referenceNumber: sheetResult.referenceNumber || referenceNumber,
      fullName: donorData.fullName,
      timestamp: sheetResult.timestamp,
    })
  } catch (error) {
    console.error('[API /api/register Error]:', error)
    return NextResponse.json(
      {
        success: false,
        error:
          'तकनीकी समस्या के कारण पंजीकरण सहेजा नहीं जा सका। कृपया थोड़ी देर बाद पुनः प्रयास करें या आयोजकों से संपर्क करें।',
      },
      { status: 500 }
    )
  }
}
