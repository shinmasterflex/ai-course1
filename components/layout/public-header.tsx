"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-sky-50/70 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo1.svg" alt="Cogniijn Logo" width={40} height={28} className="h-7 w-10" priority />
          <div className="text-[1.9rem] leading-none sm:text-[2rem]">
            <span className="brand-wordmark text-brand-orange">Cogniijn</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/register">Register</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/demo">Try Module 0</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="https://calendly.com/lfederico-swiftcourse/30min?month=2026-01" target="_blank" rel="noopener noreferrer">
              Schedule a Call
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
