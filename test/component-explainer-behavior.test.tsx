import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { CourseExplainerLayout } from "@/components/learning/component-explainer"

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

    expect(screen.getAllByText("Action checkpoint").length).toBeGreaterThan(0)
  })
})
