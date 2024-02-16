"use client"

import CartLines from '@/components/cart/CartLines'
import CheckoutSummary from '@/components/checkout/CheckoutSummary'
import { useCopyCheckout } from '@/hooks/useCopyCheckout'

export default function Cart() {
  const checkout = useCopyCheckout()
  return (
    <div className=" bg-gray-100">
      <div className="flex w-full flex-col justify-center gap-10 px-5 py-10 md:flex-row">
        <CartLines />
        <CheckoutSummary
          checkout={checkout}
          buttonLabel="Proceed to Checkout"
          redirectLink="/checkout"
        />
      </div>
    </div>
  )
}
