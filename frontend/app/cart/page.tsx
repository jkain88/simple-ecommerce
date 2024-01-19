import CartLines from '@/components/cart/CartLines'
import CheckoutSummary from '@/components/checkout/CheckoutSummary'

export default function Cart() {
  return (
    <div className=" bg-gray-100">
      <div className="flex w-full flex-col justify-center gap-10 px-10 py-10 md:flex-row md:px-5">
        <CartLines />
        <CheckoutSummary
          buttonLabel="Proceed to Checkout"
          redirectLink="/checkout"
        />
      </div>
    </div>
  )
}
