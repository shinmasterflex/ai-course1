import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { getRelevantKnowledge } from "@/lib/knowledge-base"
import { enforceRateLimit } from '@/lib/rate-limit'
import { verifyTurnstileToken } from '@/lib/bot-protection'

export async function POST(request: NextRequest) {
  try {
    const rateLimit = enforceRateLimit(request, {
      keyPrefix: 'api-ai-chat',
      maxRequests: 20,
      windowMs: 60 * 1000,
    })

    if (rateLimit.limited) {
      return NextResponse.json(
        { error: 'Too many AI requests. Please wait and try again.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfterSeconds),
          },
        },
      )
    }

    const turnstileToken = request.headers.get('x-turnstile-token')
    if (turnstileToken) {
      const botVerification = await verifyTurnstileToken(request, turnstileToken)

      if (!botVerification.ok) {
        return NextResponse.json({ error: botVerification.reason ? botVerification.reason : 'Bot verification failed.' }, { status: 403 })
      }
    }

    const { message, history } = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      console.error("[v0] GEMINI_API_KEY is not configured")
      return NextResponse.json(
        { error: "AI service is not configured. Please add GEMINI_API_KEY to environment variables." },
        { status: 500 },
      )
    }

    console.log("[v0] Initializing Gemini AI with API key")
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

    // Get relevant knowledge from knowledge base
    const relevantKnowledge = await getRelevantKnowledge(message)
    console.log("[v0] Retrieved relevant knowledge:", relevantKnowledge.substring(0, 100) + "...")

    // Build context from chat history
    const chatHistory = history
      .slice(-5) // Last 5 messages for context
      .map((msg: any) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n")

    // Create enhanced prompt with knowledge base context
    const enhancedPrompt = `You are a helpful AI learning assistant for Cognijin, an online learning platform focused on personal development, neurobiology, and growth mindset.

KNOWLEDGE BASE CONTEXT:
${relevantKnowledge}

CHAT HISTORY:
${chatHistory}

CURRENT USER QUESTION:
${message}

Please provide a helpful, accurate, and friendly response. If the question is about course content, use the knowledge base context provided. If you're not sure about something, be honest about it. Keep responses concise but informative.`


    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" })
    console.log("[v0] Getting generative model : gemini-2.5-flash-lite")
    console.log("[v0] Generating content...")
    const result = await model.generateContent(enhancedPrompt)
    const response = result.response
    const text = response.text()

    console.log("[v0] Successfully generated response")
    return NextResponse.json({ response: text })
  } catch (error: any) {
    console.error("[v0] AI Chat Error:", error)
    console.error("[v0] Error message:", error?.message)
    console.error("[v0] Error stack:", error?.stack)

    return NextResponse.json(
      {
        error: "Failed to get response from AI. Please try again.",
        details: error?.message ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
