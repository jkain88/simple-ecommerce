import * as z from 'zod'

export const categorySchema = z.object({
  name: z.string(),
  description: z.string(),
})
