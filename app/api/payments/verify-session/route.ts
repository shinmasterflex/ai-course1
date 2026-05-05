import { verifyCheckoutSessionPayment } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')?.trim()

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id query parameter.' }, { status: 400 })
  }

  try {
    const verification = await verifyCheckoutSessionPayment(sessionId)

    if (!verification.isPaid || !verification.normalizedCustomerEmail) {
      return NextResponse.json({ error: 'Payment session is not eligible for registration.' }, { status: 400 })
    }

    return NextResponse.json({
      verified: true,
      sessionId,
      email: verification.normalizedCustomerEmail,
    })
  } catch (error) {
    console.error('[Verify Payment Session] Error:', error)
    return NextResponse.json({ error: 'Unable to verify payment session.' }, { status: 500 })
  }
}
