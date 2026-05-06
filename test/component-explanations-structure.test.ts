import { describe, expect, it } from "vitest"

import { COMPONENT_EXPLANATIONS, getComponentExplanation } from "@/lib/component-explanations"
import { courseStructure } from "@/lib/course-structure"

function getAllResolvedExplanationIds() {
  const ids = new Set(Object.keys(COMPONENT_EXPLANATIONS))

  for (const module of courseStructure.modules) {
    ids.add(`${module.id}-course-quiz`)

    for (const section of module.sections) {
      ids.add(`${module.id}-${section.id}-scenario`)
      ids.add(`${module.id}-${section.id}-quick-check`)
    }
  }

  return Array.from(ids).sort()
}

function normalizeWords(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function paragraphSignature(value: string) {
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => normalizeWords(paragraph).split(" ").filter(Boolean).slice(0, 4).join(" "))
    .filter(Boolean)
    .join(" | ")
}

describe("resolved component explanation structure", () => {
  it("does not use the old labeled three-part scaffold", () => {
    const violations = getAllResolvedExplanationIds()
      .map((id) => getComponentExplanation(id))
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
      .filter((entry) => /direct answer:|why this matters:|how to apply it:/i.test(entry.explanation))
      .map((entry) => entry.id)

    expect(violations).toEqual([])
  })

  it("keeps paragraph-level answer structures varied across the registry", () => {
    const signatures = getAllResolvedExplanationIds()
      .map((id) => getComponentExplanation(id))
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
      .map((entry) => paragraphSignature(entry.explanation))

    const counts = signatures.reduce<Record<string, number>>((acc, signature) => {
      acc[signature] = (acc[signature] ?? 0) + 1
      return acc
    }, {})

    const repeated = Object.entries(counts)
      .filter(([, count]) => count > 8)
      .map(([signature, count]) => `${count}x: ${signature}`)

    expect(repeated).toEqual([])
  })
})