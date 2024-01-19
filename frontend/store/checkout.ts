import { Checkout } from '@/lib/Api'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CheckoutState {
  checkout: Checkout | null
  setCheckout: (checkout: Checkout) => void
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      checkout: null,
      setCheckout: (checkout: Checkout) => set({ checkout }),
    }),
    {
      name: 'checkoutStorage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
