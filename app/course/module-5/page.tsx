/**
 * MODULE 5: AI ETHICS, SAFETY & SOCIETY
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { FlipCard } from "@/components/learning/flip-card"
import { Flashcard } from "@/components/learning/flashcard"
import { ComparisonCard } from "@/components/learning/comparison-card"
import { MultipleChoice } from "@/components/learning/multiple-choice"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, AlertTriangle, Shield } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useModuleQuiz } from "@/hooks/use-module-quiz"

export default function Module5Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-5"
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = module?.sections || []
  const totalSections = sections.length
  const completedSectionIds = getCompletedSections(MODULE_ID)

  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz(MODULE_ID, ["quiz1", "quiz2", "quiz3"])

  const sectionParam = useMemo(() => searchParams?.get("section"), [searchParams])

  useEffect(() => {
    if (sectionParam && sections.length > 0) {
      const idx = sections.findIndex((s) => s.id === sectionParam)
      if (idx !== -1 && idx !== currentSectionIndex) setCurrentSectionIndex(idx)
    }
  }, [sectionParam])

  useEffect(() => {
    if (allQuizComplete && currentSectionIndex === totalSections - 1) {
      const last = sections[totalSections - 1]
      if (last) { markSectionComplete(MODULE_ID, last.id); setCurrentPosition(MODULE_ID, last.id) }
    }
  }, [allQuizComplete])

  const handleSectionComplete = () => {
    const current = sections[currentSectionIndex]
    if (current) { markSectionComplete(MODULE_ID, current.id); setCurrentPosition(MODULE_ID, current.id) }
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
        <main className="flex-1 p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Module 5: AI Ethics, Safety & Society</h1>
            <p className="text-lg text-muted-foreground mb-4">Become an informed, responsible AI user</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="Using AI responsibly requires more than just knowing how to operate the tools. It requires understanding the risks — to yourself, to others, and to society. This module gives you that foundation." />
              <Card className="p-5 space-y-2">
                {["AI bias — how it forms and who it hurts","Privacy — what AI systems collect about you","Misinformation — deepfakes and AI-generated content","Responsible AI use — principles and practices","The future of AI — what comes next"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />{item}</div>
                ))}
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module →</Button>
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
                      { source: "Underrepresentation", desc: "Facial recognition AI trained mostly on white male faces performs significantly worse on darker skin tones and women — because those groups were underrepresented in training data." },
                      { source: "Feedback loops", desc: "AI that recommends content may amplify extreme or sensational content because users engage with it more — creating a feedback loop that reinforces harmful patterns." },
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
                    <li>• Bias auditing tools that test AI systems for disparate outcomes</li>
                    <li>• Diverse and representative training datasets</li>
                    <li>• Regulatory frameworks (EU AI Act) requiring bias assessment for high-risk AI</li>
                    <li>• Fairness metrics built into model evaluation pipelines</li>
                  </ul>
                </Card>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Real-World AI Bias Cases — Flashcards</h3>
                <p className="text-sm text-muted-foreground mb-4">These are real documented cases. Click each card for what happened and what we learned.</p>
                <Flashcard cards={[
                  { id: "amazon-hiring", front: "Amazon's AI Hiring Tool (2018)", back: "Amazon built an AI to screen CVs — and then scrapped it when they discovered it was penalising CVs that contained the word 'women's' (e.g. 'women's chess club') and downgrading graduates of all-women's colleges.\n\nWhy? It was trained on 10 years of past hiring decisions — when Amazon's engineering workforce was predominantly male. The AI learned that maleness correlated with success." },
                  { id: "compas", front: "COMPAS Recidivism Algorithm (2016)", back: "COMPAS was used by US courts to predict the likelihood a defendant would reoffend. ProPublica's investigation found it incorrectly labelled Black defendants as future criminals at twice the rate of white defendants.\n\nThe algorithm did not use race directly — but it used variables correlated with race (zip code, family history) that produced discriminatory outcomes." },
                  { id: "face-id", front: "Facial Recognition & Racial Bias", back: "A 2018 MIT Media Lab study (Gender Shades) found commercial facial recognition systems had error rates of 0.8% on white men — but up to 34.7% on darker-skinned women.\n\nThe cause: training datasets were overwhelmingly composed of white male faces. The AI performed best on who it had seen the most of during training." },
                  { id: "healthcare-bias", front: "Healthcare Algorithm (2019)", back: "A widely-used algorithm to prioritise patients for extra medical care was found to systematically disadvantage Black patients. At any given 'risk score', Black patients were actually sicker than white patients — but the algorithm predicted they needed less care.\n\nWhy? The algorithm used healthcare costs as a proxy for health needs — and Black patients historically had less access to healthcare, so they had lower historical costs despite higher illness." },
                ]} />
              </div>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 2: Privacy */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Privacy & Your Data</h2>
              <TextDisplay content="When you use AI tools, you are sharing data — sometimes more than you realise. Understanding what is collected helps you protect yourself." />
              <ComparisonCard
                leftTitle="What you might assume"
                rightTitle="What may actually happen"
                items={[
                  { left: "My conversation is private", right: "Free AI tools may use your chats to train future models" },
                  { left: "The AI forgets my conversation after it ends", right: "Many services retain conversation history on their servers" },
                  { left: "Using AI at work is the same as using it personally", right: "Company data entered into consumer AI tools may violate your employer's data policies" },
                  { left: "The AI does not know who I am", right: "AI services often link your conversations to your account and device" },
                ]}
              />
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
              <FlipCard
                front="Does ChatGPT use my conversations to train its models?"
                back="By default, yes — for free users, OpenAI may use conversations to train future models. You can opt out in Settings > Data Controls > Improve the model for everyone. ChatGPT Team and Enterprise plans do not train on your data by default."
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 3: Misinformation */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Misinformation & Deepfakes</h2>
              <TextDisplay content="AI has dramatically lowered the cost of producing convincing fake content — from text to images to video to audio." />
              <div className="space-y-4">
                <Card className="p-5">
                  <h3 className="font-semibold mb-3 text-brand-orange">Types of AI-generated misinformation</h3>
                  <div className="space-y-3 text-sm">
                    {[
                      { type: "Deepfake video", desc: "Realistic video of a real person saying or doing things they never did. Used in political manipulation, fraud, and non-consensual content." },
                      { type: "Voice cloning", desc: "AI can replicate any voice from just a few seconds of audio. Used in phone scams where the AI 'sounds like' a family member or executive." },
                      { type: "AI-written disinformation", desc: "LLMs can produce thousands of realistic-sounding false news articles, social media posts, or product reviews at near-zero cost." },
                      { type: "Synthetic images", desc: "Fake but photorealistic images of events that never happened — protests, disasters, crimes, celebrities." },
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
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Verify with primary sources before sharing — if it is surprising, check it</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Use reverse image search to check if images are authentic</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Look for watermarks, distortions, or inconsistencies in video (odd lighting, blurry edges)</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Be suspicious of unexpected calls requesting urgent action or money, even from known voices</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />Use tools like Google Fact Check, Snopes, AFP Fact Check for viral claims</li>
                  </ul>
                </Card>
              </div>
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Real scenario — what would you do?</h3>
                <MultipleChoice
                  question="You see a viral video clip of a famous politician saying something shocking. It is spreading rapidly on social media. What is the best first step?"
                  options={[
                    { text: "Share it immediately — the faster you share, the more relevant you are", isCorrect: false, feedback: "Speed of sharing is exactly what makes AI misinformation effective. Being fast and being right are not the same thing." },
                    { text: "Check whether credible news outlets are reporting on the video and search for the original source", isCorrect: true, feedback: "Correct. If a major news story were real, it would be covered by multiple reliable sources. Search for the original clip, check the date, and look for coverage from established outlets." },
                    { text: "Look at the comments — if most people believe it, it is probably real", isCorrect: false, feedback: "Social proof is not evidence. Misinformation spreads precisely because many people believe and share it without verification." },
                    { text: "Ask an AI chatbot whether the video is real", isCorrect: false, feedback: "AI chatbots may not have access to recent events, can hallucinate, and cannot verify video authenticity. Use fact-checking tools and primary sources instead." },
                  ]}
                  explanation="The SIFT method works well here: Stop, Investigate the source, Find better coverage, Trace claims to their origin. Credible stories are covered by multiple independent outlets. Viral but unverified clips demand extra skepticism."
                />
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 4: Responsible AI */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Responsible AI Use</h2>
              <TextDisplay content="Being a responsible AI user does not mean being afraid of AI — it means using it thoughtfully, with awareness of its limitations and impact." />
              <div className="space-y-3">
                {[
                  { principle: "Verify before you trust", desc: "AI can be confidently wrong. For anything important — medical, legal, financial, factual — always verify AI outputs with authoritative sources." },
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
                <MultipleChoice
                  question="A manager uses an AI tool to write performance reviews for their team by pasting in each employee's KPIs. They do not read the reviews carefully before sending them. What principle of responsible AI use is being violated?"
                  options={[
                    { text: "Privacy — they should not enter KPI data into AI tools", isCorrect: false, feedback: "Privacy is a concern worth thinking about, but the core problem here is that the manager is not reviewing the output before using it to make consequential decisions about people's careers." },
                    { text: "Do not automate consequential decisions blindly — AI should assist human judgment, not replace it", isCorrect: true, feedback: "Correct. Performance reviews directly affect people's careers, compensation, and wellbeing. Using AI output without careful review means the manager is not exercising the judgment their role requires. AI can assist — but a human must remain accountable for the decision." },
                    { text: "Verify before you trust — they should fact-check the AI's output", isCorrect: false, feedback: "Verification is part of it, but the deeper issue is that consequential decisions about people require human judgment and accountability — not just fact-checking." },
                    { text: "There is nothing wrong with this — AI saves time", isCorrect: false, feedback: "Time savings do not justify removing meaningful human oversight from decisions that affect people's livelihoods and careers." },
                  ]}
                  explanation="Responsible AI use means using AI as a tool that augments your judgment — not replaces it. For high-stakes decisions (performance reviews, hiring, medical, legal), a human must be genuinely involved in reviewing and owning the output. 'AI drafted it and I sent it without reading' is not responsible use."
                />
              </Card>
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 5: The Future */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">The Future of AI</h2>
              <TextDisplay content="AI is evolving faster than almost any technology in history. Here is what experts are currently watching:" />
              <div className="space-y-4">
                {[
                  { trend: "AI Agents", desc: "AI that can take multi-step actions autonomously — browse the web, write code, make purchases, manage your calendar. Moving from 'chat' to 'do'." },
                  { trend: "Multimodal AI", desc: "Models that can see, hear, speak, and code — not just text. GPT-4o, Gemini Ultra, and Claude 3.5 are already multimodal." },
                  { trend: "AI in Healthcare", desc: "AI is matching or exceeding specialists in reading radiology scans, identifying skin cancers, predicting drug interactions, and discovering new molecules." },
                  { trend: "Regulation", desc: "The EU AI Act is the first major AI regulation globally. The US, UK, China, and others are developing frameworks. This will reshape how AI is built and deployed." },
                  { trend: "AI and Employment", desc: "Research suggests AI will transform most knowledge work jobs — augmenting some, displacing others. The effect will be uneven across roles and sectors." },
                  { trend: "AI Safety Research", desc: "A growing field working on the 'alignment problem': ensuring AI systems do what humans actually intend. Organisations like Anthropic, DeepMind Safety, and MIRI are leading this work." },
                ].map(({ trend, desc }) => (
                  <Card key={trend} className="p-4 flex gap-3">
                    <span className="bg-brand-green/10 text-brand-green text-xs font-bold px-2 py-1 rounded h-fit flex-shrink-0 whitespace-nowrap">{trend}</span>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </Card>
                ))}
              </div>
              <TextDisplay variant="callout" content="The most important skill in an AI-driven world is not knowing how to use any specific tool — it is knowing how to think critically, adapt quickly, and use AI as a collaborator rather than a crutch." />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next →</Button>
            </div>
          )}

          {/* 6: Quiz */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <MultipleChoice
                question="What is the primary reason AI systems can exhibit bias?"
                options={[
                  { text: "AI programmers intentionally code biases into the system", isCorrect: false, feedback: "AI bias is usually unintentional and structural, not deliberate." },
                  { text: "AI systems learn from training data that reflects existing human biases and inequalities", isCorrect: true, feedback: "Correct! AI learns patterns from data — and if that data reflects societal biases, the AI will too." },
                  { text: "AI is too complex to be tested for fairness", isCorrect: false, feedback: "Bias auditing tools exist to test AI systems for disparate outcomes." },
                  { text: "All AI is biased and nothing can be done about it", isCorrect: false, feedback: "Bias can be reduced through diverse training data, bias auditing, and careful system design." },
                ]}
                explanation="AI bias emerges from training data that reflects historical inequalities, measurement choices that embed assumptions, and feedback loops that amplify patterns — not from intentional programming."
                onComplete={(c) => handleQuizComplete("quiz1", c)}
              />
              <MultipleChoice
                question="You receive a phone call from your boss's voice asking you to urgently wire money to a new account. What should you do?"
                options={[
                  { text: "Wire the money — you recognise the voice", isCorrect: false, feedback: "AI voice cloning can replicate any voice from seconds of audio. This is a common scam tactic." },
                  { text: "Ignore it — only scammers call about money", isCorrect: false, feedback: "Legitimate requests can come by phone, but any urgent financial request deserves verification." },
                  { text: "Verify by calling your boss back on a number you already have on file — not the number that called you", isCorrect: true, feedback: "Correct! Always verify unexpected urgent requests through a separate, known contact method. Never trust the number that called you." },
                  { text: "Ask the caller a personal question to verify their identity", isCorrect: false, feedback: "AI scammers may have researched personal information. A separate call to a known number is more reliable." },
                ]}
                explanation="AI voice cloning can convincingly replicate any voice. The standard defence is to verify out-of-band: hang up and call the person back on a number you know to be correct, not the number that called you."
                onComplete={(c) => handleQuizComplete("quiz2", c)}
              />
              <MultipleChoice
                question="What is 'automation bias' in the context of AI use?"
                options={[
                  { text: "When AI automates tasks that humans should do manually", isCorrect: false, feedback: "That describes automation in general, not automation bias." },
                  { text: "When AI systems are biased towards certain types of automation", isCorrect: false, feedback: "This is not the meaning of automation bias." },
                  { text: "The tendency to over-trust and under-question AI-generated outputs because they come from a computer", isCorrect: true, feedback: "Correct! People tend to assume computer-generated outputs are more reliable or objective than human judgments — even when they are not." },
                  { text: "When AI replaces too many human jobs", isCorrect: false, feedback: "That describes technological unemployment, not automation bias." },
                ]}
                explanation="Automation bias is a well-documented cognitive phenomenon where people over-rely on automated systems. With AI, this manifests as accepting AI outputs without sufficient critical evaluation — a dangerous habit when AI can be confidently wrong."
                onComplete={(c) => handleQuizComplete("quiz3", c)}
              />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Excellent! You are now an informed, critical AI user. One final module to go: building your personal AI toolkit." />
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={() => router.push("/course/module-6")}>
                      Continue to Module 6 →
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
