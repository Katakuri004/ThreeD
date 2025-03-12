import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function sendVerificationEmail(email: string, otp: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: '3D Model Hub <onboarding@resend.dev>',
      to: email,
      subject: 'Verify Your Account - 3D Model Hub',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify Your Account</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; margin-bottom: 20px;">Verify Your Account</h1>
            </div>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h2 style="color: #333; letter-spacing: 4px; font-size: 32px; margin: 0;">${otp}</h2>
            </div>
            
            <p style="text-align: center; color: #666; margin-bottom: 20px;">
              Thank you for joining 3D Model Hub! Please use the verification code above to complete your account setup.
            </p>
            
            <p style="text-align: center; color: #666; font-size: 14px;">
              This code will expire in 10 minutes. If you did not request this verification, please ignore this email.
            </p>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Failed to send verification email:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error sending verification email:', error)
    throw error
  }
} 