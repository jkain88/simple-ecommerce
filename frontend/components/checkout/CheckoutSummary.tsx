import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

type Props = {
  buttonLabel: string
  redirectLink: string
}

const CheckoutSummary: React.FC<Props> = ({ buttonLabel, redirectLink }) => {
  return (
    <div className="sticky top-6 max-h-72 w-72 shrink-0 bg-white px-4 py-8">
      <p className="text-lg font-semibold">Checkout Summary</p>
      <div className="mt-4 flex flex-col gap-4 divide-y-2">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p>Subtotal:</p>
            <p>₱0.00</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping Fee:</p>
            <p>₱0.00</p>
          </div>
        </div>
        <div className="flex justify-between pt-4">
          <p>Total:</p>
          <p>₱0.00</p>
        </div>
      </div>
      <Link href={redirectLink}>
        <Button className="mt-4 w-full">{buttonLabel}</Button>
      </Link>
    </div>
  )
}

export default CheckoutSummary
