import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"

type DuplicateHit = {
  moduleName: string
  field: "scenarioBody" | "checklistItems" | "quickCheckOptions"
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
    const current = byNormalized.get(normalized) ?? []
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
  const sourcePath = resolve(process.cwd(), "components/learning/course-module-page.tsx")
  const sourceText = readFileSync(sourcePath, "utf8")
  const moduleBlockRegex =
    /const (module\d+SectionLearningContent): Record<string, SectionLearningContent> = \{([\s\S]*?)\r?\n\}\r?\n\r?\n(?=const module\d+SectionLearningContent|export function CourseModulePage)/g

  it("parses all module learning-content objects", () => {
    const moduleNames = [...sourceText.matchAll(moduleBlockRegex)].map((match) => match[1])

    expect(moduleNames.length).toBe(11)
  })

  it("avoids duplicated high-signal learning copy within each module", () => {
    const duplicateHits: DuplicateHit[] = []

    for (const match of sourceText.matchAll(moduleBlockRegex)) {
      const moduleName = match[1]
      const moduleBody = match[2]

      const scenarioBodies = [...moduleBody.matchAll(/scenarioBody:\s*"([^"]+)"/g)].map((hit) => hit[1])

      const checklistItems = [...moduleBody.matchAll(/checklistItems:\s*\[([\s\S]*?)\]/g)]
        .flatMap((hit) => [...hit[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]))

      const quickCheckOptionLabels = [...moduleBody.matchAll(/quickCheckOptions:\s*\[([\s\S]*?)\]/g)]
        .flatMap((hit) => [...hit[1].matchAll(/label:\s*"([^"]+)"/g)].map((item) => item[1]))

      duplicateHits.push(...collectDuplicates(moduleName, "scenarioBody", scenarioBodies))
      duplicateHits.push(...collectDuplicates(moduleName, "checklistItems", checklistItems))
      duplicateHits.push(...collectDuplicates(moduleName, "quickCheckOptions", quickCheckOptionLabels))
    }

    expect(duplicateHits).toEqual([])
  })
})
