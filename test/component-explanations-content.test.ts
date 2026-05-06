import { describe, expect, it } from "vitest"
import { COMPONENT_EXPLANATIONS } from "@/lib/component-explanations"

const BANNED_PATTERNS = [
  /\bmechanism\s*:/i,
  /\bboundary\s+case\s*:/i,
  /\bthis\s+card\b/i,
  /\bstudy\s+the\s+card\b/i,
  /\bnext\s+button\b/i,
]

const AI_KEYWORDS = ["ai", "model", "data", "learning", "system", "tool"]

describe("component explanations content quality", () => {
  it("contains many explainer entries", () => {
    expect(Object.keys(COMPONENT_EXPLANATIONS).length).toBeGreaterThan(20)
  })

  it("keeps explanations in clean ASCII text", () => {
    const invalid = Object.values(COMPONENT_EXPLANATIONS)
      .filter((entry) => /[^\x09\x0A\x0D\x20-\x7E]/.test(entry.explanation))
      .map((entry) => entry.id)

    expect(invalid).toEqual([])
  })

  it("avoids banned formatting and panel-meta phrasing", () => {
    const violations: string[] = []

    for (const entry of Object.values(COMPONENT_EXPLANATIONS)) {
      for (const pattern of BANNED_PATTERNS) {
        if (pattern.test(entry.explanation)) {
          violations.push(`${entry.id}: ${pattern}`)
        }
      }
    }

    expect(violations).toEqual([])
  })

  it("uses multi-paragraph instructional explanations", () => {
    const tooShort = Object.values(COMPONENT_EXPLANATIONS)
      .filter((entry) => {
        const paragraphs = entry.explanation
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean)
        return paragraphs.length < 3
      })
      .map((entry) => entry.id)

    expect(tooShort).toEqual([])
  })

  it("stays focused on AI learning context", () => {
    const offTopic = Object.values(COMPONENT_EXPLANATIONS)
      .filter((entry) => {
        const lower = entry.explanation.toLowerCase()
        return !AI_KEYWORDS.some((keyword) => lower.includes(keyword))
      })
      .map((entry) => entry.id)

    expect(offTopic).toEqual([])
  })
})
