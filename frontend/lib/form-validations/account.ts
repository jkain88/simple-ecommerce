import { z } from 'zod'

export const profileSchema = z.object({
  firstName: z.string().min(2).max(100).optional(),
  lastName: z.string().min(2).max(100).optional(),
  gender: z.enum(['male', 'female', 'others']).optional(),
  contactNumber: z.string().min(10).max(13).optional(),
  birthday: z.string().nullable().optional(),
  email: z.string().email(),
})

export const addressSchema = z.object({
  street: z.string().min(2).max(100).optional(),
  contact_number: z.string().min(10).max(13).optional(),
  city_area: z.string().min(2).max(50),
  city: z.string().min(2).max(50),
  province: z.string().min(2).max(50),
  postal_code: z.string().min(2).max(10),
  delivery_label: z.string().min(2).max(10).optional(),
})
