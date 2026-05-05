/**
 * TEXT DISPLAY COMPONENT
 * Renders formatted text content with different variants
 * Supports both string content and React children
 */

import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info } from "lucide-react"
import type { ReactNode } from "react"

interface TextDisplayProps {
  title?: string
  subtitle?: string
  content?: string
  children?: ReactNode
  variant?: "default" | "callout" | "warning" | "success" | "info"
  className?: string
}

export function TextDisplay({ title, subtitle, content, children, variant = "default", className }: TextDisplayProps) {
  // Icon mapping for different variants
  const icons = {
    callout: <Info className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    success: <CheckCircle2 className="h-5 w-5" />,
  }

  // Style mapping for variants
  const variantStyles = {
    default: "bg-card text-card-foreground",
    callout: "bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100 border-l-4 border-blue-500",
    info: "bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100 border-l-4 border-blue-500",
    warning: "bg-yellow-50 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-100 border-l-4 border-yellow-500",
    success: "bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100 border-l-4 border-green-500",
  }

  const hasChildren = children !== undefined
  const hasContent = content !== undefined

  return (
    <div className={cn("p-6 rounded-lg", variantStyles[variant], className)}>
      {title && (
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-1 font-heading">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground italic">{subtitle}</p>}
        </div>
      )}

      {variant !== "default" && (
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{icons[variant]}</div>
          <div className="flex-1">
            {hasChildren ? (
              <div className="prose prose-sm max-w-none dark:prose-invert">{children}</div>
            ) : hasContent ? (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {content.split("\n").map((line, index) => {
                  // Handle bullet points
                  if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
                    return (
                      <li key={index} className="ml-4">
                        {line.trim().substring(1).trim()}
                      </li>
                    )
                  }
                  // Handle bold text
                  const boldText = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  return <p key={index} dangerouslySetInnerHTML={{ __html: boldText }} className="mb-2" />
                })}
              </div>
            ) : null}
          </div>
        </div>
      )}
      {variant === "default" && (
        <>
          {hasChildren ? (
            <div className="prose prose-sm max-w-none dark:prose-invert">{children}</div>
          ) : hasContent ? (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {content.split("\n").map((line, index) => {
                if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
                  return (
                    <li key={index} className="ml-4">
                      {line.trim().substring(1).trim()}
                    </li>
                  )
                }
                const boldText = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                return <p key={index} dangerouslySetInnerHTML={{ __html: boldText }} className="mb-2" />
              })}
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
