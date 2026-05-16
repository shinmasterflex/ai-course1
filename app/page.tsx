/**
 * PUBLIC HOMEPAGE
 * Landing page for the beginner AI course
 */

"use client"

import DashboardPage from "./course/page"

export default function HomePage() {
  const modules = getCourseStructure().modules

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-green/20 via-sky-50 to-brand-orange/20 py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-green/20 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-brand-orange/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-white/80 px-4 py-2 text-sm font-semibold text-brand-indigo">
                <Sparkles className="h-4 w-4 text-brand-orange" />
                  return <DashboardPage />
        </div>
      </section>

      {/* Course Overview */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-brand-indigo">Course Structure</h2>
              <p className="text-xl text-muted-foreground">
                Five modules for strategic AI execution across assessment, adoption, and value realization.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {modules.map((module) => {
                const moduleNum = module.id.replace("module-", "")
                const moduleLabel = module.title.includes(":") ? module.title.split(":").slice(1).join(":").trim() : module.title
                
                return (
                  <Card key={module.id} className="group overflow-hidden border-brand-green/20 hover:border-brand-orange/40 hover:shadow-md transition-all">
                    <CardHeader className="space-y-2">
                      <div className="text-sm font-semibold text-brand-orange">Module {moduleNum}</div>
                      <CardTitle className="text-lg leading-snug text-brand-indigo">{moduleLabel}</CardTitle>
                      <CardDescription className="text-sm">
                        {module.sections.length} lessons
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>

            <div className="rounded-2xl border border-brand-orange/20 bg-gradient-to-r from-brand-green/10 via-white to-brand-orange/10 p-8 text-center">
              <h3 className="text-2xl font-bold text-brand-indigo">Ready to Execute?</h3>
              <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
                Start the course and build practical AI confidence you can apply in real work.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                  <Link href="/course" className="inline-flex items-center gap-2">
                    Start Overview of AI for Business Leaders
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

