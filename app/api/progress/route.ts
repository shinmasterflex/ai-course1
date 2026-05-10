import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  return NextResponse.json(
    {
      error: 'This endpoint has been retired. Progress now persists directly through Supabase-backed client state.',
    },
    { status: 410 }
  )
}

export async function PUT() {
  return NextResponse.json(
    {
      error: 'This endpoint has been retired. Progress now persists directly through Supabase-backed client state.',
    },
    { status: 410 }
  )
}

export async function POST() {
  return NextResponse.json(
    {
      error: 'This endpoint has been retired. Progress now persists directly through Supabase-backed client state.',
    },
    { status: 410 }
  )
}
