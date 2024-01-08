'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Box, Button, Card, Text, TextFieldInput } from '@radix-ui/themes'
import { useState } from 'react'

export default function SendOtp() {
  const supabase = createClientComponentClient()

  const [email, setEmail] = useState('');

  const sendOTP = async () => {
    // check email with regex 
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
      alert('Please enter a valid email address')
      return
    }
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: false,
      },
    })

    if (error) {
      alert(error.message)
    } else {
      alert('OTP sent successfully')
    }

    console.log(data);
  }

  return (
    <Box>
      <Text>Email address</Text>
      <TextFieldInput onChange={(e) => setEmail(e.currentTarget.value)} type="email" placeholder="Your Email address" />
      <Button onClick={sendOTP}>Send OTP</Button>
    </Box>
  )
}