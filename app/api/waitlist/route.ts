import { NextResponse } from 'next/server'
import { PostgrestError } from '@supabase/supabase-js'
import { supabase } from '@/utils/supabase'
import type { Database } from '@/utils/supabase'

export async function POST(request: Request) {
  try {
    // Using console.error to ensure logs appear in Vercel
    console.error('=== WAITLIST API START ===')
    console.error('1. Received waitlist submission request')
    
    // Log the entire request
    const body = await request.json()
    console.error('2. Request body:', JSON.stringify(body))
    const { email } = body

    if (!email) {
      console.error('3. No email provided')
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    console.error('4. Attempting to store email:', email)
    console.error('5. Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.error('6. Supabase key length:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0)
    
    // Test Supabase connection
    try {
      const { data: testData, error: testError } = await supabase
        .from('waitlist')
        .select('count')
        .limit(1)
      
      console.error('7. Test query result:', testError ? 'Error' : 'Success', testError || testData)
    } catch (testErr) {
      console.error('7a. Test query exception:', testErr)
    }
    
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
      console.error('8. Supabase error:', JSON.stringify(error))
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

    console.error('9. Successfully stored email:', JSON.stringify(data))
    console.error('=== WAITLIST API END ===')
    return NextResponse.json(
      { message: 'Successfully joined the waitlist!', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('10. Waitlist submission error:', error)
    console.error('=== WAITLIST API ERROR END ===')
    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    )
  }
} 