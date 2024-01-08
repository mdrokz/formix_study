'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Login() {
  const supabase = createClientComponentClient()

  return (
    <Auth
      supabaseClient={supabase}
      view='verify_otp'
      appearance={{ theme: ThemeSupa }}
      theme='dark'
      otpType='email'
      showLinks={true} providers={[]}

    />
  )
}