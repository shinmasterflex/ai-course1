/**
 * PUBLIC HOMEPAGE
 * Landing page for the Introduction to AI course
 */

"use client"

import Link from "next/link"
import { PublicHeader } from "@/components/layout/public-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Brain, Zap, Shield, BookOpen, Cpu, MessageSquare, Wrench } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-green/10 via-emerald-50 to-brand-orange/10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block bg-brand-green/10 text-brand-green text-sm font-semibold px-4 py-2 rounded-full border border-brand-green/20">
              Free Beginner Course ? No Experience Required
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-brand-orange">Understand AI</span>{" "}
              <span className="text-brand-green">From Zero</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              A clear, jargon-free introduction to Artificial Intelligence. Learn what AI is, how it works, how to use it, and how to think critically about it ? all in one course.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg px-10 bg-brand-orange hover:bg-brand-orange/90 text-white">
                <Link href="/sign-in">Start Learning Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-10">
                <Link href="/demo">Preview Module 0</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 pt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" /> 7 Modules</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" /> Interactive Exercises</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" /> No Coding Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Why Learn AI?</h2>
              <p className="text-xl text-muted-foreground">
                AI is reshaping every industry. You don&apos;t need to be a programmer to benefit from it ? but you do need to understand it.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 hover:border-brand-green hover:shadow-2xl transition-all duration-300 group">
                <CardHeader>
                  <div className="bg-brand-green/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-10 w-10 text-brand-green" />
                  </div>
                  <CardTitle>Beginner Friendly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No math, no code. Just clear explanations with real-world examples anyone can follow.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-brand-orange hover:shadow-2xl transition-all duration-300 group">
                <CardHeader>
                  <div className="bg-brand-orange/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-10 w-10 text-brand-orange" />
                  </div>
                  <CardTitle>Practical & Actionable</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Learn how to use AI tools in your daily life and work ? starting from day one.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-brand-green hover:shadow-2xl transition-all duration-300 group">
                <CardHeader>
                  <div className="bg-brand-green/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-10 w-10 text-brand-green" />
                  </div>
                  <CardTitle>Critical Thinking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Understand AI ethics, bias, and safety so you can navigate the AI era with confidence.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-20 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">What You&apos;ll Learn</h2>
              <p className="text-xl text-muted-foreground">
                A step-by-step journey from &quot;What is AI?&quot; to confidently using AI tools in the real world.
              </p>
            </div>

            {/* Phase 1 */}
            <div>
              <h3 className="text-2xl font-bold text-brand-green mb-4">Phase 1: Understanding AI</h3>
              <div className="space-y-4">
                <Card className="border-2 hover:border-brand-green hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-green/10 p-3 rounded-lg">
                        <BookOpen className="h-6 w-6 text-brand-green" />
                      </div>
                      <div>
                        <CardTitle>Module 0: Welcome to AI</CardTitle>
                        <CardDescription className="text-base mt-1">Orient yourself ? what is this course and why does AI matter to you right now?</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 ml-4 text-sm text-muted-foreground">
                      <li>? How to use this course for maximum learning</li>
                      <li>? AI touchpoints already in your daily life</li>
                      <li>? The road ahead: what you will know by the end</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-brand-orange hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-orange/10 p-3 rounded-lg">
                        <Cpu className="h-6 w-6 text-brand-orange" />
                      </div>
                      <div>
                        <CardTitle>Module 1: What Is Artificial Intelligence?</CardTitle>
                        <CardDescription className="text-base mt-1">Cut through the hype. Learn a real, grounded definition of AI.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 ml-4 text-sm text-muted-foreground">
                      <li>? Defining AI in plain language</li>
                      <li>? A brief history: from chess computers to ChatGPT</li>
                      <li>? Narrow AI vs. General AI ? what we actually have today</li>
                      <li>? Common myths debunked</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-brand-green hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-green/10 p-3 rounded-lg">
                        <Brain className="h-6 w-6 text-brand-green" />
                      </div>
                      <div>
                        <CardTitle>Module 2: How Machines Learn</CardTitle>
                        <CardDescription className="text-base mt-1">Peek inside the black box ? without any equations.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 ml-4 text-sm text-muted-foreground">
                      <li>? What is machine learning? (Simple analogy-based explanation)</li>
                      <li>? Why training data is everything</li>
                      <li>? Neural networks as pattern-recognition machines</li>
                      <li>? What AI genuinely cannot do</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Phase 2 */}
            <div>
              <h3 className="text-2xl font-bold text-brand-orange mb-4">Phase 2: Using AI</h3>
              <div className="space-y-4">
                <Card className="border-2 hover:border-brand-orange hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-orange/10 p-3 rounded-lg">
                        <MessageSquare className="h-6 w-6 text-brand-orange" />
                      </div>
                      <div>
                        <CardTitle>Module 3: Large Language Models & Prompting</CardTitle>
                        <CardDescription className="text-base mt-1">Master the skill of talking to AI ? and getting great results every time.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 ml-4 text-sm text-muted-foreground">
                      <li>? How ChatGPT and similar tools actually work</li>
                      <li>? The anatomy of an effective prompt</li>
                      <li>? Techniques: role prompting, chain-of-thought, few-shot</li>
                      <li>? Hands-on practice exercises</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-brand-green hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-green/10 p-3 rounded-lg">
                        <Zap className="h-6 w-6 text-brand-green" />
                      </div>
                      <div>
                        <CardTitle>Module 4: AI Tools for Everyday Life</CardTitle>
                        <CardDescription className="text-base mt-1">A guided tour of the most useful AI tools available today.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 ml-4 text-sm text-muted-foreground">
                      <li>? AI writing assistants: ChatGPT, Claude, Gemini</li>
                      <li>? AI image generation: Midjourney, DALL¡¤E, Firefly</li>
                      <li>? Productivity tools: Notion AI, Copilot, Grammarly</li>
                      <li>? How to choose the right tool for any task</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Phase 3 */}
            <div>
              <h3 className="text-2xl font-bold text-brand-green mb-4">Phase 3: Thinking Critically & Building</h3>
              <div className="space-y-4">
                <Card className="border-2 hover:border-brand-green hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-green/10 p-3 rounded-lg">
                        <Shield className="h-6 w-6 text-brand-green" />
                      </div>
                      <div>
                        <CardTitle>Module 5: AI Ethics, Safety & Society</CardTitle>
                        <CardDescription className="text-base mt-1">Become an informed, responsible AI user.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 ml-4 text-sm text-muted-foreground">
                      <li>? How AI bias forms and why it matters</li>
                      <li>? Privacy: what data AI systems collect about you</li>
                      <li>? Deepfakes and misinformation in the AI age</li>
                      <li>? The future of AI regulation</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-brand-orange hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-orange/10 p-3 rounded-lg">
                        <Wrench className="h-6 w-6 text-brand-orange" />
                      </div>
                      <div>
                        <CardTitle>Module 6: Your AI Toolkit</CardTitle>
                        <CardDescription className="text-base mt-1">Put it all together and build your first AI-powered workflow.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 ml-4 text-sm text-muted-foreground">
                      <li>? No-code AI tools you can use today</li>
                      <li>? Building simple AI automations</li>
                      <li>? Your first AI mini-project</li>
                      <li>? Curated resources for going deeper</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold">Ready to Start?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of people who have already taken their first step into the AI era. No experience needed.
            </p>
            <Button asChild size="lg" className="text-lg px-12 bg-brand-orange hover:bg-brand-orange/90 text-white">
              <Link href="/sign-in">Start Learning Free</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
