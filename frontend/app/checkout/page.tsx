'use client'

import CheckoutLine from '@/components/checkout/CheckoutLine'
import CheckoutPaymentMethods from '@/components/checkout/CheckoutPaymentMethods'
import CheckoutSummary from '@/components/checkout/CheckoutSummary'
import AddressDetailForm from '@/components/forms/AddressDetailForm'
import { Checkout, useCheckoutStore } from '@/store/checkout'
import { useEffect, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useUserStore } from '@/store/user'

export default function Checkout() {
  const user = useUserStore((state) => state.user)
  const checkoutStore = useCheckoutStore((state) => state.checkout)
  const [checkout, setCheckout] = useState<Checkout | null>(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [parent] = useAutoAnimate({
    duration: 150,
    easing: 'linear',
  })

  useEffect(() => {
    if (Object.keys(checkoutStore!).length !== 0) {
      setCheckout((prev) => checkoutStore)
    }

    if (checkoutStore?.shipping_address_detail === null) {
      setIsFormVisible(true)
    } else {
      setIsFormVisible(false)
    }
  }, [checkoutStore])

  return (
    <div className="flex flex-col justify-center gap-4 bg-gray-100 px-5 py-10 md:flex-row">
      <div className="w-full max-w-3xl ">
        <div className=" rounded-lg bg-white">
          <div>
            <div className="flex justify-between rounded-lg bg-gray-50 px-4  py-2 font-bold">
              <p className="text-lg">Shipping Address</p>
              {checkout?.shipping_address_detail !== null && (
                <p onClick={() => setIsFormVisible((prev) => !prev)}>Edit</p>
              )}
            </div>
            {checkout?.shipping_address_detail !== undefined && (
              <>
                <div className="px-4 py-2">
                  {isFormVisible ? (
                    <div className="px-4 pb-4" ref={parent}>
                      <AddressDetailForm
                        address={checkout?.shipping_address_detail}
                        type="updateCheckoutShipping"
                      />
                    </div>
                  ) : (
                    <div ref={parent}>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {checkout?.shipping_address_detail?.contact_number}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="my-2 inline-block rounded-lg bg-black px-3 py-1 capitalize text-white">
                          {checkout?.shipping_address_detail?.delivery_label}
                        </div>
                        <p>
                          {checkout?.shipping_address_detail?.street},{' '}
                          {checkout?.shipping_address_detail?.city_area},{' '}
                          {checkout?.shipping_address_detail?.city},{' '}
                          {checkout?.shipping_address_detail?.province}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <CheckoutLine checkout={checkout} />
        <CheckoutPaymentMethods />
      </div>
      <CheckoutSummary
        buttonLabel="Place Order"
        redirectLink="/orders"
        checkout={checkout}
      />
    </div>
  )
}
