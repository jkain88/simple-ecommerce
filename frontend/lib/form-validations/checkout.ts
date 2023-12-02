import { z } from 'zod'
import { addressSchema } from './account'

export const checkoutSchema = z.object({
  address: addressSchema,
  checkoutLine: z.object({
    product_variant: z.object({
      name: z.string(),
    }),
  }),
})
