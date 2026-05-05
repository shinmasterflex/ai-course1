"use client"

import { useState } from "react"
import { Sparkle, ChevronLeft } from "lucide-react"
import { AIChatPanel } from "./ai-chat-panel"

export function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Collapsed AI Button - Styled similar to menu button but on right edge */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed -right-2 top-20 z-40 flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg hover:bg-muted transition-all duration-300 ease-in-out group hover:right-0"
          aria-label="Open AI Help"
        >
          <ChevronLeft className="h-4 w-4 text-brand-orange group-hover:text-brand-orange/80 transition-colors" />
          <span className="text-sm font-medium text-brand-orange">AI Help</span>
          <Sparkle className="h-4 w-4 text-brand-orange" />
        </button>
      )}

      {/* AI Chat Panel */}
      <AIChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
