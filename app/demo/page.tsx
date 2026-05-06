/**
 * DEMO PAGE
 * Full Module 0 content as a demo of the course
 * Includes interactive components and OCEAN personality test
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { PublicHeader } from "@/components/layout/public-header"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, CheckCircle2, Target, Users, TrendingDown, Clock } from "lucide-react"
export default function DemoPage() {
  const searchParams = useSearchParams()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set())

  // Demo sections (same as module 0)
  const sections = useMemo(
    () => [
      { id: "about-cognijin", title: "About Cognijin" },
      { id: "the-problem", title: "The Problem" },
      { id: "our-solution", title: "Our Solution" },
      { id: "the-product", title: "The Product" },
      { id: "strategic-model", title: "Strategic Model" },
      { id: "big-five-factors", title: "Big Five Factors" },
      { id: "action-plan", title: "Action Plan" },
      { id: "summary", title: "Summary" },
    ],
    []
  )
  const totalSections = sections.length

  useEffect(() => {
    const sectionParam = searchParams?.get("section")
    if (sectionParam) {
      const sectionIndex = sections.findIndex((s) => s.id === sectionParam)
      if (sectionIndex !== -1 && sectionIndex !== currentSectionIndex) {
        setCurrentSectionIndex(sectionIndex)
      }
    }
  }, [searchParams, sections, currentSectionIndex])

  const handleSectionComplete = () => {
    setCompletedSections(prev => new Set([...prev, currentSectionIndex]))

    if (currentSectionIndex < totalSections) {
      const nextIndex = currentSectionIndex + 1
      setCurrentSectionIndex(nextIndex)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Module 0: Introduction to Cognijin</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Experience the full Introduction module - Discover how personality assessment drives sales success
          </p>
          <ProgressBar current={completedSections.size} total={totalSections} label="Module Progress" />
        </div>

        <Card className="mb-8 overflow-hidden border-brand-indigo/20 bg-white/90">
          <div className="grid items-stretch lg:grid-cols-2">
            <div className="space-y-4 p-6 md:p-7">
              <p className="inline-flex rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-indigo">
                Visual Preview
              </p>
              <h2 className="text-2xl font-semibold text-brand-indigo">Explore the full learning journey before enrolling</h2>
              <p className="text-sm text-muted-foreground">
                This demo highlights how Cognijin combines clear structure, practical lessons, and milestone-based progress.
              </p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold text-brand-indigo">
                <div className="rounded-lg border border-brand-green/30 bg-brand-green/10 p-2">8 Sections</div>
                <div className="rounded-lg border border-brand-indigo/20 bg-brand-indigo/10 p-2">Interactive</div>
                <div className="rounded-lg border border-brand-orange/30 bg-brand-orange/10 p-2">Practical</div>
              </div>
            </div>
            <div className="border-t border-brand-indigo/10 bg-sky-50/60 p-4 lg:border-l lg:border-t-0">
              <Image
                src="/graphics/module-path.svg"
                alt="Illustrated learning roadmap"
                width={960}
                height={340}
                className="h-auto w-full rounded-xl border border-brand-indigo/10 bg-white"
                priority
              />
            </div>
          </div>
        </Card>

          {/* Section 0: About Us */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6" id="about">
              <h2 className="text-3xl font-bold text-brand-green">About Cognijin</h2>

              <TextDisplay
                variant="callout"
                content="At Cognijin, everything we do is to strengthen entrepreneurial and sales success through personality trait assessment."
              />

              <TextDisplay content="Our application of the Big 5 Personality Assessment identifies specific strategies entrepreneurs should leverage to increase their success. Additionally, The Big 5 identifies where your personality traits can hold you back." />

              <TextDisplay content="So, if you are the type of person who always looks for a competitive edge, then a look inside yourself may be the answer." />

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-3">Personality Traits Are Tendencies. Mindset Is Character.</h3>
                <p className="mb-3">Understanding the difference:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Personality traits are your natural tendencies: how you're inclined to think, feel, and behave</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Mindset is your character: the conscious choices you make despite your tendencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>You can't change your personality traits, but you can develop strategies to work with them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Character develops through awareness, discipline, and intentional action aligned with your goals</span>
                  </li>
                </ul>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white">
                Continue to Problem Statement
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 1: The Problem */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6" id="problem">
              <h2 className="text-3xl font-bold text-brand-green">The Problem</h2>

              <TextDisplay
                variant="warning"
                content="Few, if any, companies leverage the most complete personality assessment known as the Big Five Aspects Model (BFAM) for sales success."
              />

              

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white">
                Continue to Solution
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 2: The Solution */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6" id="solution">
              <h2 className="text-3xl font-bold text-brand-green">Our Solution</h2>

              <TextDisplay
                variant="success"
                content="Cognijin provides the most comprehensive personality-driven sales training in the market today."
              />

              <TextDisplay
                variant="callout"
                content="Click each card to discover more details about our solution."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Complete Picture",
                    summary: "A complete personality map for sales performance.",
                    detail: "Other assessments measure fragments. Cognijin uses the Big Five Aspects Model to cover all 10 aspects across 5 major traits.",
                    accent: "text-brand-green",
                  },
                  {
                    title: "Personalized Approach",
                    summary: "Designed for entrepreneurs and sales professionals who need specific traction.",
                    detail: "The program targets the tendencies that hold you back while strengthening the traits that already support performance.",
                    accent: "text-brand-green",
                  },
                  {
                    title: "Smart Investment",
                    summary: "Better hiring and training decisions reduce wasted spend.",
                    detail: "Teams can stop investing in generic training and focus on strategies that actually match how people work and sell.",
                    accent: "text-brand-orange",
                  },
                  {
                    title: "Comprehensive Analysis",
                    summary: "A fast assessment that leads to an actionable improvement plan.",
                    detail: "The BFAM assessment takes about 15 minutes, then translates the results into a practical strategy for growth.",
                    accent: "text-brand-orange",
                  },
                ].map(({ title, summary, detail, accent }) => (
                  <Card key={title} className="p-6 space-y-4">
                    <div className="flex justify-center">
                      <CheckCircle2 className={`h-8 w-8 ${accent}`} />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className={`text-xl font-semibold ${accent}`}>{title}</h3>
                      <p className="text-sm">{summary}</p>
                      <p className="text-sm text-muted-foreground">{detail}</p>
                    </div>
                  </Card>
                ))}
              </div>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white">
                Continue to Product Overview
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 3: The Product */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6" id="product">
              <h2 className="text-3xl font-bold text-brand-green">The Product</h2>

              <Card className="p-8 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-2xl font-bold mb-6 text-center">Your Competitive Opportunity</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-green mb-2">10</div>
                    <div className="font-semibold">UNIQUE</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-green mb-2">1st</div>
                    <div className="font-semibold">FIRST TO MARKET</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-orange mb-2">15m</div>
                    <div className="font-semibold">TESTED</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-orange mb-2">100%</div>
                    <div className="font-semibold">AUTHENTIC</div>
                  </div>
                </div>
              </Card>

              <h3 className="text-2xl font-semibold">Product Benefits</h3>

              

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white">
                Continue to Strategic Model
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 4: Strategic Model */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6" id="strategic-model">
              <h2 className="text-3xl font-bold text-brand-green">Strategic Model</h2>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Our Three-Step Approach</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-xl">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Identify Traits</h4>
                      <p className="text-muted-foreground">
                        Based on The Big Five Aspects Model, we identify your unique personality profile across all five
                        major traits and their aspects.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-xl">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Purpose</h4>
                      <p className="text-muted-foreground">
                        Tailored action plans for maximum effectiveness. We create specific strategies that work with
                        your personality, not against it.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-xl">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Outcome</h4>
                      <p className="text-muted-foreground">
                        Engaged and productive salesforce. Transform personality insights into measurable sales
                        performance improvements.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <TextDisplay
                variant="callout"
                content="This model moves you from WASTE to SALES by eliminating unproductive behaviors and amplifying your natural strengths."
              />

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white">
                Continue to Big Five Overview
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 5: Big Five Overview */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6" id="big-five">
              <h2 className="text-3xl font-bold text-brand-green">The Big Five Personality Factors</h2>

              

              <TextDisplay
                variant="callout"
                content="Click each card to flip between high and low ratings. Understanding both sides helps you recognize your complete personality profile."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Openness Flip Card */}
                

                {/* Conscientiousness Flip Card */}
                

                {/* Extraversion Flip Card */}
                

                {/* Agreeableness Flip Card */}
                

                {/* Neuroticism Flip Card */}
                
              </div>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white">
                Continue to Action Plan
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 6: Three-Part Action Plan */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6" id="action-plan">
              <h2 className="text-3xl font-bold text-brand-green">Three-Part Action Plan</h2>

              <TextDisplay
                variant="callout"
                content="Our comprehensive program is organized into three strategic parts to build salespeople who can override their personality defaults and operate with discipline."
              />

              <div className="space-y-6">
                {/* Part 1 */}
                <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-green/5">
                  <h3 className="text-2xl font-bold mb-4 text-brand-green">Part 1: Personality Traits and Introduction to Neurobiology</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Understand your Big 10 traits and the neuroscience of goal-seeking and growth mindset
                    </p>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                          0
                        </div>
                        <div>
                          <h4 className="font-semibold">Module 0: Introduction</h4>
                          <p className="text-sm text-muted-foreground">
                            The Big Five OCEAN model and 10 personality aspects
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold">Module 1: Neurobiology & Growth Mindset</h4>
                          <p className="text-sm text-muted-foreground">
                            Neural mechanisms, growth mindset, and MAD Analysis
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Part 2 */}
                <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-green/5">
                  <h3 className="text-2xl font-bold mb-4 text-brand-green">Part 2: Systematic Negotiation</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Master Jim Camp's "Start With No" and Chris Voss's FBI tactics to stay calm and in control
                    </p>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold">Module 2: Learning, Habits & Measurement</h4>
                          <p className="text-sm text-muted-foreground">
                            Science of learning, habit formation, and the 21-day protocol
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold">Module 3: Win With NO</h4>
                          <p className="text-sm text-muted-foreground">
                            Jim Camp's system and Chris Voss's tactical empathy
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                          4
                        </div>
                        <div>
                          <h4 className="font-semibold">Module 4: Integrating Big 10 with Camp & Voss</h4>
                          <p className="text-sm text-muted-foreground">
                            Override personality traits with systematic negotiation skills
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Part 3 */}
                <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-green/5">
                  <h3 className="text-2xl font-bold mb-4 text-brand-green">Part 3: Implementation & Accountability</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Build sustainable change agency and master the Participant Self-Training Model for weekly self-assessment and growth tracking
                    </p>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                          5
                        </div>
                        <div>
                          <h4 className="font-semibold">Module 5: Change Agency</h4>
                          <p className="text-sm text-muted-foreground">
                            Creating sustainable environments for behavior change
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                          6
                        </div>
                        <div>
                          <h4 className="font-semibold">Module 6: Participant Self-Training Model</h4>
                          <p className="text-sm text-muted-foreground">
                            Weekly self-assessment and continuous improvement
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white">
                Continue to Summary
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 7: Summary (was section 8) */}
          {currentSectionIndex === 7 && (
            <div className="space-y-6" id="summary">
              <h2 className="text-3xl font-bold text-brand-green">Program Summary</h2>

              <Card className="p-8 bg-gradient-to-br from-brand-green/10 via-background to-brand-orange/10">
                <h3 className="text-2xl font-bold mb-6 text-center">Two Core Objectives</h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-xl">
                      1
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Strategic Understanding</h4>
                      <p className="text-muted-foreground">
                        Explain what is happening within your sales organization that holds back your advisors from
                        accomplishing additional production. We explore temperament, motivation, sales habits, and
                        corporate culture as the key variables in the strategic approach to your overarching goals.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-xl">
                      2
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Tactical Execution</h4>
                      <p className="text-muted-foreground">
                        Provide tactical approaches to attract additional clients, as well as acquiring marginal
                        business from existing clients. We insist on measurement to determine whether we are making any
                        progress towards increased production and prospecting activities.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <TextDisplay
                variant="success"
                content="By combining personality insights with proven tactical skills, Cognijin creates a comprehensive framework for sustainable sales success."
              />

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">What You'll Achieve</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Deep understanding of how your personality affects your sales performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Personalized strategies to overcome personality-driven challenges</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Advanced tactical negotiation skills aligned with your strengths</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Measurable improvements in prospecting and closing activities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Sustainable behavior changes that last beyond the program</span>
                  </li>
                </ul>
              </Card>

              <div className="space-y-4">
                <Button onClick={handleSectionComplete} className="bg-brand-green hover:bg-[#14b8a6] text-white w-full">
                  Complete Module 0
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Module 0 Completion Section */}
          {currentSectionIndex === totalSections && (
            <div className="space-y-8">
              <Card className="p-8 bg-gradient-to-br from-brand-green/10 via-background to-brand-orange/10">
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <CheckCircle2 className="h-20 w-20 text-brand-green" />
                  </div>
                  <h2 className="text-4xl font-bold">Congratulations!</h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    You've completed Module 0: Introduction to Cognijin
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Now you understand how personality assessment drives sales success and the power of the Big 5 model.
                  </p>
                </div>
              </Card>

              <Card className="p-8 bg-brand-green/5 border-2 border-brand-green">
                <h3 className="text-2xl font-bold mb-4 text-center">What You'll Achieve</h3>
                <ul className="space-y-3 max-w-2xl mx-auto">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Deep understanding of how your personality affects your sales performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Personalized strategies to overcome personality-driven challenges</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Advanced tactical negotiation skills aligned with your strengths</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Measurable improvements in prospecting and closing activities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Sustainable behavior changes that last beyond the program</span>
                  </li>
                </ul>
              </Card>

              <div className="text-center space-y-6 py-8">
                <h3 className="text-3xl font-bold">What's Next?</h3>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Ready to unlock your full sales potential? Choose how you'd like to continue:
                </p>

                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto pt-4">
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <h4 className="text-xl font-bold mb-3">Schedule a Consultation</h4>
                    <p className="text-muted-foreground mb-6">
                      Talk to our team about the full course and how it can transform your sales approach. Get personalized insights and discuss your goals.
                    </p>
                    <Button asChild className="w-full bg-brand-orange hover:bg-[#e64a19] text-white" size="lg">
                      <Link href="https://calendly.com/lfederico-cognijin/30min?month=2026-01" target="_blank" rel="noopener noreferrer">
                        Book an Appointment
                      </Link>
                    </Button>
                  </Card>

                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <h4 className="text-xl font-bold mb-3">Explore More</h4>
                    <p className="text-muted-foreground mb-6">
                      Return to our website to learn more about the full course, review pricing options, and see what else is included.
                    </p>
                    <Button asChild className="w-full bg-brand-green hover:bg-brand-green/90 text-white" size="lg">
                      <Link href="/">Return to Website</Link>
                    </Button>
                  </Card>
                </div>
              </div>
              
            </div>
          )}
        </main>
    </div>
  )
}
