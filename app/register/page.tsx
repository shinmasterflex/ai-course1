"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
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
