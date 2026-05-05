/**
 * COURSE STRUCTURE
 * Centralized definition of all modules and sections
 * Single source of truth for course content
 */

export interface Section {
  id: string
  title: string
  completed: boolean
}

export interface Module {
  id: string
  slug: string
  title: string
  sections: Section[]
  status?: string
  completionRate?: number
}

export interface CourseStructure {
  modules: Module[]
}

export const courseStructure: CourseStructure = {
  modules: [
    {
      id: "module-0",
      slug: "module-0",
      title: "Module 0: Welcome to AI",
      sections: [
        { id: "welcome", title: "Welcome & Course Overview", completed: false },
        { id: "ai-is-everywhere", title: "AI Is Already Around You", completed: false },
        { id: "what-youll-learn", title: "What You'll Learn", completed: false },
        { id: "how-to-use-course", title: "How to Use This Course", completed: false },
        { id: "summary", title: "Summary & Next Steps", completed: false },
      ],
    },
    {
      id: "module-1",
      slug: "module-1",
      title: "Module 1: What Is Artificial Intelligence?",
      sections: [
        { id: "module-overview", title: "Module Overview", completed: false },
        { id: "defining-ai", title: "Defining AI", completed: false },
        { id: "brief-history", title: "A Brief History of AI", completed: false },
        { id: "types-of-ai", title: "Types of AI", completed: false },
        { id: "ai-in-your-life", title: "AI in Your Daily Life", completed: false },
        { id: "myths-vs-reality", title: "Myths vs. Reality", completed: false },
        { id: "module-quiz", title: "Module Quiz", completed: false },
      ],
    },
    {
      id: "module-2",
      slug: "module-2",
      title: "Module 2: How Machines Learn",
      sections: [
        { id: "module-overview", title: "Module Overview", completed: false },
        { id: "what-is-ml", title: "What Is Machine Learning?", completed: false },
        { id: "training-data", title: "Training Data Explained", completed: false },
        { id: "supervised-unsupervised", title: "Supervised vs. Unsupervised Learning", completed: false },
        { id: "neural-networks", title: "Neural Networks Simply Explained", completed: false },
        { id: "what-ai-cant-do", title: "What AI Can't Do", completed: false },
        { id: "module-quiz", title: "Module Quiz", completed: false },
      ],
    },
    {
      id: "module-3",
      slug: "module-3",
      title: "Module 3: Large Language Models & Prompting",
      sections: [
        { id: "module-overview", title: "Module Overview", completed: false },
        { id: "what-is-llm", title: "What Is a Language Model?", completed: false },
        { id: "how-chatgpt-works", title: "How ChatGPT Works", completed: false },
        { id: "anatomy-of-prompt", title: "The Anatomy of a Prompt", completed: false },
        { id: "prompt-techniques", title: "Effective Prompting Techniques", completed: false },
        { id: "hands-on-practice", title: "Hands-On Practice", completed: false },
        { id: "module-quiz", title: "Module Quiz", completed: false },
      ],
    },
    {
      id: "module-4",
      slug: "module-4",
      title: "Module 4: AI Tools for Everyday Life",
      sections: [
        { id: "module-overview", title: "Module Overview", completed: false },
        { id: "ai-writing", title: "AI Writing Assistants", completed: false },
        { id: "ai-images", title: "AI Image Generation", completed: false },
        { id: "ai-productivity", title: "AI for Productivity", completed: false },
        { id: "ai-creative", title: "AI in Creative Work", completed: false },
        { id: "choosing-tools", title: "Choosing the Right Tool", completed: false },
        { id: "module-quiz", title: "Module Quiz", completed: false },
      ],
    },
    {
      id: "module-5",
      slug: "module-5",
      title: "Module 5: AI Ethics, Safety & Society",
      sections: [
        { id: "module-overview", title: "Module Overview", completed: false },
        { id: "ai-bias", title: "AI Bias & Fairness", completed: false },
        { id: "privacy-data", title: "Privacy & Your Data", completed: false },
        { id: "misinformation", title: "Misinformation & Deepfakes", completed: false },
        { id: "responsible-ai", title: "Responsible AI Use", completed: false },
        { id: "ai-future", title: "The Future of AI", completed: false },
        { id: "module-quiz", title: "Module Quiz", completed: false },
      ],
    },
    {
      id: "module-6",
      slug: "module-6",
      title: "Module 6: Your AI Toolkit",
      sections: [
        { id: "module-overview", title: "Module Overview", completed: false },
        { id: "no-code-ai", title: "No-Code AI Tools", completed: false },
        { id: "ai-workflows", title: "Building Simple AI Workflows", completed: false },
        { id: "ai-project", title: "Your First AI Mini-Project", completed: false },
        { id: "next-steps", title: "Next Steps & Resources", completed: false },
      ],
    },
    {
      id: "module-7",
      slug: "module-7",
      title: "Module 7: AI for Business & Work",
      sections: [
        { id: "module-overview", title: "Module Overview", completed: false },
        { id: "ai-in-the-workplace", title: "AI in the Workplace", completed: false },
        { id: "ai-and-jobs", title: "AI & the Future of Jobs", completed: false },
        { id: "industry-applications", title: "AI Across Industries", completed: false },
        { id: "ai-strategy", title: "Building an AI Strategy", completed: false },
        { id: "building-ai-skills", title: "Building Your AI Skills", completed: false },
        { id: "module-quiz", title: "Module Quiz", completed: false },
      ],
    },
    {
      id: "module-8",
      slug: "module-8",
      title: "Module 8: The Future of AI",
      sections: [
        { id: "module-overview", title: "Module Overview", completed: false },
        { id: "current-frontiers", title: "Current AI Frontiers", completed: false },
        { id: "agi-explained", title: "What Is AGI?", completed: false },
        { id: "ai-governance", title: "AI Governance & Policy", completed: false },
        { id: "ai-careers", title: "AI Careers & Opportunities", completed: false },
        { id: "your-ai-future", title: "Your AI Future", completed: false },
        { id: "module-quiz", title: "Module Quiz", completed: false },
      ],
    },
  ],
}

export function getCourseStructure(): CourseStructure {
  return courseStructure
}
