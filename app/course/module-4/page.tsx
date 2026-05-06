/**
 * MODULE 4: DATA AND PREPROCESSING
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { FlipCardGrid, MatchingChallenge, QuickCheckCard } from "@/components/learning/lesson-interactions"
import { TextDisplay } from "@/components/learning/text-display"
import { ProgressBar } from "@/components/learning/progress-bar"
import { ModuleHero } from "@/components/learning/module-hero"
import { ModuleQuiz } from "@/components/learning/module-quiz"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Database } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useModuleQuiz } from "@/hooks/use-module-quiz"
import { moduleQuizData } from "@/lib/module-quiz-data"

export default function Module4Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-4"
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = useMemo(() => module?.sections ?? [], [module])
  const totalSections = sections.length
  const completedSectionIds = getCompletedSections(MODULE_ID)

  const { quizResults, handleQuizComplete, allQuizComplete } = useModuleQuiz(MODULE_ID, ["quiz1", "quiz2", "quiz3", "matching"])
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

  const handleSectionComplete = () => {
    const current = sections[currentSectionIndex]
    if (current) { markSectionComplete(MODULE_ID, current.id); setCurrentPosition(MODULE_ID, current.id) }
    if (currentSectionIndex < totalSections - 1) {
      const next = sections[currentSectionIndex + 1]
      setCurrentSectionIndex(currentSectionIndex + 1)
      router.push(`/course/module-4?section=${next.id}`)
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
            <h1 className="text-4xl font-bold mb-2">Module 4: Data and Preprocessing</h1>
            <p className="text-lg text-muted-foreground mb-4">Understand the fuel that powers every AI system</p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {currentSectionIndex === 0 && (
            <ModuleHero
              eyebrow="Module 4"
              title="Data is the foundation of every AI system"
              description="Learn what data is, where it comes from, how it gets cleaned, and how preprocessing shapes what AI can learn."
              imageSrc="/images/modules/module-4.jpg"
              imageAlt="Data pipelines and preprocessing for AI"
            />
          )}

          {/* 0: Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>
              <TextDisplay variant="callout" content="Every AI model is only as good as the data it was trained on. This module is a practical guide to what happens before model training: collection, cleaning, transformation, and feature engineering. If the input data is weak, the output intelligence is weak too." />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><Database className="h-4 w-4" /> What is in this module</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "What Is Data? - structured, unstructured, and everything in between",
                    "Data Collection - sources, methods, and what to watch out for",
                    "Data Quality - missing values, duplicates, bias, and consistency checks",
                    "Transformation & Preprocessing - normalisation, encoding categories, splitting",
                    "Feature Engineering - turning raw fields into useful model signals",
                    "Mini Exercise - clean a messy customer and email dataset conceptually",
                    "Module Quiz",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green" />{item}</li>
                  ))}
                </ul>
              </Card>
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">The practical pipeline you will use</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">1. Collection:</span> gather data from CRMs, forms, emails, product events, and support logs.</p>
                  <p><span className="font-medium text-foreground">2. Cleaning:</span> fix missing values, remove duplicates, standardise formats, and audit bias.</p>
                  <p><span className="font-medium text-foreground">3. Transformation:</span> convert fields into model-friendly representations (numbers, encoded categories, scaled ranges).</p>
                  <p><span className="font-medium text-foreground">4. Feature engineering:</span> build better predictors from raw columns, then train and evaluate.</p>
                </div>
              </Card>
              <QuickCheckCard
                prompt="What is the main goal of this module?"
                options={[
                  { id: "a", label: "Learn to build neural networks from scratch" },
                  { id: "b", label: "Understand how data is collected, cleaned, and prepared for AI training" },
                  { id: "c", label: "Memorise database query syntax" },
                  { id: "d", label: "Install a data pipeline tool" },
                ]}
                correctOptionId="b"
                explanation="This module is about understanding the data lifecycle - from raw collection through to the clean, structured inputs that machine learning models need."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Start Module</Button>
            </div>
          )}

          {/* 1: What Is Data? */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">What Is Data?</h2>
              <TextDisplay content="In AI, data is any recorded observation that a model can learn from. It comes in many forms - numbers, text, images, audio, video, and more." />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">The Two Main Categories</h3>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4 bg-background">
                    <p className="font-bold text-brand-green mb-1">Structured Data</p>
                    <p className="text-sm text-muted-foreground mb-2">Organised into rows and columns with a fixed schema. Easy for computers to process directly.</p>
                    <p className="text-xs font-medium text-foreground">Examples:</p>
                    <p className="text-xs text-muted-foreground">Spreadsheets, SQL database tables, CSV files, financial records, sensor readings</p>
                  </div>
                  <div className="rounded-lg border p-4 bg-background">
                    <p className="font-bold text-brand-orange mb-1">Unstructured Data</p>
                    <p className="text-sm text-muted-foreground mb-2">No fixed format or schema. Requires extra processing before a model can use it.</p>
                    <p className="text-xs font-medium text-foreground">Examples:</p>
                    <p className="text-xs text-muted-foreground">Emails, social media posts, photos, audio recordings, PDFs, video files</p>
                  </div>
                </div>
              </Card>
              <TextDisplay variant="callout" content="Most of the world's data is unstructured. One of the big challenges in AI is turning unstructured data into a form that models can learn from." />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">Data Types at a Glance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">Type</th>
                        <th className="text-left py-2 pr-4 font-semibold text-brand-orange">Examples</th>
                        <th className="text-left py-2 font-semibold text-brand-green">Common AI Use</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      {[
                        { type: "Numerical", examples: "Age, price, temperature", use: "Regression, classification" },
                        { type: "Categorical", examples: "Colour, job title, country", use: "Classification, grouping" },
                        { type: "Text", examples: "Reviews, articles, chat logs", use: "NLP, sentiment analysis, LLMs" },
                        { type: "Image", examples: "Photos, scans, screenshots", use: "Computer vision, generation" },
                        { type: "Audio", examples: "Speech, music, calls", use: "Speech recognition, generation" },
                        { type: "Time series", examples: "Stock prices, sensor logs", use: "Forecasting, anomaly detection" },
                      ].map(({ type, examples, use }) => (
                        <tr key={type} className="border-b last:border-0">
                          <td className="py-2 pr-4 font-medium text-foreground">{type}</td>
                          <td className="py-2 pr-4">{examples}</td>
                          <td className="py-2">{use}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              <FlipCardGrid
                cards={[
                  { title: "Structured", prompt: "Give an example of structured data.", answer: "A spreadsheet of customer orders with columns for date, product, quantity, and price." },
                  { title: "Unstructured", prompt: "Give an example of unstructured data.", answer: "A folder of customer support emails in plain text with no consistent format." },
                  { title: "Why it matters", prompt: "Why does the data type affect the AI approach?", answer: "Different types need different preprocessing steps. Text needs tokenisation; images need pixel normalisation; numbers may need scaling." },
                  { title: "Semi-structured", prompt: "What is semi-structured data?", answer: "Data that has some structure but not a rigid schema - like JSON, XML, or HTML. It is in between structured and fully unstructured." },
                ]}
              />
              <QuickCheckCard
                prompt="Which of the following is unstructured data?"
                options={[
                  { id: "a", label: "A spreadsheet of sales figures" },
                  { id: "b", label: "A database table of customer records" },
                  { id: "c", label: "A collection of product review text files" },
                  { id: "d", label: "A CSV export of sensor readings" },
                ]}
                correctOptionId="c"
                explanation="Text files with no fixed columns or schema are unstructured data. Spreadsheets, database tables, and CSVs are all structured."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 2: Data Collection */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Data Collection</h2>
              <TextDisplay content="Before a model can be trained, someone has to gather the data. Where data comes from - and how it is collected - has a huge effect on what a model can and cannot learn." />
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Relatable dataset examples</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-semibold text-brand-orange mb-1">Customer data (e-commerce)</p>
                    <p className="text-muted-foreground">customer_id, age, country, signup_channel, last_purchase_date, total_spend, churned_yes_no</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-semibold text-brand-orange mb-1">Email campaign list</p>
                    <p className="text-muted-foreground">email, first_name, segment, open_rate, click_rate, unsubscribed, last_contacted</p>
                  </div>
                </div>
              </Card>
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-4 text-brand-green">Common Data Sources</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {[
                    { source: "Internal systems", desc: "Databases, CRMs, logs, transaction records from within an organisation." },
                    { source: "Web scraping", desc: "Automated extraction of text, images, or structured data from public websites." },
                    { source: "APIs", desc: "Structured data feeds from services like Twitter, weather APIs, or financial data providers." },
                    { source: "Human labelling", desc: "Crowdsourced or expert annotation - humans manually label images, transcribe audio, or tag text." },
                    { source: "Surveys & forms", desc: "Direct input from users - structured but subject to self-reporting bias." },
                    { source: "Sensors & IoT", desc: "Real-time streams from physical devices: cameras, microphones, temperature sensors." },
                  ].map(({ source, desc }) => (
                    <div key={source} className="rounded-lg border bg-background p-3">
                      <p className="font-semibold text-brand-orange mb-1">{source}</p>
                      <p className="text-muted-foreground">{desc}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <TextDisplay variant="warning" content="Data collection is where bias often enters the pipeline. If you only collect data from one demographic, geography, or time period, the model will reflect those gaps." />
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange">From raw data to model-ready data: one simple pipeline</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Collection:</span> Pull customer records from CRM and campaign responses from an email platform.</p>
                  <p><span className="font-medium text-foreground">Cleaning:</span> Remove duplicate emails, fill missing country values, standardise date formats.</p>
                  <p><span className="font-medium text-foreground">Transformation:</span> Convert segment labels into encoded columns and scale total_spend.</p>
                  <p><span className="font-medium text-foreground">Feature engineering:</span> Create recency_days and avg_spend_per_order as new predictors.</p>
                  <p><span className="font-medium text-foreground">Outcome:</span> Train a churn model that now sees cleaner, more meaningful patterns.</p>
                </div>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange">Key Questions When Collecting Data</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Is it representative?</span> Does the data cover the full range of situations the model will encounter in the real world?</p>
                  <p><span className="font-medium text-foreground">Is it labelled correctly?</span> For supervised learning, labels need to be accurate. Mislabelled data teaches the model the wrong patterns.</p>
                  <p><span className="font-medium text-foreground">Is it legal and ethical?</span> Personal data must be collected with consent and handled according to privacy laws like GDPR.</p>
                  <p><span className="font-medium text-foreground">Is it fresh enough?</span> Stale data can produce models that are accurate for the past but miss current trends.</p>
                </div>
              </Card>
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">The labelling bottleneck</h3>
                <p className="text-sm text-muted-foreground mb-3">Supervised learning requires labelled data - and labelling is expensive. A few approaches to deal with this:</p>
                <div className="space-y-2 text-sm">
                  {[
                    { approach: "Active learning", detail: "The model identifies which unlabelled examples would be most useful to label, reducing annotation cost." },
                    { approach: "Semi-supervised learning", detail: "Train on a small labelled set and a large unlabelled set together, letting the model infer patterns from both." },
                    { approach: "Synthetic data", detail: "Generate artificial training examples using simulation or generative models when real data is scarce." },
                    { approach: "Transfer learning", detail: "Start from a model pre-trained on a large dataset and fine-tune with a smaller labelled set." },
                  ].map(({ approach, detail }) => (
                    <div key={approach} className="flex gap-3 border-b pb-2 last:border-0">
                      <span className="font-medium w-44 flex-shrink-0 text-brand-orange">{approach}</span>
                      <span className="text-muted-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <QuickCheckCard
                prompt="Why does the source of training data matter so much?"
                options={[
                  { id: "a", label: "It only affects the storage cost of the dataset" },
                  { id: "b", label: "Biases and gaps in the source data get encoded into the model's learned patterns" },
                  { id: "c", label: "It only matters for image data, not text" },
                  { id: "d", label: "The model automatically corrects for data source problems" },
                ]}
                correctOptionId="b"
                explanation="Models learn from the patterns in their training data. If the data over-represents certain groups or periods, the model inherits those biases."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 3: Data Cleaning */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Data Quality: Garbage In, Garbage Out</h2>
              <TextDisplay content="Raw data is almost never ready to use. It contains errors, duplicates, missing values, and inconsistencies. Data cleaning is the process of finding and fixing these problems before training begins." />
              <TextDisplay variant="callout" content="A common saying in data science: 'garbage in, garbage out.' A model trained on low-quality data will produce low-quality predictions, no matter how sophisticated the algorithm." />
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">What data quality means in practice</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">Quality issue</th>
                        <th className="text-left py-2 pr-4 font-semibold">Concrete example</th>
                        <th className="text-left py-2 font-semibold">Likely AI outcome if ignored</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      {[
                        {
                          issue: "Missing values",
                          example: "30% of customers have no income field",
                          outcome: "Churn risk model underestimates high-risk groups because key predictors are blank",
                        },
                        {
                          issue: "Duplicates",
                          example: "Same email appears 4 times after merging two lists",
                          outcome: "Model overweights repeated behavior and campaign automation spams users",
                        },
                        {
                          issue: "Bias",
                          example: "Training set has mostly urban customers and very few rural customers",
                          outcome: "Model performs well in cities but fails badly for rural users",
                        },
                        {
                          issue: "Inconsistent format",
                          example: "Dates stored as 03/04/25 and 2025-04-03 in same column",
                          outcome: "Wrong recency calculations lead to unreliable predictions",
                        },
                      ].map(({ issue, example, outcome }) => (
                        <tr key={issue} className="border-b last:border-0">
                          <td className="py-2 pr-4 font-medium text-foreground">{issue}</td>
                          <td className="py-2 pr-4">{example}</td>
                          <td className="py-2">{outcome}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">Common Data Quality Problems</h3>
                <div className="space-y-3">
                  {[
                    { problem: "Missing values", desc: "Fields left blank or recorded as null. A customer's age field may be empty because they declined to share it.", fix: "Fill with a mean/median, mark as unknown, or remove rows depending on how critical the field is." },
                    { problem: "Duplicates", desc: "The same record appears multiple times. Common when merging data from different systems.", fix: "De-duplicate by matching on unique identifiers or combinations of fields." },
                    { problem: "Inconsistent formatting", desc: "Dates recorded as '2024-01-15' in one system and '15/01/24' in another.", fix: "Standardise all values to a single canonical format before training." },
                    { problem: "Outliers", desc: "Extreme values that may be errors (an age of 999) or genuine but rare events.", fix: "Investigate the cause. Remove clear errors; keep genuine outliers but consider robust scaling." },
                    { problem: "Incorrect labels", desc: "A photo of a cat labelled as a dog. Common in large-scale human annotation tasks.", fix: "Audit a sample of labels, use inter-annotator agreement checks, or re-label flagged examples." },
                  ].map(({ problem, desc, fix }) => (
                    <Card key={problem} className="p-4">
                      <p className="font-bold text-brand-orange mb-1">{problem}</p>
                      <p className="text-sm text-muted-foreground mb-2">{desc}</p>
                      <p className="text-xs"><span className="font-medium text-brand-green">Common fix:</span> <span className="text-muted-foreground">{fix}</span></p>
                    </Card>
                  ))}
                </div>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">How poor data creates poor AI outcomes</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Loan approvals:</span> If historical approvals were biased against a group, the model learns to repeat that unfair pattern.</p>
                  <p><span className="font-medium text-foreground">Support ticket routing:</span> If ticket labels are noisy, the model sends customer issues to the wrong team.</p>
                  <p><span className="font-medium text-foreground">Email personalization:</span> If duplicate contacts inflate engagement stats, the model over-targets the wrong segments.</p>
                  <p><span className="font-medium text-foreground">Forecasting:</span> If outliers from data-entry errors are kept as real values, the model predicts unrealistic demand spikes.</p>
                </div>
              </Card>
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">A practical cleaning checklist</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "Check for and handle missing values in every column",
                    "Remove or merge exact duplicates",
                    "Standardise date, currency, and text formats",
                    "Investigate and decide on outlier treatment",
                    "Verify that labels or target values are correct on a sample",
                    "Check that class distributions are balanced enough for the task",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </Card>
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Mini exercise: clean this messy dataset (no coding)</h3>
                <p className="text-sm text-muted-foreground mb-3">Imagine this is a small email-campaign dataset:</p>
                <div className="overflow-x-auto mb-3">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-3">email</th>
                        <th className="text-left py-2 pr-3">country</th>
                        <th className="text-left py-2 pr-3">last_contacted</th>
                        <th className="text-left py-2">open_rate</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b"><td className="py-1 pr-3">amy@example.com</td><td className="py-1 pr-3">US</td><td className="py-1 pr-3">2026-04-01</td><td className="py-1">0.42</td></tr>
                      <tr className="border-b"><td className="py-1 pr-3">amy@example.com</td><td className="py-1 pr-3">United States</td><td className="py-1 pr-3">04/01/26</td><td className="py-1">0.42</td></tr>
                      <tr className="border-b"><td className="py-1 pr-3">sam@example.com</td><td className="py-1 pr-3">-</td><td className="py-1 pr-3">2026-03-29</td><td className="py-1">0.05</td></tr>
                      <tr><td className="py-1 pr-3">lee@example.com</td><td className="py-1 pr-3">UK</td><td className="py-1 pr-3">2026-13-01</td><td className="py-1">1.40</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Your task:</span> List at least 5 cleanup actions before model training.</p>
                  <p><span className="font-medium text-foreground">Suggested answer:</span> remove duplicate email rows, standardise country labels (US/United States), treat "-" as missing country, fix invalid date format (2026-13-01), cap or investigate impossible open_rate values above 1.0.</p>
                  <p><span className="font-medium text-foreground">Reflection:</span> If you skip these fixes, your model learns contradictions and broken patterns.</p>
                </div>
              </Card>
              <MatchingChallenge
                title="Problem to Fix"
                description="Match each data quality problem to its most common resolution."
                pairs={[
                  { id: "missing", left: "Missing values in a numeric column", right: "Fill with mean or median, or mark as unknown" },
                  { id: "dup", left: "Duplicate records from a system merge", right: "De-duplicate using unique identifiers" },
                  { id: "outlier", left: "An age value of 999 in survey data", right: "Investigate and remove if it is a clear entry error" },
                ]}
              />
              <QuickCheckCard
                prompt="What does 'garbage in, garbage out' mean in the context of AI?"
                options={[
                  { id: "a", label: "The model produces too much output text" },
                  { id: "b", label: "Poor-quality training data leads to poor-quality model predictions" },
                  { id: "c", label: "The model needs to be retrained every time new data arrives" },
                  { id: "d", label: "Garbage collection is a programming technique unrelated to AI" },
                ]}
                correctOptionId="b"
                explanation="Models learn the patterns in their training data. If that data has errors, gaps, or biases, the model's predictions will reflect those flaws."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 4: Preprocessing Techniques */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Transformation & Preprocessing Techniques</h2>
              <TextDisplay content="Once data is clean, it still needs transformation before a model can use it effectively. Different data types require different preprocessing steps, and small decisions here can strongly affect model performance." />
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Why preprocessing matters</h3>
                <p className="text-sm text-muted-foreground">Machine learning algorithms typically work with numbers. Raw data - especially text, images, and categories - needs to be converted and scaled so that all inputs are on comparable terms. Without this, one large-valued feature can dominate the model unfairly.</p>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-green">Simple demonstrations</h3>
                <div className="space-y-4 text-sm">
                  <div className="rounded-lg border p-3 bg-background">
                    <p className="font-semibold text-brand-orange mb-1">Normalization example (total_spend)</p>
                    <p className="text-muted-foreground mb-1">Raw values: 50, 200, 5000</p>
                    <p className="text-muted-foreground mb-1">Min-max scaling to 0-1: (x - min) / (max - min)</p>
                    <p className="text-muted-foreground">Scaled values: 0.00, 0.03, 1.00</p>
                  </div>
                  <div className="rounded-lg border p-3 bg-background">
                    <p className="font-semibold text-brand-orange mb-1">Encoding categories example (segment)</p>
                    <p className="text-muted-foreground mb-1">Raw category column: ["new", "vip", "new", "churn_risk"]</p>
                    <p className="text-muted-foreground mb-1">One-hot columns: is_new, is_vip, is_churn_risk</p>
                    <p className="text-muted-foreground">Row "vip" becomes [0, 1, 0]</p>
                  </div>
                </div>
              </Card>
              <div className="space-y-4">
                {[
                  {
                    technique: "Normalisation / Scaling",
                    when: "Numerical features with very different ranges",
                    howItWorks: "Rescales values to a standard range (e.g. 0-1) or standard score (mean=0, std=1) so no feature dominates due to its scale.",
                    example: "House prices (100,000-2,000,000) and number of bedrooms (1-6) are rescaled together before training.",
                  },
                  {
                    technique: "One-hot encoding",
                    when: "Categorical text labels that have no natural order",
                    howItWorks: "Converts each category into a separate binary column (1 or 0).",
                    example: "A 'colour' column with red/green/blue becomes three columns: is_red, is_green, is_blue.",
                  },
                  {
                    technique: "Tokenisation",
                    when: "Text data",
                    howItWorks: "Splits text into smaller units (tokens: words, subwords, or characters) that can be mapped to numerical IDs.",
                    example: "The sentence 'AI is useful' becomes token IDs [42, 8, 201] that the model processes.",
                  },
                  {
                    technique: "Train / Validation / Test Split",
                    when: "Every supervised learning project",
                    howItWorks: "Divides data into a training set (to learn from), a validation set (to tune the model), and a test set (for final evaluation only).",
                    example: "A common split: 70% train, 15% validation, 15% test. The test set is held out until the very end.",
                  },
                  {
                    technique: "Data augmentation",
                    when: "Image or audio data with limited training examples",
                    howItWorks: "Creates new training examples by applying transformations: flipping images, adjusting brightness, adding background noise.",
                    example: "A dataset of 1,000 chest X-rays is expanded to 5,000 by rotating and flipping each image.",
                  },
                ].map(({ technique, when, howItWorks, example }) => (
                  <Card key={technique} className="p-4">
                    <p className="font-bold text-brand-green mb-1">{technique}</p>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">When to use:</span> <span className="text-muted-foreground">{when}</span></p>
                      <p><span className="font-medium">How it works:</span> <span className="text-muted-foreground">{howItWorks}</span></p>
                      <p><span className="font-medium">Example:</span> <span className="text-muted-foreground">{example}</span></p>
                    </div>
                  </Card>
                ))}
              </div>
              <TextDisplay variant="callout" content="The train/validation/test split is one of the most important ideas in machine learning. Using the test set too early leads to overfitting to test data - the model appears better than it really is." />
              <QuickCheckCard
                prompt="What is the purpose of the test set in a train/validation/test split?"
                options={[
                  { id: "a", label: "It is used to train the model alongside the training set" },
                  { id: "b", label: "It is used to tune hyperparameters during development" },
                  { id: "c", label: "It is held out for a final unbiased evaluation of the trained model" },
                  { id: "d", label: "It is discarded after data cleaning" },
                ]}
                correctOptionId="c"
                explanation="The test set is kept completely separate until final evaluation. Using it earlier would cause you to overfit your model to those examples."
                accentClassName="border-brand-orange/20 bg-brand-orange/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 5: Feature Engineering */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-orange">Feature Engineering</h2>
              <TextDisplay content="Feature engineering is the process of creating new input variables - called features - from raw data to help a model learn better patterns. It is one of the most impactful skills in applied machine learning." />
              <TextDisplay variant="callout" content="'Coming up with features is difficult, time-consuming, and requires expert knowledge. Applied machine learning is basically feature engineering.' ??Andrew Ng" />
              <Card className="p-5 bg-gradient-to-br from-brand-green/5 to-brand-orange/5 border-brand-green/20">
                <h3 className="font-semibold mb-3 text-brand-green">Why raw data is often not enough</h3>
                <p className="text-sm text-muted-foreground mb-3">Raw data captures what happened. Feature engineering helps a model understand why and how. Consider a dataset of house sales:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold text-brand-orange">Raw feature</th>
                        <th className="text-left py-2 font-semibold text-brand-green">Engineered feature</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      {[
                        { raw: "Date of sale", eng: "Month of year (captures seasonality)" },
                        { raw: "Listing date + sale date", eng: "Days on market (signals demand)" },
                        { raw: "Total rooms + floor area", eng: "Area per room (captures density)" },
                        { raw: "Postcode", eng: "Distance to nearest school (captures desirability)" },
                      ].map(({ raw, eng }) => (
                        <tr key={raw} className="border-b last:border-0">
                          <td className="py-2 pr-4">{raw}</td>
                          <td className="py-2">{eng}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold mb-3 text-brand-orange">Common Feature Engineering Techniques</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { name: "Binning", desc: "Convert a continuous number into discrete buckets. Age 0-17 = 'minor', 18-64 = 'adult', 65+ = 'senior'." },
                    { name: "Interaction features", desc: "Multiply or combine two features to capture their relationship. Height × Width = Area." },
                    { name: "Log transformation", desc: "Apply log() to skewed numerical columns (e.g. income, house price) to make the distribution more normal." },
                    { name: "Date/time decomposition", desc: "Extract day of week, month, quarter, is_weekend from a timestamp field." },
                    { name: "Text-derived features", desc: "Word count, sentiment score, or keyword presence extracted from a raw text column." },
                    { name: "Lag features", desc: "Use past values as features. 'Sales last week' predicts 'sales this week' in time-series models." },
                  ].map(({ name, desc }) => (
                    <div key={name} className="flex gap-3 border-b pb-2 last:border-0">
                      <span className="font-medium w-44 flex-shrink-0 text-brand-green">{name}</span>
                      <span className="text-muted-foreground">{desc}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-5 border-brand-green/20 bg-brand-green/5">
                <h3 className="font-semibold mb-3 text-brand-green">Feature selection vs. feature engineering</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-semibold text-brand-orange mb-1">Feature engineering</p>
                    <p className="text-muted-foreground">Creating new features from raw data. You are adding information the model did not have before.</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="font-semibold text-brand-orange mb-1">Feature selection</p>
                    <p className="text-muted-foreground">Choosing which features to keep and which to drop. Too many irrelevant features can hurt model performance.</p>
                  </div>
                </div>
              </Card>
              <FlipCardGrid
                cards={[
                  { title: "Binning", prompt: "When is binning useful?", answer: "When the exact value matters less than the range. Converting exact age to age group simplifies patterns the model needs to learn." },
                  { title: "Log transform", prompt: "Why apply a log to income data?", answer: "Income distributions are often heavily right-skewed. Log transform compresses the tail and makes the distribution more normal, which helps many algorithms." },
                  { title: "Lag features", prompt: "When would you use a lag feature?", answer: "In time-series problems. Yesterday's temperature helps predict today's; last month's sales helps predict this month's." },
                  { title: "Feature leakage", prompt: "What is feature leakage and why is it a problem?", answer: "Leakage happens when a feature contains information from the future or the target variable. The model seems accurate in testing but fails in production." },
                ]}
              />
              <QuickCheckCard
                prompt="What best describes feature engineering?"
                options={[
                  { id: "a", label: "Deleting irrelevant columns from a dataset" },
                  { id: "b", label: "Creating new informative input variables from raw data" },
                  { id: "c", label: "Choosing which model architecture to use" },
                  { id: "d", label: "Scaling numerical values to the same range" },
                ]}
                correctOptionId="b"
                explanation="Feature engineering means creating new features - transforming or combining raw data into variables that better represent the underlying patterns the model should learn."
                accentClassName="border-brand-green/20 bg-brand-green/5"
              />
              <Button onClick={handleSectionComplete} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">Next</Button>
            </div>
          )}

          {/* 6: Quiz */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-green">Module Quiz</h2>
              <Card className="p-5 border-brand-orange/20 bg-brand-orange/5">
                <h3 className="font-semibold mb-3 text-brand-orange">Before you start, sanity-check these ideas</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Data types:</span> structured vs. unstructured; numerical, categorical, text, image, time series.</p>
                  <p><span className="font-medium text-foreground">Data quality:</span> missing values, duplicates, inconsistencies, and incorrect labels all hurt model performance.</p>
                  <p><span className="font-medium text-foreground">Preprocessing:</span> normalisation, encoding, tokenisation, and train/test splitting prepare data for training.</p>
                  <p><span className="font-medium text-foreground">Feature engineering:</span> creating new input variables from raw data to help the model find better patterns.</p>
                </div>
              </Card>
              <ModuleQuiz questions={questions} results={quizResults} onAnswer={handleQuizComplete} />
              {allQuizComplete && (
                <div className="space-y-4">
                  <TextDisplay variant="success" content="Well done! You now understand how data is collected, cleaned, preprocessed, and engineered for AI. Next: AI Ethics, Safety & Society." />
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={() => router.push("/course/module-5")}>
                      Continue to Module 5
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


