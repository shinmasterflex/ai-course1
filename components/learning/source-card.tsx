/**
 * SOURCE CARD COMPONENT
 * Displays academic and research sources with links
 * Consistent styling for citations and references
 */

import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Source {
  author: string
  title: string
  url: string
}

interface SourceCardProps {
  sources: Source[]
  className?: string
}

/**
 * SourceCard component for displaying academic references
 * Shows author names, titles, and clickable links to sources
 */
export function SourceCard({ sources, className }: SourceCardProps) {
  return (
    <Card className={cn("p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20", className)}>
      <div className="flex items-start gap-2 mb-3">
        <ExternalLink className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
        <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-green">Sources & References</h4>
      </div>

      <div className="space-y-3">
        {sources.map((source, index) => (
          <div key={index} className="text-sm">
            <p className="font-medium text-foreground mb-1">{source.author}</p>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-orange hover:text-brand-orange/80 hover:underline inline-flex items-center gap-1 transition-colors"
            >
              <span className="italic">{source.title}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ))}
      </div>
    </Card>
  )
}
