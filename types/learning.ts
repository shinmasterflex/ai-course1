/**
 * TYPE DEFINITIONS FOR LEARNING COMPONENTS
 * Defines the structure of learning content and interactive elements
 */

/**
 * Base interface for all learning components
 */
export interface LearningComponent {
  id: string
  type: ComponentType
}

/**
 * Available component types for modular learning screens
 */
export type ComponentType =
  | "text"
  | "multipleChoice"
  | "flashcard"
  | "slideshow"
  | "video"
  | "image"
  | "personalityQuiz"
  | "progress"

/**
 * TEXT DISPLAY COMPONENT
 * For displaying formatted text content (supports markdown)
 */
export interface TextComponent extends LearningComponent {
  type: "text"
  content: string
  variant?: "default" | "callout" | "warning" | "success"
}

/**
 * MULTIPLE CHOICE COMPONENT
 * Interactive quiz questions with instant feedback
 */
export interface MultipleChoiceComponent extends LearningComponent {
  type: "multipleChoice"
  question: string
  options: {
    id: string
    text: string
    isCorrect: boolean
    feedback?: string
  }[]
  explanation?: string
}

/**
 * FLASHCARD COMPONENT
 * Flip cards for memorization and concept learning
 */
export interface FlashcardComponent extends LearningComponent {
  type: "flashcard"
  cards: {
    id: string
    front: string
    back: string
  }[]
}

/**
 * SLIDESHOW COMPONENT
 * Carousel for presenting chunked information
 */
export interface SlideshowComponent extends LearningComponent {
  type: "slideshow"
  slides: {
    id: string
    title: string
    content: string
    image?: string
  }[]
}

/**
 * VIDEO COMPONENT
 * Embedded video player
 */
export interface VideoComponent extends LearningComponent {
  type: "video"
  url: string
  title: string
  description?: string
}

/**
 * IMAGE COMPONENT
 * Display images with captions
 */
export interface ImageComponent extends LearningComponent {
  type: "image"
  url: string
  alt: string
  caption?: string
}

/**
 * PERSONALITY QUIZ COMPONENT
 * OCEAN/Big Five personality assessment questions
 */
export interface PersonalityQuizComponent extends LearningComponent {
  type: "personalityQuiz"
  questions: PersonalityQuestion[]
  trait: "openness" | "conscientiousness" | "extraversion" | "agreeableness" | "neuroticism"
}

export interface PersonalityQuestion {
  id: string
  text: string
  trait: string
  aspect: string // e.g., 'openness' or 'intellect' for Openness trait
  reversed?: boolean // Some questions are reverse-scored
}

/**
 * PROGRESS COMPONENT
 * Visual progress indicator
 */
export interface ProgressComponent extends LearningComponent {
  type: "progress"
  current: number
  total: number
  label?: string
}

/**
 * MODULE STRUCTURE
 * Defines the structure of a learning module
 */
export interface Module {
  id: string
  title: string
  description: string
  components: LearningComponent[]
  estimatedTime?: number // in minutes
}

/**
 * OCEAN PERSONALITY RESULTS
 * Structure for storing personality assessment results
 */
export interface OceanResults {
  openness: {
    score: number
    openness: number // Aesthetic appreciation
    intellect: number // Intellectual curiosity
  }
  conscientiousness: {
    score: number
    industriousness: number // Goal-oriented
    orderliness: number // Organization
  }
  extraversion: {
    score: number
    enthusiasm: number // Social energy
    assertiveness: number // Leadership
  }
  agreeableness: {
    score: number
    compassion: number // Empathy
    politeness: number // Respect
  }
  neuroticism: {
    score: number
    withdrawal: number // Anxiety
    volatility: number // Emotional reactivity
  }
}
