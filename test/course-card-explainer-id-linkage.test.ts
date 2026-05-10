import { describe, expect, it } from "vitest"

import { getComponentExplanation } from "@/lib/course-content"
import { getSectionCourseContentEntries } from "@/lib/course-content"
import { getCourseStructure } from "@/lib/course-content"

const courseStructure = getCourseStructure()

describe("course card explainer id linkage", () => {
  it("links every section in course structure to at least one explanation entry", () => {
    const missing: string[] = []

    for (const module of courseStructure.modules) {
      for (const section of module.sections) {
        const sectionEntries = getSectionCourseContentEntries(module.id, section.id)
        const hasExplanation = sectionEntries.some((entry) => Boolean(getComponentExplanation(entry.id)))
        if (!hasExplanation) {
          missing.push(`${module.id}/${section.id}`)
        }
      }
    }

    expect(missing).toEqual([])
  })
})

