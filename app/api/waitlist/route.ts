import { NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Store in Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email,
          signed_up_at: new Date().toISOString(),
          status: 'active'
        }
      ])
      .select()

    if (error) {
      // If it's a unique constraint error, return a nicer message
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'You\'re already on the waitlist!' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json(
      { message: 'Successfully joined the waitlist!', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Waitlist submission error:', error)
    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    )
  }
} 