import { type NextRequest, NextResponse } from "next/server"
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


    return NextResponse.json({ response: "AI service is not configured." })
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
