import { z } from 'zod'

export const profileSchema = z.object({
  fullName: z.string().min(2).max(100),
  gender: z.enum(['male', 'female', 'others']),
  contactNumber: z.string().min(10).max(13),
  birthday: z.date(),
  email: z.string().email(),
})

export const addressSchema = z.object({
  fullName: z.string().min(2).max(100),
  street: z.string().min(2).max(100),
  contactNumber: z.string().min(10).max(13),
  barangay: z.string().min(2).max(13),
  city: z.string().min(2).max(13),
  province: z.string().min(2).max(10),
  deliveryLabel: z.string().min(2).max(10),
})
