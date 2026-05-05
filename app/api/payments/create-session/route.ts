import { NextResponse } from 'next/server'
import { enforceRateLimit } from '@/lib/rate-limit'
import { getRegistrationPriceId, getStripeServerClient } from '@/lib/stripe'

function getRequestOrigin(request: Request): string {
  const url = new URL(request.url)
  const originHeader = request.headers.get('origin')?.trim()

  if (originHeader) {
    try {
      return new URL(originHeader).origin
    } catch {
      // Fall through to the request URL origin.
    }
  }

  return url.origin
}

export async function POST(request: Request) {
  const rateLimit = enforceRateLimit(request, {
    keyPrefix: 'api-payments-create-session',
    maxRequests: 20,
    windowMs: 10 * 60 * 1000,
  })

  if (rateLimit.limited) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimit.retryAfterSeconds),
        },
      }
    )
  }

  try {
    const stripe = getStripeServerClient()
    const priceId = getRegistrationPriceId()
    const origin = getRequestOrigin(request)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/register?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/register`,
      customer_creation: 'always',
      billing_address_collection: 'auto',
    })

    if (!session.url) {
      return NextResponse.json({ error: 'Unable to start checkout session.' }, { status: 500 })
    }

    return NextResponse.json({ checkoutUrl: session.url })
  } catch (error) {
    console.error('[Create Checkout Session] Error:', error)
    return NextResponse.json({ error: 'Unable to start checkout.' }, { status: 500 })
  }
}