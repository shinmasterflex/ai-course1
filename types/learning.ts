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
  | "video"
  | "image"
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

