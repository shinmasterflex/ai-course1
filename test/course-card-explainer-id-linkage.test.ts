import { describe, expect, it } from "vitest"

import { courseStructure } from "@/lib/course-structure"
import { getComponentExplanation } from "@/lib/component-card-content"

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
