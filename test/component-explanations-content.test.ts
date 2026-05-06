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
const META_OPENING_PATTERNS = [
  /^this (check|checkpoint|module|lesson|section|scenario|arc|opening section|flashcards?|walkthrough|segment|part)\b/i,
  /^these flashcards\b/i,
]

function extractSentences(value: string) {
  return value
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 40)
}

function sentenceStarter(sentence: string) {
  return sentence
    .toLowerCase()
    .replace(/^["'`\s]+/, "")
    .split(/\s+/)
    .slice(0, 2)
    .join(" ")
}

function normalizeWords(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
}

function firstParagraph(value: string) {
  return value
    .split(/\n\s*\n/)[0]
    ?.replace(/\s+/g, " ")
    .trim() ?? ""
}

function openingStem(value: string, words = 5) {
  return normalizeWords(firstParagraph(value)).slice(0, words).join(" ")
}

function fourGrams(value: string) {
  const words = normalizeWords(value)
  const grams: string[] = []

  for (let i = 0; i <= words.length - 4; i += 1) {
    const gram = words.slice(i, i + 4).join(" ")
    if (gram.length >= 16) {
      grams.push(gram)
    }
  }

  return grams
}

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

  it("opens on the concept instead of the component metadata", () => {
    const violations = Object.values(COMPONENT_EXPLANATIONS)
      .filter((entry) => META_OPENING_PATTERNS.some((pattern) => pattern.test(firstParagraph(entry.explanation))))
      .map((entry) => `${entry.id}: ${firstParagraph(entry.explanation)}`)

    expect(violations).toEqual([])
  })

  it("avoids duplicate sentences across explanations", () => {
    const allSentences = Object.values(COMPONENT_EXPLANATIONS).flatMap((entry) =>
      extractSentences(entry.explanation).map((sentence) => ({ id: entry.id, sentence })),
    )

    const grouped = new Map<string, string[]>()
    for (const item of allSentences) {
      const key = item.sentence.toLowerCase()
      const existing = grouped.get(key) ?? []
      existing.push(item.id)
      grouped.set(key, existing)
    }

    const duplicates = Array.from(grouped.entries())
      .filter(([, ids]) => ids.length > 1)
      .map(([sentence, ids]) => `${ids.join(", ")}: ${sentence}`)

    expect(duplicates).toEqual([])
  })

  it("keeps sentence starters varied", () => {
    const starters = Object.values(COMPONENT_EXPLANATIONS)
      .flatMap((entry) => extractSentences(entry.explanation))
      .map((sentence) => sentenceStarter(sentence))
      .filter((starter) => starter.length > 0)

    const counts = starters.reduce<Record<string, number>>((acc, starter) => {
      acc[starter] = (acc[starter] ?? 0) + 1
      return acc
    }, {})

    const overused = Object.entries(counts)
      .filter(([, count]) => count > 12)
      .map(([starter, count]) => `${starter}: ${count}`)

    expect(overused).toEqual([])
  })

  it("keeps first-paragraph openings varied", () => {
    const openings = Object.values(COMPONENT_EXPLANATIONS)
      .map((entry) => openingStem(entry.explanation))
      .filter((opening) => opening.length > 0)

    const counts = openings.reduce<Record<string, number>>((acc, opening) => {
      acc[opening] = (acc[opening] ?? 0) + 1
      return acc
    }, {})

    const repeated = Object.entries(counts)
      .filter(([, count]) => count > 3)
      .map(([opening, count]) => `${opening}: ${count}`)

    expect(repeated).toEqual([])
  })

  it("does not overuse 'this section' framing", () => {
    const matches = Object.values(COMPONENT_EXPLANATIONS)
      .flatMap((entry) => extractSentences(entry.explanation))
      .filter((sentence) => /^this section\b/i.test(sentence))

    expect(matches.length).toBeLessThanOrEqual(3)
  })

  it("limits repeated 4-word phrase templates", () => {
    const allGrams = Object.values(COMPONENT_EXPLANATIONS).flatMap((entry) => fourGrams(entry.explanation))

    const counts = allGrams.reduce<Record<string, number>>((acc, gram) => {
      acc[gram] = (acc[gram] ?? 0) + 1
      return acc
    }, {})

    const ignored = new Set([
      "should be able to",
      "you should be able",
      "what are the risks",
      "a machine learning system",
    ])

    const repeated = Object.entries(counts)
      .filter(([gram, count]) => count > 3 && !ignored.has(gram))
      .map(([gram, count]) => `${gram}: ${count}`)

    expect(repeated).toEqual([])
  })
})
