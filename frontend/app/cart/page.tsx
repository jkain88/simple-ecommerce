import CartLines from '@/components/cart/CartLines'
import CheckoutSummary from '@/components/checkout/CheckoutSummary'

export default function Cart() {
  return (
    <div className=" bg-gray-100">
      <div className="flex w-full flex-col justify-center gap-10 px-5 py-10 md:flex-row">
        <CartLines />
        <CheckoutSummary
          buttonLabel="Proceed to Checkout"
          redirectLink="/checkout"
        />
      </div>
    </div>
  )
}
