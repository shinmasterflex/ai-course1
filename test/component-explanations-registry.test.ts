import fs from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"

import { COMPONENT_EXPLANATIONS } from "@/lib/course-content"

function getCoursePageFiles() {
  const courseDir = path.join(process.cwd(), "app", "course")
  const pages: string[] = []

  function walk(dirPath: string) {
    for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
      const fullPath = path.join(dirPath, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
        continue
      }

      if (entry.isFile() && entry.name === "page.tsx") {
        pages.push(fullPath)
      }
    }
  }

  walk(courseDir)
  return pages.sort()
}

function getUsedComponentIds() {
  const ids = new Set<string>()

  for (const filePath of getCoursePageFiles()) {
    const text = fs.readFileSync(filePath, "utf8")
    for (const match of text.matchAll(/componentId\s*=\s*"([^"]+)"/g)) {
      ids.add(match[1])
    }
  }

  return Array.from(ids).sort()
}

function normalizeExplanation(value: string | null) {
  return (value ?? "").replace(/\s+/g, " ").trim()
}

describe("component explanation registry coverage", () => {
  it("covers every componentId used in course pages", () => {
    const usedIds = getUsedComponentIds()
    const missing = usedIds.filter((id) => !COMPONENT_EXPLANATIONS[id])

    expect(missing).toEqual([])
  })

  it("keeps used component explanations textually unique", () => {
    const duplicates = new Map<string, string[]>()

    for (const id of getUsedComponentIds()) {
      const entry = COMPONENT_EXPLANATIONS[id]
      const key = normalizeExplanation(entry.explanation)
      const existing = duplicates.get(key) ? duplicates.get(key)! : []
      existing.push(id)
      duplicates.set(key, existing)
    }

    const repeated = Array.from(duplicates.values())
      .filter((ids) => ids.length > 1)
      .map((ids) => ids.join(", "))

    expect(repeated).toEqual([])
  })
})
