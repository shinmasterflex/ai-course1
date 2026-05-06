"use client"

import { getExplainerAttributes } from "@/components/learning/component-explainer"
import { useMemo, useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

type ModuleHeroProps = {
  eyebrow: string
  title: string
  description: string
  objectives?: string[]
  imageSrc?: string
  imageAlt?: string
  componentId?: string
}

export function ModuleHero({
  eyebrow,
  title,
  description,
  objectives,
  imageSrc = "/graphics/module-path.svg",
  imageAlt = "Visual learning path for course progression",
  componentId,
}: ModuleHeroProps) {
  const defaultObjectives = useMemo(
    () => objectives ?? [
      "Read the lesson goal",
      "Complete at least one interaction",
      "Finish the end-of-module quiz",
    ],
    [objectives]
  )
  const [completedObjectives, setCompletedObjectives] = useState<Record<number, boolean>>({})

  const completedCount = Object.values(completedObjectives).filter(Boolean).length
  const progressPct = defaultObjectives.length > 0 ? Math.round((completedCount / defaultObjectives.length) * 100) : 0
  const explainerAttributes = getExplainerAttributes({
    type: "Module roadmap",
    title,
    explanation: `This hero section sets the stage for the module ahead. It's not just decoration—it serves crucial functions in your learning journey. First, it activates prior knowledge by connecting new material to context you already understand. Second, it establishes learning objectives, which research shows significantly improve how you learn by directing your attention and memory.

The objectives listed here are your learning roadmap. When you learn with clear goals, your brain is primed to notice and remember relevant information. This selective attention is why students who preview learning objectives before reading perform better than those who read without them.

As you progress through the module, return to this section occasionally. Seeing how much you've accomplished builds motivation and consolidates your sense of progress. This momentum compounds—completion breeds confidence, which increases engagement on subsequent topics.`,
  })

  return (
    <Card {...explainerAttributes} {...(componentId ? { "data-explainer-id": componentId } : {})} className="mb-8 overflow-hidden border-brand-indigo/20 bg-white/90">
      <div className="grid items-stretch lg:grid-cols-2">
        <div className="space-y-4 p-5 md:p-6">
          <p className="inline-flex rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-indigo">
            {eyebrow}
          </p>
          <h2 className="text-2xl font-semibold text-brand-indigo">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>

          <div className="rounded-lg border border-brand-green/20 bg-brand-green/5 p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-indigo">Quest objectives</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-semibold text-brand-green">
                <Trophy className="h-3 w-3" />
                {completedCount * 10} XP
              </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-white">
              <div className="h-full bg-brand-green transition-all duration-300" style={{ width: `${progressPct}%` }} />
            </div>

            <div className="mt-3 space-y-2">
              {defaultObjectives.map((objective, index) => {
                const done = completedObjectives[index] === true

                return (
                  <Button
                    key={`${objective}-${index}`}
                    type="button"
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-auto w-full justify-start px-3 py-2 text-left",
                      done && "border-green-600 bg-green-50 text-green-900 hover:bg-green-50"
                    )}
                    onClick={() => setCompletedObjectives((prev) => ({ ...prev, [index]: !prev[index] }))}
                  >
                    <CheckCircle2 className={cn("mr-2 h-4 w-4", done ? "text-green-600" : "text-muted-foreground")} />
                    {objective}
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
        <div className="border-t border-brand-indigo/10 bg-sky-50/60 p-4 lg:border-l lg:border-t-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={960}
            height={340}
            className="h-auto w-full rounded-xl border border-brand-indigo/10 bg-white object-cover"
          />
        </div>
      </div>
    </Card>
  )
}
