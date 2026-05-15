"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-sky-50/70 backdrop-blur-sm">
      <div className="container mx-auto flex min-h-16 items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex h-10 shrink-0 items-center">
          <Image
            src="/Logo.png"
            alt="Cognijin Logo"
            width={720}
            height={400}
            className="block h-8 w-auto md:h-9"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Button asChild variant="outline">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/register">Register</Link>
          </Button>
        </nav>

        <nav className="flex items-center gap-2 md:hidden">
          <Button asChild size="sm" variant="outline">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="sm" className="bg-brand-orange text-white hover:bg-brand-orange/90">
            <Link href="/register">Register</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
