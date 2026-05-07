import { describe, expect, it } from "vitest"

import { getComponentExplanation } from "@/lib/course-content"
import { getCourseStructure } from "@/lib/course-content"

const courseStructure = getCourseStructure()

describe("course card explainer id linkage", () => {
  it("links every section scenario card to an explanation entry", () => {
    const missing: string[] = []

    for (const module of courseStructure.modules) {
      for (const section of module.sections) {
        const id = `${module.id}-${section.id}-scenario`
        if (!getComponentExplanation(id)) {
          missing.push(id)
        }
      }
    }

    expect(missing).toEqual([])
  })

  it("links every section quick-check card to an explanation entry", () => {
    const missing: string[] = []

    for (const module of courseStructure.modules) {
      for (const section of module.sections) {
        const id = `${module.id}-${section.id}-quick-check`
        if (!getComponentExplanation(id)) {
          missing.push(id)
        }
      }
    }

    expect(missing).toEqual([])
  })

  it("links every module quiz card to an explanation entry", () => {
    const missing = courseStructure.modules
      .map((module) => `${module.id}-course-quiz`)
      .filter((id) => !getComponentExplanation(id))

    expect(missing).toEqual([])
  })
})

