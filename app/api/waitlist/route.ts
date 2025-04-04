import { NextResponse } from 'next/server'
import { PostgrestError } from '@supabase/supabase-js'
import { supabase } from '@/utils/supabase'
import type { Database } from '@/utils/supabase'

export async function POST(request: Request) {
  try {
    console.log('Received waitlist submission request')
    const { email } = await request.json()

    if (!email) {
      console.log('No email provided')
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    console.log('Attempting to store email:', email)
    
    // Store in Supabase with proper typing
    const { data, error } = await supabase
      .from('waitlist')
      .insert({
        email,
        signed_up_at: new Date().toISOString(),
        status: 'active'
      })
      .select()

    if (error) {
      console.error('Supabase error:', error)
      // Properly typed error handling
      const pgError = error as PostgrestError
      if (pgError.code === '23505') {
        return NextResponse.json(
          { error: 'You\'re already on the waitlist!' },
          { status: 400 }
        )
      }
      throw error
    }

    console.log('Successfully stored email:', data)
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