import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
// import { NextRequest, NextResponse } from 'next/server'


import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  const code = searchParams.get('code')

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  
  if (token_hash && type) {
    redirectTo.searchParams.delete('token_hash')
    redirectTo.searchParams.delete('type')
    const supabase = createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      redirectTo.searchParams.delete('next')
      return NextResponse.redirect(redirectTo)
    }
  }

  if (code) {
    redirectTo.searchParams.delete('code')
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      redirectTo.searchParams.delete('next')
      return NextResponse.redirect(redirectTo)
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}

// export async function GET(req: NextRequest) {
//   const cookieStore = cookies()
//   const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
//   const { searchParams } = new URL(req.url)
//   const code = searchParams.get('code')

//   if (code) {
//     await supabase.auth.exchangeCodeForSession(code)
//   }

//   return NextResponse.redirect(new URL('/upload', req.url))
// }