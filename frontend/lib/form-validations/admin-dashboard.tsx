import * as z from 'zod'

export const categorySchema = z.object({
  name: z.string(),
  description: z.string(),
})

export const brandSchema = z.object({
  name: z.string(),
})
