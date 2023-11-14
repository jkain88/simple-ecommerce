import { z } from 'zod'

export const profileSchema = z.object({
  fullName: z.string().min(2).max(100),
  contactNumber: z.string().min(10).max(10),
  birthday: z.date(),
  gender: z.string().min(4).max(6),
  email: z.string().email(),
})
