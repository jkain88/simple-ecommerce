import CartLines from '@/components/cart/CartLines'
import CheckoutSummary from '@/components/checkout/CheckoutSummary'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Cart() {
  return (
    <div className=" bg-gray-100">
      <div className="flex w-full justify-center gap-10 py-10">
        <CartLines />
        <CheckoutSummary
          buttonLabel="Proceed to Checkout"
          redirectLink="/checkout"
        />
      </div>
    </div>
  )
}
