import Stripe from 'stripe'

let stripeClient: Stripe | null = null

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function getStripeSecretKey(): string {
  const secretKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

  if (!secretKey) {
    throw new Error('Missing required environment variable: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY')
  }

  return secretKey
}

function getPaymentLinkIdFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    const segments = parsed.pathname.split('/').filter(Boolean)
    const payIndex = segments.findIndex((segment) => segment === 'pay')

    if (payIndex >= 0 && segments[payIndex + 1]) {
      return segments[payIndex + 1]
    }

    return null
  } catch {
    return null
  }
}

function getExpectedPaymentLinkId(): string | null {
  const explicitId = process.env.STRIPE_PAYMENT_LINK_ID?.trim()

  if (explicitId) {
    return explicitId
  }

  const paymentLinkUrl = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL?.trim()

  if (!paymentLinkUrl) {
    return null
  }

  return getPaymentLinkIdFromUrl(paymentLinkUrl)
}

export function getRegistrationPriceId(): string {
  const priceId = process.env.STRIPE_REGISTRATION_PRICE_ID?.trim()

  if (!priceId) {
    throw new Error('Missing required environment variable: STRIPE_REGISTRATION_PRICE_ID')
  }

  return priceId
}

export function getStripeServerClient(): Stripe {
  if (stripeClient) {
    return stripeClient
  }

  stripeClient = new Stripe(getStripeSecretKey(), {
    apiVersion: '2025-08-27.basil',
  })

  return stripeClient
}

export type VerifiedCheckoutSession = {
  isPaid: boolean
  normalizedCustomerEmail: string | null
  paymentLinkId: string | null
}

export async function verifyCheckoutSessionPayment(sessionId: string): Promise<VerifiedCheckoutSession> {
  const stripe = getStripeServerClient()
  const session = await stripe.checkout.sessions.retrieve(sessionId)

  const paymentLinkId =
    typeof session.payment_link === 'string'
      ? session.payment_link
      : session.payment_link?.id ? session.payment_link.id : null

  const expectedPaymentLinkId = getExpectedPaymentLinkId()
  const expectedPriceId = process.env.STRIPE_REGISTRATION_PRICE_ID?.trim()

  let hasExpectedPrice = false
  if (expectedPriceId) {
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 100 })
    hasExpectedPrice = lineItems.data.some((item) => {
      const lineItemPrice = typeof item.price === 'string' ? item.price : item.price?.id
      return lineItemPrice === expectedPriceId
    })
  }

  if (expectedPaymentLinkId && paymentLinkId !== expectedPaymentLinkId && !hasExpectedPrice) {
    return {
      isPaid: false,
      normalizedCustomerEmail: null,
      paymentLinkId,
    }
  }

  if (!expectedPaymentLinkId && expectedPriceId && !hasExpectedPrice) {
    return {
      isPaid: false,
      normalizedCustomerEmail: null,
      paymentLinkId,
    }
  }

  const customerEmail = session.customer_details?.email
    ? session.customer_details.email
    : session.customer_email
      ? session.customer_email
      : null
  const normalizedCustomerEmail = customerEmail ? normalizeEmail(customerEmail) : null

  const isPaid = session.status === 'complete' && session.payment_status === 'paid'

  return {
    isPaid,
    normalizedCustomerEmail,
    paymentLinkId,
  }
}
