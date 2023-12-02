import CheckoutLine from '@/components/checkout/CheckoutLine'
import CheckoutPaymentMethods from '@/components/checkout/CheckoutPaymentMethods'
import CheckoutSummary from '@/components/checkout/CheckoutSummary'
import { addresses } from '@/constants/testData'

export default function Checkout() {
  const address = addresses.find((address) => address.isDefault)

  return (
    <div className="flex justify-center gap-4 bg-gray-100 py-10">
      <div className="w-full max-w-3xl ">
        <div className=" bg-white">
          <div>
            <div className="flex justify-between bg-gray-50 px-4 py-2  font-bold">
              <p className="text-lg">Shipping Address</p>
              <p>Edit</p>
            </div>

            <div className="px-4 py-2">
              <div className="flex gap-4">
                <p>{address?.fullName}</p>
                <p>{address?.contactNumber}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="my-2 inline-block rounded-lg bg-black px-3 py-1 capitalize text-white">
                  {address?.deliveryLabel}
                </div>
                <p>
                  {address?.street}, {address?.barangay}, {address?.city},{' '}
                  {address?.province}
                </p>
              </div>
            </div>
          </div>
        </div>
        <CheckoutLine />
        <CheckoutPaymentMethods />
      </div>
      <CheckoutSummary buttonLabel="Place Order" redirectLink="/orders" />
    </div>
  )
}
