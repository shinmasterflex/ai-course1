import { describe, expect, it } from "vitest"
import {
  formatExplainerDescriptor,
  type ExplainerDescriptor,
} from "@/components/learning/component-explainer"

describe("explainer text transformation", () => {
  it("returns curated descriptors unchanged", () => {
    const descriptor: ExplainerDescriptor = {
      type: "m3",
      title: "Famous LLMs and who makes them",
      explanation:
        "Famous LLMs and who makes them is useful for understanding market structure. Providers differ in context windows, tool support, pricing, and governance defaults. Those differences shape which system is appropriate for a given workflow.",
    }

    const output = formatExplainerDescriptor(descriptor)

    expect(output).toEqual(descriptor)
  })

  it("does not transform synthesized course-content descriptors", () => {
    const descriptor: ExplainerDescriptor = {
      type: "Course content",
      title: "Famous LLMs and who makes them",
      explanation:
        "Paragraph one with grounded context.\n\nParagraph two with mechanism-level reasoning.\n\nParagraph three with decision implications.",
    }

    const output = formatExplainerDescriptor(descriptor)

    expect(output.explanation).toBe(descriptor.explanation)
  })
})
