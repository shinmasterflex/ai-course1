/**
 * MODULE 6: AI ETHICS, SAFETY & SOCIETY
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { FlipCardGrid, QuickCheckCard, MatchingChallenge, DragSortChallenge } from "@/components/learning/lesson-interactions"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { ModuleHero } from "@/components/learning/module-hero"
import { ModuleQuiz } from "@/components/learning/module-quiz"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, AlertTriangle, Shield, AlertCircle, BookOpen, Target, Lightbulb, Users } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useSectionInteractionGate } from "@/hooks/use-section-interaction-gate"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { moduleQuizData } from "@/lib/module-quiz-data"

export default function Module6Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-6"
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = useMemo(() => module?.sections ?? [], [module])
  const totalSections = sections.length
  const completedSectionIds = getCompletedSections(MODULE_ID)

  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz(MODULE_ID, ["quiz1", "quiz2", "quiz3", "quiz4", "quiz5"])
  const questions = moduleQuizData[MODULE_ID]

  const sectionParam = useMemo(() => searchParams?.get("section"), [searchParams])

  useEffect(() => {
    if (sectionParam && sections.length > 0) {
      const idx = sections.findIndex((s) => s.id === sectionParam)
      if (idx !== -1 && idx !== currentSectionIndex) setCurrentSectionIndex(idx)
    }
  }, [currentSectionIndex, sectionParam, sections])

  useEffect(() => {
    if (allQuizComplete && currentSectionIndex === totalSections - 1) {
      const last = sections[totalSections - 1]
      if (last) { markSectionComplete(MODULE_ID, last.id); setCurrentPosition(MODULE_ID, last.id) }
    }
  }, [allQuizComplete, currentSectionIndex, markSectionComplete, sections, setCurrentPosition, totalSections])

  const { canAdvance, markSectionInteractionComplete } = useSectionInteractionGate({
    currentSectionIndex,
    requiredSections: [5, 6],
  })

  const handleSectionComplete = () => {
    if (!canAdvance) {
      return
    }

    const current = sections[currentSectionIndex]
    if (current) { markSectionComplete(MODULE_ID, current.id); setCurrentPosition(MODULE_ID, current.id) }
    if (currentSectionIndex < totalSections - 1) {
      const next = sections[currentSectionIndex + 1]
      setCurrentSectionIndex(currentSectionIndex + 1)
      router.push(`/course/module-6?section=${next.id}`)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Module 6: AI Ethics, Safety & Society</h1>
            <p className="text-lg text-muted-foreground mb-4">Become an informed, responsible AI user</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {currentSectionIndex === 0 && (
            <ModuleHero
              eyebrow="Module 6"
              title="Use AI responsibly and safely"
              description="Build a practical safety framework for privacy, bias, verification, and human oversight in real-world usage."
              imageSrc="/images/modules/module-6.jpg"
              imageAlt="Ethical technology and responsible AI"
            />
          )}

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="Using AI responsibly requires more than just knowing how to operate the tools. It requires understanding the risks - to yourself, to others, and to society. This module gives you that foundation." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">A simple safety operating system</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Before you paste:</span> ask whether the data is personal, confidential, or regulated.</p>
                  <p><span className="font-medium text-foreground">Before you trust:</span> ask what must be verified before anyone acts on the output.</p>
                  <p><span className="font-medium text-foreground">Before you automate:</span> ask whether a human should still review the result.</p>
                </div>
              </Card>
              <Card className="p-5 space-y-2">
                {["AI bias - how it forms and who it hurts","Privacy - what AI systems collect about you","Misinformation - deepfakes and AI-generated content","Responsible AI use - principles and practices","The future of AI - what comes next"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />{item}</div>
                ))}
              </Card>
              <QuickCheckCard
                prompt="Before trusting an AI output, which safety habit matters most?"
                options={[
                  { id: "a", label: "Assume confidence means correctness" },
                  { id: "b", label: "Verify critical claims and keep humans in the loop for consequential use" },
                  { id: "c", label: "Share private data so the model can personalize better" },
                  { id: "d", label: "Skip source checks if wording looks professional" },
                ]}
                correctOptionId="b"
                                optionExplanations={{
          a: "Confidence in AI output does not mean the output is correct. Hallucinations often come with high confidence.",
          b: "Right. Verification plus human oversight is the core safety baseline in real-world AI use.",
          c: "Sharing private data to improve personalisation creates privacy and data security risks. Keep sensitive data out of public AI tools.",
          d: "Professional wording does not indicate factual accuracy. AI can present incorrect information in polished prose.",
        }}
                explanation="Right. Verification plus human oversight is the core safety baseline in real-world AI use."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module</Button>
            </div>
          )}

          {/* 1: Bias */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">AI Bias & Fairness</h2>
              <TextDisplay content="AI bias occurs when an AI system produces systematically unfair or discriminatory outcomes for certain groups of people." />
              <TextDisplay variant="warning" content="This is not a minor or theoretical problem. AI bias has denied people loans, led to wrongful arrests, screened out job applicants, and produced medical recommendations that work better for some demographics than others." />
              <div className="space-y-4">
                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-orange">How AI bias forms</h3>
                  <div className="space-y-3 text-sm">
                    {[
                      { source: "Biased training data", desc: "If historical hiring data reflects past discrimination (e.g., fewer women in senior roles), an AI trained on it will perpetuate those patterns." },
                      { source: "Underrepresentation", desc: "Facial recognition AI trained mostly on white male faces performs significantly worse on darker skin tones and women - because those groups were underrepresented in training data." },
                      { source: "Feedback loops", desc: "AI that recommends content may amplify extreme or sensational content because users engage with it more - creating a feedback loop that reinforces harmful patterns." },
                      { source: "Measurement bias", desc: "What you measure reflects your values. If a 'good employee' is defined as someone who works 60+ hours a week, the AI will disadvantage people with caregiving responsibilities." },
                    ].map(({ source, desc }) => (
                      <div key={source} className="flex gap-3 border-b last:border-0 pb-3 last:pb-0">
                        <AlertTriangle className="h-4 w-4 text-brand-orange mt-0.5 flex-shrink-0" />
                        <div><p className="font-medium">{source}</p><p className="text-muted-foreground">{desc}</p></div>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card className="p-5 bg-brand-green/5 border-brand-green/20">
                  <h3 className="font-semibold mb-2 text-brand-green flex items-center gap-2"><Shield className="h-4 w-4" />What is being done about it</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>? Bias auditing tools that test AI systems for disparate outcomes</li>
                    <li>? Diverse and representative training datasets</li>
                    <li>? Regulatory frameworks (EU AI Act) requiring bias assessment for high-risk AI</li>
                    <li>? Fairness metrics built into model evaluation pipelines</li>
                  </ul>
                </Card>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Real-World AI Bias Cases - Flashcards</h3>
                <p className="text-sm text-muted-foreground mb-4">These are real documented cases. Click each card for what happened and what we learned.</p>
                <FlipCardGrid
                  cards={[
                    {
                      title: "Hiring",
                      prompt: "What happened when AI learned from biased historical hiring data?",
                      answer: "It reproduced the past instead of correcting it. Systems trained on skewed hiring history can downgrade qualified candidates from underrepresented groups.",
                    },
                    {
                      title: "Facial recognition",
                      prompt: "Why did some facial recognition systems fail certain groups more often?",
                      answer: "Because the training data underrepresented those groups, so the model learned weaker patterns for them and made more mistakes.",
                    },
                    {
                      title: "Healthcare",
                      prompt: "How can bias show up in medical AI?",
                      answer: "If training data comes mostly from one population or care system, the model may work less well for patients outside that group.",
                    },
                    {
                      title: "Key lesson",
                      prompt: "What is the beginner takeaway from these cases?",
                      answer: "Do not assume an AI system is fair because it is automated. Ask what data it learned from, who might be missing, and who bears the risk if it is wrong.",
                    },
                  ]}
                />
              </div>
              <QuickCheckCard
                prompt="What is the strongest beginner question to ask about an AI system used in hiring, lending, or healthcare?"
                options={[
                  { id: "a", label: "Does the interface look modern?" },
                  { id: "b", label: "Who might be disadvantaged if the training data is incomplete or biased?" },
                  { id: "c", label: "Is it faster than humans in every situation?" },
                  { id: "d", label: "Does it use a large model?" },
                ]}
                correctOptionId="b"
                                optionExplanations={{
          a: "Interface modernity has nothing to do with fairness, accuracy, or who might be harmed by biased outputs.",
          b: "In high-stakes contexts, the most important question is who could be harmed if the model learned from incomplete, biased, or unrepresentative data.",
          c: "Speed comparisons miss the point. In high-stakes decisions, the question is fairness and safety, not efficiency.",
          d: "Model size does not determine fairness. Large models can still encode and amplify biases present in training data.",
        }}
                explanation="In high-stakes contexts, the most important question is who could be harmed if the model learned from incomplete, biased, or unrepresentative data."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 2: Privacy */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Privacy & Your Data</h2>
              <TextDisplay content="When you use AI tools, you are sharing data - sometimes more than you realise. Understanding what is collected helps you protect yourself." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">Traffic-light rule for what to paste</h3>
                <div className="space-y-3 text-sm">
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-semibold text-green-700 mb-1">Green: usually safe</p>
                    <p className="text-muted-foreground">Public articles, your own generic drafts, non-sensitive brainstorming, already-public marketing copy.</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-semibold text-amber-700 mb-1">Yellow: pause and check policy</p>
                    <p className="text-muted-foreground">Internal documents, client materials, unpublished strategy notes, anything covered by workplace rules.</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-semibold text-red-700 mb-1">Red: do not paste into general AI tools</p>
                    <p className="text-muted-foreground">Passwords, financial account details, SSNs, medical records, legal secrets, regulated personal data.</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-5">
                <h3 className="font-semibold mb-3">Practical privacy guidelines</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "Never enter personal information (SSN, passwords, financial data) into AI chat tools",
                    "Read the privacy policy before using a new AI service with sensitive information",
                    "For work-related tasks, check if your employer has approved specific AI tools",
                    "Use the 'temporary chat' or 'no training' options if available (ChatGPT has this)",
                    "Enterprise/paid tiers usually have stronger data protection than free tiers",
                  ].map((item) => (
                    <li key={item} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </Card>
              <QuickCheckCard
                prompt="You want AI to summarize internal meeting notes that include client names and confidential plans. What is the safest default?"
                options={[
                  { id: "a", label: "Paste them into any public chatbot because summarization is low risk" },
                  { id: "b", label: "Check whether your organization has approved a protected tool before using AI with that content" },
                  { id: "c", label: "Replace only one client name and paste the rest" },
                  { id: "d", label: "Use AI first and ask about policy later" },
                ]}
                correctOptionId="b"
                                optionExplanations={{
          a: "Summarisation tasks still expose the content to the AI provider. The task type does not remove the privacy risk.",
          b: "Confidential internal notes are not a casual input. The safe default is to check policy and use only approved tools with the right protections.",
          c: "Replacing one name still exposes all other confidential details. Partial anonymisation is not a substitute for approved tooling.",
          d: "Using AI first and asking about policy later is exactly backwards. Policy and privacy must be evaluated before sharing confidential data.",
        }}
                explanation="Confidential internal notes are not a casual input. The safe default is to check policy and use only approved tools with the right protections."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 3: Misinformation */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Misinformation & Deepfakes</h2>
              <TextDisplay content="AI has dramatically lowered the cost of producing convincing fake content - from text to images to video to audio." />
              <div className="space-y-4">
                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-orange">Types of AI-generated misinformation</h3>
                  <div className="space-y-3 text-sm">
                    {[
                      { type: "Deepfake video", desc: "Realistic video of a real person saying or doing things they never did. Used in political manipulation, fraud, and non-consensual content." },
                      { type: "Voice cloning", desc: "AI can replicate any voice from just a few seconds of audio. Used in phone scams where the AI 'sounds like' a family member or executive." },
                      { type: "AI-written disinformation", desc: "LLMs can produce thousands of realistic-sounding false news articles, social media posts, or product reviews at near-zero cost." },
                      { type: "Synthetic images", desc: "Fake but photorealistic images of events that never happened - protests, disasters, crimes, celebrities." },
                    ].map(({ type, desc }) => (
                      <div key={type} className="flex gap-3 border-b last:border-0 pb-3 last:pb-0">
                        <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                        <div><p className="font-medium">{type}</p><p className="text-muted-foreground">{desc}</p></div>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card className="p-5 bg-brand-green/5 border-brand-green/20">
                  <h3 className="font-semibold mb-3 text-brand-green">How to spot and resist AI misinformation</h3>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Verify with primary sources before sharing - if it is surprising, check it</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Use reverse image search to check if images are authentic</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Look for watermarks, distortions, or inconsistencies in video (odd lighting, blurry edges)</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Be suspicious of unexpected calls requesting urgent action or money, even from known voices</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Use tools like Google Fact Check, Snopes, AFP Fact Check for viral claims</li>
                  </ul>
                </Card>
                <Card className="p-5 border-blue-500/20 bg-blue-500/5">
                  <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">AI Detection Tools - and Their Limits</h3>
                  <p className="text-sm text-muted-foreground mb-3">A category of tools has emerged to detect AI-generated content. They are useful - but imperfect. Understanding both is important.</p>
                  <div className="space-y-3 text-sm">
                    {[
                      { tool: "GPTZero", type: "Text detection", desc: "Analyses writing patterns and perplexity (how predictable the word choices are) to estimate whether text was AI-generated. Widely used by educators. Works reasonably well on clearly AI-generated text; struggles with heavily edited or mixed human/AI content." },
                      { tool: "Originality.ai", type: "Text detection", desc: "Designed for publishers and content teams. Scans for AI content alongside plagiarism checking. Offers sentence-level highlighting to show which parts look AI-generated. Paid tool." },
                      { tool: "Hive Moderation", type: "Image & video detection", desc: "Classifies whether images were AI-generated, with confidence scores. Used by platforms for content moderation. More reliable on images from known AI generators." },
                      { tool: "Deepware Scanner / Reality Defender", type: "Deepfake detection", desc: "Analyses video for manipulation artefacts invisible to the human eye - inconsistent blinking, unnatural skin texture, audio-visual sync issues. Used by media organisations and governments." },
                      { tool: "C2PA / Content Credentials", type: "Provenance standard", desc: "Not a detection tool but a prevention standard. Adobe, Microsoft, Google, and camera makers are building cryptographic provenance into images and videos - a digital signature that records how content was created and modified. Look for the 'cr' icon in supported apps." },
                    ].map(({ tool, type, desc }) => (
                      <div key={tool} className="flex gap-3 border-b last:border-0 pb-3 last:pb-0">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{tool}</p>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded">{type}</span>
                          </div>
                          <p className="text-muted-foreground">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">Critical limitation to understand</p>
                    <p className="text-xs text-muted-foreground">No detection tool is reliable enough to serve as proof in high-stakes situations. They provide probability scores, not verdicts. False positives (flagging human writing as AI) are common - students have been wrongly accused. Use detection tools as one signal in a broader investigation, never as definitive evidence.</p>
                  </div>
                </Card>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Put the verification steps in the right order</h3>
                <p className="text-sm text-muted-foreground mb-4">When you encounter potentially AI-generated misinformation, drag the steps into the correct sequence.</p>
                <DragSortChallenge
                  items={[
                    "Only share or act after verification is complete",
                    "Pause ??don't share or act immediately",
                    "Find a primary source that independently confirms it",
                    "Run a reverse image search or check a fact-checking site",
                    "Identify the original source of the claim",
                  ]}
                  correctOrder={[
                    "Pause ??don't share or act immediately",
                    "Identify the original source of the claim",
                    "Run a reverse image search or check a fact-checking site",
                    "Find a primary source that independently confirms it",
                    "Only share or act after verification is complete",
                  ]}
                  accentClassName="border-brand-orange/20 bg-brand-orange/5"
                />
              </div>
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Real scenario - what would you do?</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>You receive a voice note from someone who sounds like your manager asking you to urgently buy gift cards and send the codes.</p>
                  <p><span className="font-medium text-foreground">Best response:</span> do not act from the voice message alone. Verify through a separate trusted channel before doing anything.</p>
                </div>
              </Card>
              <QuickCheckCard
                prompt="What is the best first move when a realistic AI-generated voice or video seems urgent and emotionally pressuring?"
                options={[
                  { id: "a", label: "Act quickly before the opportunity disappears" },
                  { id: "b", label: "Verify through another trusted channel before responding" },
                  { id: "c", label: "Forward it to friends and ask what they think" },
                  { id: "d", label: "Assume it is real if the quality is good" },
                ]}
                correctOptionId="b"
                                optionExplanations={{
          a: "Acting quickly under pressure is exactly what social engineering and deepfake scams rely on. Urgency should increase your caution, not decrease it.",
          b: "Urgency is a classic manipulation tactic. The safest move is to slow down and verify through a separate trusted channel.",
          c: "Forwarding to friends exposes more people to potential misinformation without resolving the original uncertainty.",
          d: "High-quality deepfakes are now easy to produce. Production quality is not a reliability indicator for synthetic media.",
        }}
                explanation="Urgency is a classic manipulation tactic. The safest move is to slow down and verify through a separate trusted channel."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 4: Responsible AI */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Responsible AI Use</h2>
              <TextDisplay content="Being a responsible AI user does not mean being afraid of AI - it means using it thoughtfully, with awareness of its limitations and impact." />
              <div className="space-y-3">
                {[
                  { principle: "Verify before you trust", desc: "AI can be confidently wrong. For anything important - medical, legal, financial, factual - always verify AI outputs with authoritative sources." },
                  { principle: "Disclose when relevant", desc: "If you use AI to write something that will be presented as your own work or expertise, consider whether disclosure is appropriate. Academic, professional, and journalistic contexts often require it." },
                  { principle: "Do not automate consequential decisions blindly", desc: "AI should augment human judgment, not replace it, for high-stakes decisions (hiring, lending, medical treatment, legal judgments)." },
                  { principle: "Be aware of your own 'automation bias'", desc: "People tend to over-trust AI outputs because they come from computers. Actively question AI suggestions rather than accepting them by default." },
                  { principle: "Consider impact on others", desc: "AI-generated content, images, and audio can harm real people. Think about downstream effects before you create or share AI content." },
                    { principle: "Protect privacy", desc: "Do not use AI tools to collect, analyse, or share personal information about others without consent." },
                  ].map(({ principle, desc }) => (
                    <Card key={principle} className="p-4">
                      <p className="font-semibold text-brand-orange mb-1">{principle}</p>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </Card>
                  ))}
              </div>
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-green">Responsible AI Scenario</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>You used AI to draft a client-facing report. The draft is strong, but it includes a statistic you have not verified and a confident recommendation you would not personally stand behind yet.</p>
                  <p><span className="font-medium text-foreground">Responsible move:</span> check the source of the statistic, edit the recommendation to match your real judgment, and only then send the report.</p>
                </div>
              </Card>
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">A simple checklist before you use AI output</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "Did I verify the important facts, numbers, and names?",
                    "Would I still stand behind this if my name were on it?",
                    "Did I remove or protect any sensitive data?",
                    "Should a human review this before it affects someone else?",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </Card>
              <div>
                <h3 className="text-xl font-semibold mb-1">Match each principle to what it actually means</h3>
                <p className="text-sm text-muted-foreground mb-4">Click a principle on the left, then click its matching definition on the right.</p>
                <MatchingChallenge
                  pairs={[
                    { left: "Verify before you trust", right: "Check important facts with authoritative sources before acting on AI outputs" },
                    { left: "Automation bias", right: "The human tendency to over-trust outputs because they come from computers" },
                    { left: "Disclose when relevant", right: "Telling your audience when AI generated content you present as your own work" },
                    { left: "Least privilege", right: "Giving AI only the minimum data access needed for its specific task" },
                  ]}
                  accentClassName="border-brand-green/20 bg-brand-green/5"
                />
              </div>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 5: The Future */}
          {/* 5: Ethical Dilemmas */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Ethical Dilemmas You'll Face</h2>
              <TextDisplay content="Theory is helpful. But real ethics lives in the gray zones of trade-offs. Here are scenarios you might actually encounter. There are no perfect answers - only thoughtful ones." />
              
              <div className="space-y-5">
                <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                  <div className="flex gap-2 items-start mb-3">
                    <AlertCircle className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-brand-orange">Scenario 1: The Hiring Decision</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">You are a hiring manager.</span> Your company uses an AI system to screen 500 resumes and rank the top 20 candidates. You notice that the final list is 80% male in a field that is 50% female. The AI says it is just following the data - past hires were also mostly male.</p>
                    <Card className="p-3 bg-background border-dashed">
                      <p className="font-semibold text-sm mb-2">What do you do?</p>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="font-bold text-foreground">A)</span>
                          <span>Trust the system - it knows the data better than you.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold text-foreground">B)</span>
                          <span>Manually add women to the final list to hit a 50/50 ratio.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold text-foreground">C)</span>
                          <span>Audit the AI's training data and decision process. Adjust the system to reduce historical bias. Then re-screen with the revised model.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold text-foreground">D)</span>
                          <span>Ignore the AI entirely and hire people you personally know.</span>
                        </li>
                      </ul>
                    </Card>
                    <Card className="p-3 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                      <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">Why this matters</p>
                      <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">C</span> is the most defensible and ethical approach. It acknowledges the AI found a real pattern (past hiring bias) without accepting it as inevitable. You are not imposing quotas artificially - you are correcting the bias in the system itself. Options A and B are simpler but leave you either perpetuating historical discrimination or making arbitrary corrections without understanding the root cause. Option D throws away useful data entirely.</p>
                    </Card>
                  </div>
                </Card>

                <Card className="p-5 border-blue-500/20 bg-blue-500/5">
                  <div className="flex gap-2 items-start mb-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-blue-600 dark:text-blue-400">Scenario 2: The Deepfake Video</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">You receive a video of your CEO saying something completely against company values.</span> It looks authentic, the audio sounds like them, but you have a strong feeling something is off. A colleague says "I already shared it with three people." No one has fact-checked it yet.</p>
                    <Card className="p-3 bg-background border-dashed">
                      <p className="font-semibold text-sm mb-2">What do you do immediately?</p>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="font-bold text-foreground">A)</span>
                          <span>Do nothing - it is already out there, so acting now is pointless.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold text-foreground">B)</span>
                          <span>Immediately contact the CEO directly on a trusted channel to confirm, then help stop spread if it is fake.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold text-foreground">C)</span>
                          <span>Tell everyone you know it is a deepfake (even though you are not 100% sure) to minimize damage.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold text-foreground">D)</span>
                          <span>Assume your instinct is correct and post a rebuttal on social media.</span>
                        </li>
                      </ul>
                    </Card>
                    <Card className="p-3 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                      <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">Why this matters</p>
                      <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">B</span> is the move. Urgency is often a feature of misinformation, but that does not mean you do nothing. You verify through a direct, trusted channel first. If it is fake, you have the CEO's word backing you when you help stop spread. If it is real (despite your doubts), you have not spread false reassurance. Option C spreads false certainty. Option D amplifies unverified claims. Option A is passive - you have agency here.</p>
                    </Card>
                  </div>
                </Card>

                <Card className="p-5 border-green-500/20 bg-green-500/5">
                  <div className="flex gap-2 items-start mb-3">
                    <AlertCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-green-600 dark:text-green-400">Scenario 3: The Data Privacy Tension</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">You work in healthcare.</span> A colleague wants to feed patient medical records into a new AI system to train a diagnostic model that could genuinely help patients. The data is anonymized (names and IDs removed), but it includes sensitive medical history. Your legal team has not approved the use of that data with external AI vendors yet - approval could take weeks.</p>
                    <Card className="p-3 bg-background border-dashed">
                      <p className="font-semibold text-sm mb-2">What do you recommend?</p>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="font-bold text-foreground">A)</span>
                          <span>Upload the data now - it is anonymized, so privacy is not a concern.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold text-foreground">B)</span>
                          <span>Wait for legal approval before proceeding.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold text-foreground">C)</span>
                          <span>Start with a small, synthetic test dataset while you work with legal. Build the model prototype now to save time later.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold text-foreground">D)</span>
                          <span>Use the data but do not tell legal until results are ready.</span>
                        </li>
                      </ul>
                    </Card>
                    <Card className="p-3 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                      <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">Why this matters</p>
                      <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">C</span> is the pragmatic ethical move. You are not waiting passively - you are making progress on the technical side while respecting the governance process. Anonymized data can still carry privacy risks (especially in re-identification attacks), so going through legal is not bureaucracy - it is due diligence. Option A downplays regulatory risk. Option D is a serious breach of trust. Option B is safe but slow. Option C moves forward responsibly.</p>
                    </Card>
                  </div>
                </Card>

                <Card className="p-5 border-purple-500/20 bg-purple-500/5">
                  <div className="flex gap-2 items-start mb-3">
                    <AlertCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-purple-600 dark:text-purple-400">Scenario 4: The Attribution Shortcut</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">You are writing a report for a client.</span> You used AI to draft an entire section. The output is good - well-researched and clearly written. No one would know it was AI-generated unless you told them. Your timeline is tight and the client has not specifically asked how you created the content.</p>
                    <Card className="p-3 bg-background border-dashed">
                      <p className="font-semibold text-sm mb-2">What do you do?</p>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="font-bold text-foreground">A)</span>
                          <span>Say nothing - you edited it heavily, so it is substantially your work.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold text-foreground">B)</span>
                          <span>Add a footnote: "Drafted with AI assistance, verified and edited by the author."</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold text-foreground">C)</span>
                          <span>Rewrite it entirely from scratch to avoid the question.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold text-foreground">D)</span>
                          <span>Ask the client first, then decide based on their preference.</span>
                        </li>
                      </ul>
                    </Card>
                    <Card className="p-3 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                      <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">Why this matters</p>
                      <p className="text-xs text-muted-foreground">The answer depends on context. In academic or journalistic work, <span className="font-medium text-foreground">B</span> or <span className="font-medium text-foreground">D</span> is expected. In creative or internal work, <span className="font-medium text-foreground">A</span> may be fine if your editing was substantial. Option D is the safest - it defers to the client's standards, which respect their trust in you. Option A assumes deception is okay as long as results are good - it is not. Option C is wasteful if the output is already strong.</p>
                    </Card>
                  </div>
                </Card>
              </div>

              <QuickCheckCard
                prompt="What is the core theme running through all of these dilemmas?"
                options={[
                  { id: "a", label: "Always prioritize speed over process" },
                  { id: "b", label: "Transparency, governance, and respect for others' autonomy matter as much as the outcome" },
                  { id: "c", label: "AI removes the need for human judgment" },
                  { id: "d", label: "There is always one obviously correct answer" },
                ]}
                correctOptionId="b"
                                optionExplanations={{
          a: "Prioritising speed over process often leads to outcomes that breach trust or bypass necessary accountability steps.",
          b: "Right. Each scenario involves a tension between efficiency and responsibility. The ethical move balances results with transparency and respect for legitimate process.",
          c: "AI does not remove the need for human judgment — especially in ethical dilemmas. These scenarios demonstrate exactly where judgment is essential.",
          d: "Ethical dilemmas rarely have one obviously correct answer. That ambiguity is precisely why governance, reasoning, and transparency matter.",
        }}
                explanation="Right. Each scenario involves a tension between efficiency and responsibility. The ethical move balances results with transparency and respect for legitimate process."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />

              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 6: Risk Assessment & Safeguards */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Risk Assessment & Safeguards</h2>
              <TextDisplay content="This is your capstone exercise: evaluate a real-world AI use case for hidden risks, then propose practical safeguards." />
              
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2"><Target className="h-5 w-5" />Your Exercise</h3>
                <p className="text-sm text-muted-foreground mb-4">Read this scenario and work through the questions below.</p>
              </Card>

              <Card className="p-5 border-blue-500/20 bg-blue-500/5">
                <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">Case: Automated Resume Screening at Scale</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">The setup:</span> A large retailer uses an AI system to screen resumes for store manager positions across 500 locations. The system ranks 50,000+ applicants per year and forwards the top 500 to human reviewers. The AI learned from the company's hiring history over the last 10 years. Retailers want to hire fast - each location needs staffing quickly.</p>
                  <p><span className="font-medium text-foreground">The business case:</span> Faster screening means faster hiring, which reduces vacancy costs. The system is 40% more efficient than manual review.</p>
                  <p><span className="font-medium text-foreground">The concern:</span> Three employee resource groups raised concerns: historical underrepresentation in manager roles means the AI may be perpetuating past patterns.</p>
                </div>
              </Card>

              <div className="space-y-4">
                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><AlertTriangle className="h-4 w-4" />Part 1: Identify the Risks</h3>
                  <p className="text-sm text-muted-foreground mb-4">Check all risks you see in this scenario:</p>
                  <div className="space-y-2">
                    {[
                      { id: "bias", label: "Historical bias", checked: true, desc: "The system learned from 10 years of data that may reflect past discrimination." },
                      { id: "speed", label: "Speed bias", checked: true, desc: "Pressure to hire fast might skip important safeguards and human review." },
                      { id: "opacity", label: "Opacity", checked: true, desc: "Applicants rejected by AI have no visibility into why - the system is a black box." },
                      { id: "scale", label: "Scale of impact", checked: true, desc: "50,000 people per year affected - errors compound across thousands of lives." },
                      { id: "legal", label: "Legal/regulatory risk", checked: true, desc: "Disparate impact (unequal outcomes by protected class) can trigger EEOC investigation." },
                    ].map(({ id, label, checked, desc }) => (
                      <div key={id} className="flex items-start gap-3 p-3 border rounded-lg bg-background">
                        <CheckCircle2 className="h-5 w-5 text-brand-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">{label}</p>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-green flex items-center gap-2"><Shield className="h-4 w-4" />Part 2: Design Safeguards</h3>
                  <p className="text-sm text-muted-foreground mb-4">For each risk, here are practical safeguards. Read and reflect:</p>
                  <div className="space-y-3">
                    {[
                      {
                        risk: "Historical bias in training data",
                        safeguards: [
                          "Audit the training data for demographic representation - if manager roles were 70% male historically, explicitly measure bias",
                          "Use a fairness metric like 'disparate impact ratio' - ensure AI selection rates are within 80% of the best-performing group",
                          "Retrain the model with synthetic data that corrects for historical underrepresentation in management",
                          "Disable the 'tenure' and 'career path' features if they just replicate past patterns",
                        ]
                      },
                      {
                        risk: "Pressure to use AI without review",
                        safeguards: [
                          "Require human review of all top 500 candidates - AI screens but does not decide",
                          "Set a company policy: no hire or rejection based on AI scoring alone",
                          "Audit: monthly review of which candidates were rejected by AI but hired by humans - look for patterns",
                          "Slow down: do not let speed pressure override process",
                        ]
                      },
                      {
                        risk: "Applicants have no recourse",
                        safeguards: [
                          "Publish the criteria: tell applicants what the AI is evaluating (skills, experience, etc.)",
                          "Offer an appeal process: rejected applicants can request human re-review with explanation",
                          "Provide feedback: if rejected by AI, explain which factors were weighted heavily",
                          "Transparency report: publish annual statistics on AI screening (pass rates, demographics of selected candidates)",
                        ]
                      },
                      {
                        risk: "Legal and fairness liability",
                        safeguards: [
                          "Partner with legal and DEI teams from the start - do not build in isolation",
                          "Document the validation process: show regulators that you tested for bias",
                          "Assign accountability: a named person owns the system's fairness",
                          "Plan for regulation: assume future rules will require transparency - build it now",
                        ]
                      },
                    ].map(({ risk, safeguards }) => (
                      <Card key={risk} className="p-4 border-dashed border-brand-green/30 bg-brand-green/5">
                        <p className="font-semibold text-sm mb-2">{risk}</p>
                        <ul className="space-y-1">
                          {safeguards.map((sg) => (
                            <li key={sg} className="text-xs text-muted-foreground flex gap-2">
                              <CheckCircle2 className="h-3 w-3 text-brand-green flex-shrink-0 mt-0.5" />
                              {sg}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    ))}
                  </div>
                </Card>

                <Card className="p-5 bg-gradient-to-br from-brand-orange/5 to-brand-green/5">
                  <h3 className="font-semibold mb-3 text-brand-orange flex items-center gap-2"><Lightbulb className="h-4 w-4" />Part 3: Reflect on Your Approach</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div>
                      <p className="font-medium text-foreground mb-1">Question 1:</p>
                      <p>Of all the safeguards listed, which three would have the biggest impact on fairness? Why?</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Question 2:</p>
                      <p>Which safeguard would be hardest to implement in a real company? What is getting in the way?</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Question 3:</p>
                      <p>Imagine you are the company's Chief People Officer. What would you tell the executive team about this approach?</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Question 4:</p>
                      <p>How would you apply this same thinking to a different AI system you use or know about - healthcare, lending, content moderation, etc.?</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                  <h3 className="font-semibold mb-3 text-brand-green">Key Takeaway</h3>
                  <p className="text-sm text-muted-foreground">The goal is not to avoid AI - it is to use it with eyes wide open. A system that is audited, transparent, and governed is far more trustworthy than one that is fast but hidden. You now know how to ask the right questions and design practical safeguards.</p>
                </Card>
              </div>

              <QuickCheckCard
                prompt="What is the relationship between bias auditing and legal compliance?"
                options={[
                  { id: "a", label: "They are unrelated - auditing is just nice to have" },
                  { id: "b", label: "Auditing is how you provide evidence of due diligence to regulators" },
                  { id: "c", label: "Legal teams handle compliance independently of AI teams" },
                  { id: "d", label: "Compliance is only for large companies" },
                ]}
                correctOptionId="b"
                                optionExplanations={{
          a: "Auditing is not just nice to have — it is increasingly required by law and is the primary way to demonstrate accountability.",
          b: "Exactly. Auditing is your legal defense. It shows regulators and courts that you knew about the risks and took steps to mitigate them.",
          c: "AI teams must work with legal and compliance teams together. Treating them as separate creates gaps in accountability.",
          d: "Regulations like the EU AI Act apply to companies of all sizes depending on risk level. Size does not exempt you.",
        }}
                explanation="Exactly. Auditing is your legal defense. It shows regulators and courts that you knew about the risks and took steps to mitigate them."
                onAnswered={() => {
                  markSectionInteractionComplete(6)
                }}
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />

              {!canAdvance ? <p className="text-sm text-muted-foreground">Complete the risk assessment checkpoint to unlock the final section.</p> : null}

              <Button disabled={!canAdvance} onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 7: Quiz */}
          {currentSectionIndex === 7 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <ModuleQuiz questions={questions} results={quizResults} onAnswer={handleQuizComplete} />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Excellent! You are now an informed, critical AI user. Up next: Your AI Toolkit - where you turn safe, thoughtful AI use into practical no-code workflows." />
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={() => router.push("/course/module-7")}>
                      Continue to Module 7
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => router.push("/course")}>Dashboard</Button>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  )
}


