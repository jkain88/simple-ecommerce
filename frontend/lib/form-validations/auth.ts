import * as z from 'zod'

export const authSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z
    .string()
    .min(8)
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
    }),
})

export const verifyEmailSchema = z.object({
  verificationCode: z.string().min(6).max(6),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
})
