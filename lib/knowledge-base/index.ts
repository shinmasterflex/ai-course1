import fs from "fs"
import path from "path"

interface KnowledgeIndex {
  [key: string]: {
    file: string
    keywords: string[]
    description: string
  }
}

// Knowledge base index - maps topics to their respective files
const knowledgeIndex: KnowledgeIndex = {
  "module-0": {
    file: "module-0-introduction.md",
    keywords: [
      "introduction",
      "swiftcourse",
      "problem",
      "solution",
      "product",
      "strategic model",
      "big five",
      "ocean",
      "personality",
    ],
    description: "Introduction to SwiftCourse, the problem it solves, and the OCEAN personality assessment",
  },
  "module-1": {
    file: "module-1-neurobiology.md",
    keywords: [
      "neurobiology",
      "growth mindset",
      "brain",
      "neurology",
      "goal seeking",
      "stress",
      "achievement",
      "mindset",
      "mad analysis",
    ],
    description: "Neurobiology of learning, growth mindset, stress management, and goal achievement",
  },
  "module-2": {
    file: "module-2-learning-habits.md",
    keywords: [
      "learning",
      "habits",
      "measurement",
      "kpi",
      "limbic friction",
      "task bracketing",
      "21-day protocol",
      "mistakes",
      "perfectionism",
      "absorptive capacity",
      "sponge",
      "context-independent",
      "harmonious passion",
      "wabi sabi",
    ],
    description: "Learning processes, habit formation, measurement, and overcoming obstacles to growth",
  },
  general: {
    file: "general-info.md",
    keywords: ["help", "how to", "navigation", "progress", "course structure", "getting started"],
    description: "General information about using the platform and navigating the course",
  },
}

export async function getRelevantKnowledge(query: string): Promise<string> {
  const lowerQuery = query.toLowerCase()

  // Find relevant knowledge base files based on keywords
  const relevantFiles: string[] = []

  for (const [key, value] of Object.entries(knowledgeIndex)) {
    const hasKeyword = value.keywords.some((keyword) => lowerQuery.includes(keyword.toLowerCase()))

    if (hasKeyword) {
      relevantFiles.push(value.file)
    }
  }

  // If no specific match, include general info
  if (relevantFiles.length === 0) {
    relevantFiles.push("general-info.md")
  }

  // Read and combine relevant knowledge base files
  let knowledgeContent = ""

  for (const file of relevantFiles) {
    try {
      const filePath = path.join(process.cwd(), "lib", "knowledge-base", "content", file)
      const content = fs.readFileSync(filePath, "utf-8")
      knowledgeContent += `\n\n--- ${file} ---\n${content}`
    } catch (error) {
      console.error(`Error reading knowledge base file ${file}:`, error)
    }
  }

  return knowledgeContent || "No specific knowledge base content found for this query."
}
