/**
 * COMPARISON CARD COMPONENT
 * Side-by-side comparison display for contrasting concepts
 * Used for Fixed vs Growth Mindset comparison
 */

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ComparisonItem {
  title: string
  subtitle?: string
  items: string[]
  color?: "green" | "orange" | "red"
}

interface ComparisonCardProps {
  leftSide: ComparisonItem
  rightSide: ComparisonItem
}

export function ComparisonCard({ leftSide, rightSide }: ComparisonCardProps) {
  const getColorClasses = (color?: string) => {
    switch (color) {
      case "green":
        return "border-brand-green/30 bg-brand-green/5"
      case "orange":
        return "border-brand-orange/30 bg-brand-orange/5"
      case "red":
        return "border-red-500/30 bg-red-50 dark:bg-red-950/20"
      default:
        return "border-border"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Side */}
      <Card className={cn("p-6 border-2", getColorClasses(leftSide.color))}>
        <h3 className="text-xl font-semibold mb-2 text-balance">{leftSide.title}</h3>
        {leftSide.subtitle && <p className="text-sm text-muted-foreground mb-4">{leftSide.subtitle}</p>}
        <ul className="space-y-3">
          {leftSide.items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-brand-green mt-1">•</span>
              <span className="flex-1 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Right Side */}
      <Card className={cn("p-6 border-2", getColorClasses(rightSide.color))}>
        <h3 className="text-xl font-semibold mb-2 text-balance">{rightSide.title}</h3>
        {rightSide.subtitle && <p className="text-sm text-muted-foreground mb-4">{rightSide.subtitle}</p>}
        <ul className="space-y-3">
          {rightSide.items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-brand-orange mt-1">•</span>
              <span className="flex-1 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
