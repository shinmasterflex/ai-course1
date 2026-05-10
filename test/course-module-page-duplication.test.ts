import { describe, expect, it } from "vitest"
import { getCourseStructure, getSectionLearningContents } from "@/lib/course-content"

type DuplicateHit = {
  moduleName: string
  field: "sectionContent"
  normalizedValue: string
  samples: string[]
}

function normalizeCopy(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function collectDuplicates(moduleName: string, field: DuplicateHit["field"], values: string[]): DuplicateHit[] {
  const byNormalized = new Map<string, string[]>()

  for (const value of values) {
    const normalized = normalizeCopy(value)
    if (!normalized) continue
      const current = byNormalized.get(normalized) ? byNormalized.get(normalized)! : []
    current.push(value)
    byNormalized.set(normalized, current)
  }

  return [...byNormalized.entries()]
    .filter(([, matches]) => matches.length > 1)
    .map(([normalizedValue, matches]) => ({
      moduleName,
      field,
      normalizedValue,
      samples: matches,
    }))
}

describe("course module page duplication", () => {
  const courseStructure = getCourseStructure()

  it("parses all module learning-content objects", () => {
    const moduleNames = courseStructure.modules
      .filter((module) => module.sections.some((section) => getSectionLearningContents(module.id, section.id).length > 0))
      .map((module) => module.id)

    expect(moduleNames.length).toBe(5)
  })

  it("avoids duplicated high-signal learning copy within each module", () => {
    const duplicateHits: DuplicateHit[] = []

    for (const module of courseStructure.modules) {
      const sectionContents = module.sections
        .flatMap((section) => getSectionLearningContents(module.id, section.id))

      duplicateHits.push(...collectDuplicates(module.id, "sectionContent", sectionContents))
    }

    expect(duplicateHits).toEqual([])
  })
})
