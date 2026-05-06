import fs from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"

type CoverageStats = {
  file: string
  getExplainerAttributes: number
  componentIds: number
  moduleQuiz: number
  total: number
}

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

function collectCoverage(filePath: string): CoverageStats {
  const text = fs.readFileSync(filePath, "utf8")
  const relativeFile = path.relative(process.cwd(), filePath).replace(/\\/g, "/")
  const getExplainerAttributes = (text.match(/getExplainerAttributes\s*\(/g) ?? []).length
  const componentIds = (text.match(/componentId\s*=\s*"/g) ?? []).length
  const moduleQuiz = (text.match(/<ModuleQuiz\b/g) ?? []).length

  return {
    file: relativeFile,
    getExplainerAttributes,
    componentIds,
    moduleQuiz,
    total: getExplainerAttributes + componentIds + moduleQuiz,
  }
}

describe("course explainer coverage audit", () => {
  it("keeps explicit explainer wiring on every course page", () => {
    const stats = getCoursePageFiles().map(collectCoverage)

    const missing = stats
      .filter((item) => item.total === 0)
      .map((item) => item.file)

    expect(missing).toEqual([])
  })

  it("keeps module pages above the minimum explicit coverage threshold", () => {
    const stats = getCoursePageFiles().map(collectCoverage)

    const underCovered = stats
      .filter((item) => /app\/course\/module-\d+\/page\.tsx$/.test(item.file))
      .filter((item) => item.total < 2)
      .map((item) => `${item.file} (total=${item.total})`)

    expect(underCovered).toEqual([])
  })

  it("keeps the course dashboard explicitly wired to explainer content", () => {
    const stats = getCoursePageFiles().map(collectCoverage)
    const dashboard = stats.find((item) => item.file === "app/course/page.tsx")

    expect(dashboard).toBeDefined()
    expect(dashboard?.total).toBeGreaterThanOrEqual(1)
  })
})
