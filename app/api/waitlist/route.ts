import { NextResponse } from 'next/server'

const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL as string
if (!WEBHOOK_URL) {
  throw new Error('GOOGLE_SHEETS_WEBHOOK_URL is not defined')
}

// Simple in-memory rate limiting
const RATE_LIMIT_WINDOW = 3600000 // 1 hour in milliseconds
const MAX_REQUESTS_PER_IP = 5
const ipRequestCounts = new Map<string, { count: number; timestamp: number }>()

function isValidEmail(email: string) {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const requestData = ipRequestCounts.get(ip)

  if (!requestData) {
    ipRequestCounts.set(ip, { count: 1, timestamp: now })
    return true
  }

  if (now - requestData.timestamp > RATE_LIMIT_WINDOW) {
    ipRequestCounts.set(ip, { count: 1, timestamp: now })
    return true
  }

  if (requestData.count >= MAX_REQUESTS_PER_IP) {
    return false
  }

  requestData.count++
  return true
}

export async function POST(request: Request) {
  try {
    // Get client IP
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        source: 'website'
      })
    })

    if (!response.ok) {
      throw new Error('Failed to submit to Google Sheets')
    }
    
    return NextResponse.json({
      message: 'Successfully joined the waitlist!'
    })

  } catch (error) {
    console.error('Error processing waitlist submission:', error)
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    )
  }
} 