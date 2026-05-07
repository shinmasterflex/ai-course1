"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Send, Sparkle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AIChatPanelProps {
  isOpen: boolean
  onClose: () => void
}

const SUGGESTED_PROMPTS = [
  "What is artificial intelligence?",
  "How does machine learning work?",
  "What are large language models?",
  "How do I write a good AI prompt?",
  "What are the key topics in this course?",
]

function parseMarkdown(text: string) {
  const elements: React.ReactNode[] = []
  let key = 0

  // Split text into lines
  const lines = text.split("\n")
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()

    // Check if line is a bullet point
    if (line.startsWith("* ") || line.startsWith("- ")) {
      // Collect consecutive bullet points
      const listItems: string[] = []
      while (i < lines.length && (lines[i].trim().startsWith("* ") || lines[i].trim().startsWith("- "))) {
        const bulletText = lines[i].trim().substring(2) // Remove "* " or "- "
        listItems.push(bulletText)
        i++
      }

      // Create unordered list
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1 my-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-sm">
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </ul>,
      )
    } else if (line) {
      // Regular paragraph
      elements.push(
        <p key={key++} className="mb-2">
          {parseInlineMarkdown(line)}
        </p>,
      )
      i++
    } else {
      // Empty line
      i++
    }
  }

  return elements
}

function parseInlineMarkdown(text: string) {
  const parts: React.ReactNode[] = []
  let key = 0

  // Process bold text (**text**)
  const boldRegex = /\*\*(.+?)\*\*/g
  let lastIndex = 0
  let match

  while ((match = boldRegex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{text.substring(lastIndex, match.index)}</span>)
    }
    // Add bold text
    parts.push(
      <strong key={key++} className="font-semibold">
        {match[1]}
      </strong>,
    )
    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{text.substring(lastIndex)}</span>)
  }

  return parts.length > 0 ? parts : text
}

export function AIChatPanel({ isOpen, onClose }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI learning assistant. I can help you with questions about the course content, concepts, and anything else you'd like to know. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText ? messageText : input
    if (!textToSend.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history: messages }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ? data.error : "Failed to get response")
      }

      if (typeof data.response !== "string") {
        throw new Error("No response received.")
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: error instanceof Error ? error.message : "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-full md:w-[400px] bg-background border-l border-border shadow-2xl z-50 transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-border bg-background flex-shrink-0">
        <div className="flex items-center gap-2">
          <Sparkle className="h-5 w-5 text-brand-orange" />
          <h2 className="font-semibold text-lg text-brand-orange">AI Learning Assistant</h2>
        </div>
        <Button onClick={onClose} variant="ghost" size="icon" className="text-foreground hover:text-brand-orange">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-lg p-3 ${
                  message.role === "user" ? "bg-brand-orange text-white" : "bg-muted text-foreground"
                }`}
              >
                <div className="text-sm">
                  {message.role === "assistant" ? parseMarkdown(message.content) : message.content}
                </div>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3">
                <Loader2 className="h-5 w-5 animate-spin text-brand-orange" />
              </div>
            </div>
          )}

          {messages.length === 1 && !isLoading && (
            <div className="space-y-2 mt-4">
              <p className="text-xs text-muted-foreground font-medium">Suggested questions:</p>
              {SUGGESTED_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left text-sm p-3 rounded-lg bg-muted text-foreground border border-border hover:bg-orange-50 hover:border-orange-500 transition-all duration-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-background flex-shrink-0">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="flex-1 text-foreground"
          />
          <Button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="bg-brand-orange hover:bg-brand-orange/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
