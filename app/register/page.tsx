"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const [paymentRequired, setPaymentRequired] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setPaymentRequired(searchParams?.get("paymentRequired") === "1")
  }, [searchParams])

  const paymentLinkUrl = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (paymentRequired) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-brand-green/15 via-sky-50 to-brand-orange/15 px-4 py-10 md:py-14">
        <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-brand-indigo/15 bg-white/80 shadow-xl backdrop-blur lg:grid-cols-2">
          <aside className="relative hidden border-r border-brand-indigo/10 bg-gradient-to-br from-brand-green/10 via-white to-brand-orange/10 p-8 lg:block">
            <div className="space-y-5">
              <p className="inline-flex rounded-full border border-brand-orange/35 bg-white px-3 py-1 text-xs font-semibold text-brand-orange">
                Unlock Full Access
              </p>
              <h2 className="text-3xl font-semibold text-brand-indigo">Premium AI Course Access</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Gain full access to all modules, quizzes, and learning materials in the AI for Business Leaders course.
              </p>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>✓ 5 comprehensive modules</p>
                <p>✓ Interactive quizzes and assessments</p>
                <p>✓ Progress tracking and certificates</p>
                <p>✓ Lifetime access</p>
              </div>
            </div>
            <div className="mt-7 overflow-hidden rounded-2xl border border-brand-indigo/10 bg-white">
              <Image
                src="/graphics/module-path.svg"
                alt="Visual learning path across all modules"
                width={900}
                height={560}
                className="h-auto w-full"
                priority
              />
            </div>
          </aside>

          <section className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
            <div className="mx-auto flex w-full max-w-md flex-col gap-5 rounded-xl border border-brand-indigo/15 bg-white p-6">
              <h1 className="text-center text-2xl font-bold text-brand-indigo md:text-3xl">Unlock Course Access</h1>
              <p className="text-sm text-muted-foreground text-center">
                Complete your payment to access all course materials and start learning.
              </p>
              {paymentLinkUrl ? (
                <>
                  <Button asChild size="lg" className="bg-brand-orange text-white hover:bg-brand-orange/90">
                    <a href={paymentLinkUrl} target="_blank" rel="noopener noreferrer">
                      Complete Payment →
                    </a>
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    You'll be redirected to our secure payment processor
                  </p>
                </>
              ) : (
                <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
                  Payment link is not configured. Please contact support.
                </div>
              )}
              <div className="border-t pt-4">
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/sign-in" className="font-medium text-brand-indigo hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-green/15 via-sky-50 to-brand-orange/15 px-4 py-10 md:py-14">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-brand-indigo/15 bg-white/80 shadow-xl backdrop-blur lg:grid-cols-2">
        <aside className="relative hidden border-r border-brand-indigo/10 bg-gradient-to-br from-brand-green/10 via-white to-brand-orange/10 p-8 lg:block">
          <div className="space-y-5">
            <p className="inline-flex rounded-full border border-brand-green/35 bg-white px-3 py-1 text-xs font-semibold text-brand-indigo">
              Direct Learning Access
            </p>
            <h2 className="text-3xl font-semibold text-brand-indigo">Jump into Cognijin modules instantly</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              You can now open the course without account registration or payment steps.
            </p>
          </div>
          <div className="mt-7 overflow-hidden rounded-2xl border border-brand-indigo/10 bg-white">
            <Image
              src="/graphics/module-path.svg"
              alt="Visual learning path across all modules"
              width={900}
              height={560}
              className="h-auto w-full"
              priority
            />
          </div>
        </aside>

        <section className="p-6 md:p-8 lg:p-10">
          <div className="mx-auto flex w-full max-w-md flex-col gap-5 rounded-xl border border-brand-indigo/15 bg-white p-6">
            <h1 className="text-center text-2xl font-bold text-brand-indigo md:text-3xl">Access Updated</h1>
            <p className="text-sm text-muted-foreground">
              Registration is optional. Open the course dashboard directly and start with any module.
            </p>
            <Button asChild size="lg" className="bg-brand-orange text-white hover:bg-brand-orange/90">
              <Link href="/course">Open Course Dashboard</Link>
            </Button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/sign-in" className="font-medium text-brand-indigo hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
