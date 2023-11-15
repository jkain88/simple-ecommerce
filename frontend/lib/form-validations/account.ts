import { z } from 'zod'

export const profileSchema = z.object({
  fullName: z.string().min(2).max(100),
  gender: z.enum(['male', 'female', 'others']),
  contactNumber: z.string().min(10).max(10),
  birthday: z.date(),
  email: z.string().email(),
})
