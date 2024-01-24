import {
  Checkout as APICheckout,
  CheckoutLine as APICheckoutLine,
} from '@/lib/Api'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CheckoutLine extends APICheckoutLine {
  isSelected: boolean
}

export interface Checkout extends APICheckout {
  lines?: CheckoutLine[]
}

interface CheckoutState {
  checkout: Checkout | null
  setCheckout: (checkout: Checkout) => void
  resetCheckout: () => void
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      checkout: null,
      setCheckout: (checkout: Checkout) => set({ checkout }),
      resetCheckout: () => set({ checkout: null }),
    }),
    {
      name: 'checkoutStorage',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
)
