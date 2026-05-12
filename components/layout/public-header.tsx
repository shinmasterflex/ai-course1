"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-sky-50/70 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
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
            <Link href="/course">Executive AI Strategy Program</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/demo">Preview Module 0</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="https://calendly.com/lfederico-cognijin/30min?month=2026-01" target="_blank" rel="noopener noreferrer">
              Schedule a Call
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
