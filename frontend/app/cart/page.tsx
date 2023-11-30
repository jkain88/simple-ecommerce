import CartLine from '@/components/cart/CartLine'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Cart() {
  return (
    <div className=" bg-gray-100">
      <div className="flex w-full justify-center gap-10 py-10">
        <CartLine />
        <div className="max-h-72  w-72 shrink-0 bg-white px-4 py-8">
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
          <Link href="/checkout">
            <Button className="mt-4 w-full">Proceed to checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
