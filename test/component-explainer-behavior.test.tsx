import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { CourseExplainerLayout } from "@/components/learning/component-explainer"
import { TextDisplay } from "@/components/learning/text-display"

vi.mock("next/navigation", () => ({
  usePathname: () => "/course/module-1",
  useSearchParams: () => new URLSearchParams("section=1"),
}))

function panelParagraphs(container: HTMLElement) {
  const panel = container.querySelector('[data-explainer-panel="true"]')
  expect(panel).not.toBeNull()
  return Array.from(panel!.querySelectorAll(".prose p"))
    .map((node) => (node.textContent?.trim() ? node.textContent.trim() : ""))
    .filter((text) => text.length > 0)
}

describe("CourseExplainerLayout behavior", () => {
  it("does not switch panel content for navigation buttons", () => {
    render(
      <CourseExplainerLayout>
        <button type="button">Next</button>
      </CourseExplainerLayout>,
    )

    fireEvent.pointerOver(screen.getByRole("button", { name: "Next" }))

    expect(screen.queryByText("Action checkpoint")).not.toBeInTheDocument()
    expect(screen.getAllByText("Learning support").length).toBeGreaterThan(0)
  })

  it("shows action explanation for non-navigation buttons", () => {
    render(
      <CourseExplainerLayout>
        <button type="button">Try Prompt</button>
      </CourseExplainerLayout>,
    )

    fireEvent.pointerOver(screen.getByRole("button", { name: "Try Prompt" }))

    expect(screen.queryByText("Action checkpoint")).not.toBeInTheDocument()
    expect(screen.getAllByText("Learning support").length).toBeGreaterThan(0)
  })

  it("does not synthesize explanations for uncatalogued content cards", () => {
    const { container } = render(
      <CourseExplainerLayout>
        <section data-slot="card">
          <h3>Famous LLMs and who makes them</h3>
          <p>Famous LLMs and who makes them is most useful when interpreted causally: what drives the outcome, what assumptions are required, and what breaks when assumptions fail.</p>
          <p>Famous LLMs and who makes them is a foundational concept. In AI, causal understanding is what lets you predict error patterns before they appear in production.</p>
          <p>If this idea is clear, you can explain tradeoffs, spot weak outputs, and reason through unfamiliar AI scenarios.</p>
        </section>
      </CourseExplainerLayout>,
    )

    fireEvent.pointerOver(screen.getByRole("heading", { name: "Famous LLMs and who makes them" }))

    const paragraphs = panelParagraphs(container)

    expect(paragraphs.length).toBeGreaterThanOrEqual(3)
    expect(screen.getAllByText("Explanation Panel").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Learning support").length).toBeGreaterThan(0)
  })

  it("keeps default panel content for multiple uncatalogued course cards", () => {
    const { container } = render(
      <CourseExplainerLayout>
        <section data-slot="card" data-testid="card-large-params">
          <h3>Why “large” parameters create new capabilities</h3>
          <p>Scale is not just about doing the same things better. It can produce qualitatively different capabilities through emergence.</p>
        </section>
        <section data-slot="card" data-testid="card-famous-llms">
          <h3>Famous LLMs and who makes them</h3>
          <p>Model providers differ in context windows, tool integration, pricing, and governance defaults.</p>
        </section>
        <section data-slot="card" data-testid="card-temperature">
          <h3>Temperature - why ChatGPT is not deterministic</h3>
          <p>Sampling temperature changes output variability, trading determinism for diversity.</p>
          <p>Low temperature usually increases consistency while high temperature increases variation.</p>
        </section>
      </CourseExplainerLayout>,
    )

    const headingTestIds = [
      "card-large-params",
      "card-famous-llms",
      "card-temperature",
    ]

    const outputTexts: string[] = []
    for (const testId of headingTestIds) {
      fireEvent.pointerOver(screen.getByTestId(testId))
      outputTexts.push(panelParagraphs(container).join("\n"))
    }

    expect(new Set(outputTexts).size).toBe(1)
    expect(screen.getAllByText("Learning support").length).toBeGreaterThan(0)
  })

  it("does not generate first-paragraph summaries for uncatalogued cards", () => {
    const { container } = render(
      <CourseExplainerLayout>
        <section data-slot="card" data-testid="card-prompt-debugging">
          <h3>Prompt debugging: why outputs fail and how to fix them</h3>
          <p>Failure: too generic. Fix: add audience, purpose, and situation.</p>
          <p>Failure: hallucinated details. Cause: model is filling gaps. Fix: instruct “if unsure, say unknown” and request assumptions explicitly.</p>
          <p>Failure: shallow reasoning. Cause: complex task with simple prompt. Fix: ask for step-by-step reasoning and final recommendation.</p>
        </section>
      </CourseExplainerLayout>,
    )

    fireEvent.pointerOver(screen.getByTestId("card-prompt-debugging"))

    const [firstParagraph] = panelParagraphs(container)
    expect(firstParagraph).toBeTruthy()
    expect(firstParagraph).toMatch(/this panel provides deeper educational context/i)
  })

  it("uses content-aware instructional copy for untitled learning text", () => {
    const { container } = render(
      <CourseExplainerLayout>
        <TextDisplay content="Training data matters because models learn statistical patterns from the examples they see. If the data is narrow, noisy, or biased, the model will reproduce those limits in its outputs." />
      </CourseExplainerLayout>,
    )

    fireEvent.pointerOver(screen.getByText(/training data matters/i))

    expect(screen.queryByText("Learning text")).not.toBeInTheDocument()
    expect(screen.getAllByText("Concept explanation").length).toBeGreaterThan(0)

    const [firstParagraph] = panelParagraphs(container)
    expect(firstParagraph).toMatch(/training data matters because models learn statistical patterns/i)
    expect(firstParagraph).not.toMatch(/this text block presents conceptual material/i)
  })
})
