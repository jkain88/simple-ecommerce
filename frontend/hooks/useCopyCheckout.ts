import { Checkout, useCheckoutStore } from '@/store/checkout'
import { useEffect, useState } from 'react'

export const useCopyCheckout = () => {
  const checkoutStore = useCheckoutStore((state) => state.checkout)
  const [checkout, setCheckout] = useState<Checkout | null>(null)

  useEffect(() => {
    if (checkoutStore !== null) {
      if (Object.keys(checkoutStore!).length !== 0) {
        setCheckout((prev) => checkoutStore)
      }
    }
  }, [checkoutStore])

  return checkout
}
