/**
 * MODULE 5: CODING CRASH COURSE FOR AI
 */

"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { QuickCheckCard } from "@/components/learning/lesson-interactions"
import { ModuleHero } from "@/components/learning/module-hero"
import { ModuleQuiz } from "@/components/learning/module-quiz"
import { ProgressBar } from "@/components/learning/progress-bar"
import { TextDisplay } from "@/components/learning/text-display"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { useProgress } from "@/hooks/use-progress"
import { useSectionInteractionGate } from "@/hooks/use-section-interaction-gate"
import { moduleQuizData } from "@/lib/module-quiz-data"
import { Bug, CheckCircle2, Code2, FunctionSquare, GitBranch, Repeat } from "lucide-react"

export default function Module5Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-5"
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = useMemo(() => module?.sections ?? [], [module])
  const totalSections = sections.length
  const completedSectionIds = getCompletedSections(MODULE_ID)

  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz(MODULE_ID, ["quiz1", "quiz2", "quiz3"])
  const questions = moduleQuizData[MODULE_ID]

  const sectionParam = useMemo(() => searchParams?.get("section"), [searchParams])

  useEffect(() => {
    if (sectionParam && sections.length > 0) {
      const idx = sections.findIndex((s) => s.id === sectionParam)
      if (idx !== -1 && idx !== currentSectionIndex) {
        setCurrentSectionIndex(idx)
      }
    }
  }, [currentSectionIndex, sectionParam, sections])

  useEffect(() => {
    if (allQuizComplete && currentSectionIndex === totalSections - 1) {
      const last = sections[totalSections - 1]
      if (last) {
        markSectionComplete(MODULE_ID, last.id)
        setCurrentPosition(MODULE_ID, last.id)
      }
    }
  }, [allQuizComplete, currentSectionIndex, markSectionComplete, sections, setCurrentPosition, totalSections])

  const { canAdvance, markSectionInteractionComplete } = useSectionInteractionGate({
    currentSectionIndex,
    requiredSections: [5],
  })

  const handleSectionComplete = () => {
    if (!canAdvance && currentSectionIndex === 5) {
      return
    }

    const current = sections[currentSectionIndex]
    if (current) {
      markSectionComplete(MODULE_ID, current.id)
      setCurrentPosition(MODULE_ID, current.id)
    }

    if (currentSectionIndex < totalSections - 1) {
      const next = sections[currentSectionIndex + 1]
      setCurrentSectionIndex(currentSectionIndex + 1)
      router.push(`/course/module-5?section=${next.id}`)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-4xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Module 5: Coding Crash Course for AI</h1>
            <p className="text-lg text-muted-foreground mb-4">Learn beginner coding through AI-flavored examples, not abstract syntax drills.</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {currentSectionIndex === 0 && (
            <ModuleHero
              eyebrow="Module 5"
              title="Build coding intuition for real AI workflows"
              description="Use plain-language analogies and short Python snippets to understand variables, logic, loops, functions, and debugging."
              imageSrc="/images/modules/module-5.jpg"
              imageAlt="Beginner-friendly coding for AI use cases"
            />
          )}

          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay
                variant="callout"
                content="Think of coding as training a super-literal intern: if your instructions are clear, it performs fast and consistently. This module focuses on intuition first and syntax second."
              />
              <Card className="p-5 space-y-2">
                {[
                  "Variables and data types using everyday AI examples",
                  "Conditionals for routing tasks like an AI triage assistant",
                  "Loops for batch-processing text and automation",
                  "Functions for reusable prompt and workflow building",
                  "Debugging mindset: reading errors without panic",
                  "Mini project: build a tiny AI text helper script",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Start Module
              </Button>
            </div>
          )}

          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Variables and Data Types</h2>
              <TextDisplay content="Analogy: variables are labeled jars in your AI kitchen. You store different ingredients (text, numbers, true/false flags) and combine them to create output." />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2">
                  <Code2 className="h-4 w-4" />
                  Try this Python snippet
                </h3>
                <pre className="rounded-lg bg-muted p-4 text-xs overflow-x-auto">
                  <code>{`# Inputs your AI helper might need
user_message = "Summarize this email in 1 sentence"
max_words = 15
is_urgent = True
tags = ["client", "deadline", "budget"]

print(type(user_message))  # str
print(type(max_words))     # int
print(type(is_urgent))     # bool
print(type(tags))          # list`}</code>
                </pre>
                <p className="text-sm text-muted-foreground mt-3">Edit one value and run it mentally: what changes in behavior if max_words is "15" (text) instead of 15 (number)?</p>
              </Card>
              <QuickCheckCard
                prompt="Micro-challenge: Which variable is best represented as a boolean in an AI workflow?"
                options={[
                  { id: "a", label: "user_prompt = \"Write a tweet\"" },
                  { id: "b", label: "token_limit = 300" },
                  { id: "c", label: "needs_human_review = True" },
                  { id: "d", label: "keywords = [\"refund\", \"delay\"]" },
                ]}
                correctOptionId="c"
                explanation="Correct. A boolean expresses a yes/no state, such as whether an output should be reviewed by a human."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Card className="p-5 bg-brand-orange/5 border-brand-orange/20">
                <h3 className="font-semibold mb-2 text-brand-orange">Micro-challenge</h3>
                <p className="text-sm text-muted-foreground">Create your own four variables for an AI note summarizer: one string, one number, one boolean, and one list.</p>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Conditionals (if/else)</h2>
              <TextDisplay content="Analogy: conditionals are a decision gate at an airport. Based on what the input contains, your script sends it down different lanes." />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-brand-orange" />
                  AI triage example
                </h3>
                <pre className="rounded-lg bg-muted p-4 text-xs overflow-x-auto">
                  <code>{`message = "I want a refund, this failed twice"

if "refund" in message.lower():
    route = "billing_queue"
elif "bug" in message.lower() or "failed" in message.lower():
    route = "technical_support"
else:
    route = "general_assistant"

print(route)`}</code>
                </pre>
                <p className="text-sm text-muted-foreground mt-3">Change the message text and predict the route before reading the output.</p>
              </Card>
              <QuickCheckCard
                prompt="Micro-challenge: Why use conditionals in AI automation?"
                options={[
                  { id: "a", label: "To make every input follow the exact same path" },
                  { id: "b", label: "To choose behavior based on rules in the input" },
                  { id: "c", label: "To remove variables from the script" },
                  { id: "d", label: "To avoid debugging" },
                ]}
                correctOptionId="b"
                explanation="Conditionals help your workflow react intelligently to different cases."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Card className="p-5 bg-brand-green/5 border-brand-green/20">
                <h3 className="font-semibold mb-2 text-brand-green">Micro-challenge</h3>
                <p className="text-sm text-muted-foreground">Add one more rule: if the message contains "cancel", route it to "retention_team".</p>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Loops (for/while)</h2>
              <TextDisplay content="Analogy: a loop is a conveyor belt. Instead of repeating yourself, you define one action and apply it to every item." />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-brand-green">
                  <Repeat className="h-4 w-4" />
                  Batch text processing example
                </h3>
                <pre className="rounded-lg bg-muted p-4 text-xs overflow-x-auto">
                  <code>{`comments = [
    "Great explanation",
    "Too long",
    "Very helpful tutorial",
    "Not clear"
]

for c in comments:
    if "great" in c.lower() or "helpful" in c.lower():
        label = "positive"
    else:
        label = "needs_review"
    print(c, "->", label)`}</code>
                </pre>
                <p className="text-sm text-muted-foreground mt-3">This is the same pattern used to classify many user messages quickly.</p>
              </Card>
              <QuickCheckCard
                prompt="Micro-challenge: What is the key value of loops in AI workflows?"
                options={[
                  { id: "a", label: "They avoid processing collections" },
                  { id: "b", label: "They run one rule across many inputs efficiently" },
                  { id: "c", label: "They replace all conditionals" },
                  { id: "d", label: "They prevent all runtime errors" },
                ]}
                correctOptionId="b"
                explanation="Exactly. Loops are ideal for repetitive tasks like evaluating many comments, prompts, or files."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              <Card className="p-5 bg-brand-orange/5 border-brand-orange/20">
                <h3 className="font-semibold mb-2 text-brand-orange">Micro-challenge</h3>
                <p className="text-sm text-muted-foreground">Count how many comments were labeled "positive" by adding a counter variable.</p>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Functions and Reuse</h2>
              <TextDisplay content="Analogy: a function is a coffee machine button. Press it with the right inputs and it reliably produces the same style of output." />
              <Card className="p-5 bg-brand-green/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2">
                  <FunctionSquare className="h-4 w-4" />
                  A practical checklist
                </h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Use one responsibility per function.</li>
                  <li>Pass clear inputs (parameters).</li>
                  <li>Return one predictable output shape.</li>
                  <li>Avoid hidden side effects when possible.</li>
                </ul>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange">Reusable AI prompt helper</h3>
                <pre className="rounded-lg bg-muted p-4 text-xs overflow-x-auto">
                  <code>{`def build_prompt(task, tone="clear", max_words=40):
    return f"Task: {task}\\nTone: {tone}\\nMax words: {max_words}"

print(build_prompt("Summarize this meeting"))
print(build_prompt("Write a product headline", tone="playful", max_words=12))`}</code>
                </pre>
              </Card>
              <QuickCheckCard
                prompt="Micro-challenge: Why wrap this logic in a function?"
                options={[
                  { id: "a", label: "To make the script longer" },
                  { id: "b", label: "To reuse the same prompt-building logic with different inputs" },
                  { id: "c", label: "To avoid passing parameters" },
                  { id: "d", label: "To remove return values" },
                ]}
                correctOptionId="b"
                explanation="Reusable functions let you avoid copy-paste and keep behavior consistent."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Card className="p-5 bg-brand-green/5 border-brand-green/20">
                <h3 className="font-semibold mb-2 text-brand-green">Micro-challenge</h3>
                <p className="text-sm text-muted-foreground">Add a new parameter called audience and include it in the returned prompt text.</p>
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Debugging Mindset + Mini Project</h2>
              <TextDisplay content="Debugging is detective work. Your job is to compare expectation vs reality, then narrow where they split. Stay calm, inspect clues, and test one fix at a time." />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Bug className="h-4 w-4 text-brand-orange" />
                  Debug in this order
                </h3>
                <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Reproduce the issue consistently.</li>
                  <li>Read the error message top-to-bottom (especially line number and exception type).</li>
                  <li>Check input values and data types.</li>
                  <li>Print intermediate values to find the first wrong step.</li>
                  <li>Fix one thing, then re-run.</li>
                </ol>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">Common beginner mistakes</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Using a string where a number is expected ("20" vs 20).</li>
                  <li>Typos in variable names (token_limit vs tokens_limit).</li>
                  <li>Wrong indentation in Python blocks.</li>
                  <li>Assuming data exists without checking empties.</li>
                </ul>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange">Read the error, then fix</h3>
                <pre className="rounded-lg bg-muted p-4 text-xs overflow-x-auto">
                  <code>{`# Buggy
max_words = "20"
print(max_words + 5)  # TypeError: can only concatenate str (not "int") to str

# Fixed
max_words = int("20")
print(max_words + 5)  # 25`}</code>
                </pre>
              </Card>
              <Card className="p-5 bg-brand-green/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">Mini project: AI text helper script</h3>
                <p className="text-sm text-muted-foreground mb-3">Goal: ask for text input, then either call an AI API (if API key exists) or use a local fallback transformation.</p>
                <p className="text-sm text-muted-foreground mb-3">Companion runnable file: <span className="font-mono">scripts/module-5-ai-text-helper.py</span></p>
                <pre className="rounded-lg bg-muted p-4 text-xs overflow-x-auto">
                  <code>{`import os

user_text = input("Paste text to process: ")

def local_fallback(text):
    words = text.split()
    return {
        "word_count": len(words),
        "preview": " ".join(words[:12])
    }

api_key = os.getenv("OPENAI_API_KEY")

if api_key:
    # Pseudocode placeholder for an AI API call.
    # Replace with your preferred SDK request.
    print("API key found. Send prompt to AI API here.")
else:
    print("No API key found. Using local fallback.")
    print(local_fallback(user_text))`}</code>
                </pre>
                <p className="text-sm text-muted-foreground mt-3">Stretch goal: add a function that labels text as short, medium, or long based on word count.</p>
              </Card>
              <QuickCheckCard
                prompt="Checkpoint: What should you do first when code fails?"
                options={[
                  { id: "a", label: "Delete the entire script and start over" },
                  { id: "b", label: "Read the error carefully, reproduce it, and isolate the failing step" },
                  { id: "c", label: "Keep changing random lines until it works" },
                  { id: "d", label: "Assume the Python interpreter is broken" },
                ]}
                correctOptionId="b"
                explanation="Great debugging starts with evidence from the error and a reproducible failure path."
                onAnswered={() => markSectionInteractionComplete(5)}
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              {!canAdvance && <p className="text-sm text-muted-foreground">Complete the debugging checkpoint to unlock the module quiz.</p>}
              <Button disabled={!canAdvance} onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <TextDisplay content="Answer all three questions to complete your AI Coding Crash Course." />
              <ModuleQuiz questions={questions} results={quizResults} onAnswer={handleQuizComplete} />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Great work. You now have the beginner coding intuition to automate simple AI workflows with confidence." />
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-brand-green hover:bg-brand-green/90 text-white" onClick={() => router.push("/course/module-6")}>
                      Continue to Module 6
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => router.push("/course")}>Dashboard</Button>
                  </div>
                </div>
              )}
              {!allQuizComplete && (
                <p className="text-sm text-muted-foreground">Answer all three questions above to complete this module.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
