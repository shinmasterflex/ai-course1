import { redirect } from "next/navigation"

/**
 * LEGACY MODULE 0 ROUTE
 * Module 0 has moved to the public /try page for visitors.
 * This route is kept to preserve old links and redirects to the new location,
 * preserving any `section` (or other) query parameters along the way.
 */
type LegacySearchParams = Record<string, string | string[] | undefined>

export default async function LegacyModuleZeroRedirect({
  searchParams,
}: {
  searchParams?: Promise<LegacySearchParams>
}) {
  const resolved = (await searchParams) ?? {}
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(resolved)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === "string" && item.length > 0) {
          params.append(key, item)
        }
      }
    } else if (typeof value === "string" && value.length > 0) {
      params.set(key, value)
    }
  }

  const query = params.toString()
  redirect(query ? `/try?${query}` : "/try")
}