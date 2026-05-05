import Image from "next/image"
import { Card } from "@/components/ui/card"

type ModuleHeroProps = {
  eyebrow: string
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
}

export function ModuleHero({ eyebrow, title, description, imageSrc = "/graphics/module-path.svg", imageAlt = "Visual learning path for course progression" }: ModuleHeroProps) {
  return (
    <Card className="mb-8 overflow-hidden border-brand-indigo/20 bg-white/90">
      <div className="grid items-stretch lg:grid-cols-2">
        <div className="space-y-3 p-5 md:p-6">
          <p className="inline-flex rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-indigo">
            {eyebrow}
          </p>
          <h2 className="text-2xl font-semibold text-brand-indigo">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
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
