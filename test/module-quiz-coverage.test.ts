import { describe, expect, it } from "vitest"
import { courseStructure } from "@/lib/course-structure"
import { moduleQuizData } from "@/lib/module-quiz-data"

describe("module quiz coverage", () => {
  it("keeps module-quiz as the final section for modules 1-10", () => {
    const invalidModules = courseStructure.modules
      .filter(
        (module) =>
          module.id !== "module-0" &&
          (module.sections.length === 0 || module.sections[module.sections.length - 1]?.id !== "module-quiz"),
      )
      .map((module) => module.id)

    expect(invalidModules).toEqual([])
  })

  it("keeps non-empty quiz data for every module", () => {
    const modulesMissingQuizData = courseStructure.modules
      .filter((module) => {
        const questions = moduleQuizData[module.id] ?? []
        return questions.length === 0
      })
      .map((module) => module.id)

    expect(modulesMissingQuizData).toEqual([])
  })

  it("keeps quiz question keys unique within each module", () => {
    const modulesWithDuplicateKeys = courseStructure.modules
      .filter((module) => {
        const keys = (moduleQuizData[module.id] ?? []).map((question) => question.key)
        return new Set(keys).size !== keys.length
      })
      .map((module) => module.id)

    expect(modulesWithDuplicateKeys).toEqual([])
  })
})
