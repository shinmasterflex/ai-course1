import type React from "react"
import type { Metadata } from "next"
import { Inter, Outfit, Merriweather } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

/**
 * FONT CONFIGURATION
 * Using Inter for body text - highly readable and professional
 * Outfit for headings - authoritative and modern
 * Merriweather for serif option when needed
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Swiftcourse - Sales & Entrepreneurship Training",
  description: "Strengthen entrepreneurial and sales success through personality trait assessment with the Big 5 Model",
  generator: "v0.app",
  icons: {
    icon: "/favicon1.svg",
  },
}

/**
 * ROOT LAYOUT
 * Applies global fonts and styling to the entire application
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${merriweather.variable}`}>
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        {/* Analytics component removed due to loading errors */}
      </body>
    </html>
  )
}
