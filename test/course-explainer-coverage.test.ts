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
  const getExplainerAttributesMatch = text.match(/getExplainerAttributes\s*\(/g)
  const componentIdsMatch = text.match(/componentId\s*=\s*"/g)
  const moduleQuizMatch = text.match(/<ModuleQuiz\b/g)
  const getExplainerAttributes = (getExplainerAttributesMatch ? getExplainerAttributesMatch : []).length
  const componentIds = (componentIdsMatch ? componentIdsMatch : []).length
  const moduleQuiz = (moduleQuizMatch ? moduleQuizMatch : []).length

  return {
    file: relativeFile,
    getExplainerAttributes,
    componentIds,
    moduleQuiz,
    total: getExplainerAttributes + componentIds + moduleQuiz,
  }
}

describe("course explainer coverage audit", () => {
  it("keeps explicit explainer wiring in the shared module page component", () => {
    const sharedModulePage = path.join(process.cwd(), "components", "learning", "course-module-page.tsx")
    const stats = collectCoverage(sharedModulePage)

    expect(stats.total).toBeGreaterThanOrEqual(2)
  })

  it("keeps every module page delegated to the shared module page component", () => {
    const stats = getCoursePageFiles().map(collectCoverage)

    const missing = stats
      .filter((item) => /app\/course\/module-\d+\/page\.tsx$/.test(item.file))
      // Module 0 now lives at the public /try preview route. Its legacy
      // /course/module-0 page is intentionally a redirect stub and does
      // not render CourseModulePage.
      .filter((item) => !/app\/course\/module-0\/page\.tsx$/.test(item.file))
      .filter((item) => {
        const source = fs.readFileSync(path.join(process.cwd(), item.file), "utf8")
        return !/CourseModulePage/.test(source) || !/moduleId="module-\d+"/.test(source)
      })
      .map((item) => item.file)

    expect(missing).toEqual([])
  })

  it("keeps the legacy /course/module-0 page as a redirect to /try", () => {
    const legacyPath = path.join(process.cwd(), "app", "course", "module-0", "page.tsx")
    const source = fs.readFileSync(legacyPath, "utf8")

    expect(source).toMatch(/redirect\(/)
    expect(source).toMatch(/\/try/)
  })

  it("keeps the shared module page above the minimum explicit coverage threshold", () => {
    const sharedModulePage = path.join(process.cwd(), "components", "learning", "course-module-page.tsx")
    const stats = collectCoverage(sharedModulePage)

    expect(stats.total).toBeGreaterThanOrEqual(2)
  })

  it("keeps the course dashboard explicitly wired to explainer content", () => {
    const stats = getCoursePageFiles().map(collectCoverage)
    const dashboard = stats.find((item) => item.file === "app/course/page.tsx")

    expect(dashboard).toBeDefined()
    expect(dashboard?.total).toBeGreaterThanOrEqual(1)
  })
})
