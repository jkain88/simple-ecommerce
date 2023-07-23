import * as z from 'zod'

export const signUpSchema = z.object({
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

export const signInSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z
    .string({
      required_error: 'This field is required',
    })
    .min(8, {
      message: 'This field is required'
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

export const resetPasswordSchema = z.object({
  currentPassword: z.string({
    required_error: 'This field is required',
  }),
  newPassword: z
    .string()
    .min(8)
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
    }),
  confirmNewPassword: z
    .string()
    .min(8)
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
    }),
})
