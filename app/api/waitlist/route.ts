import { NextResponse } from 'next/server'

const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL as string
if (!WEBHOOK_URL) {
  throw new Error('GOOGLE_SHEETS_WEBHOOK_URL is not defined')
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      console.error('No email provided')
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    console.log('Processing email submission:', email)

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

    console.log('Successfully added email to Google Sheets')
    
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