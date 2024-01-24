'use client'

import CheckoutLine from '@/components/checkout/CheckoutLine'
import CheckoutPaymentMethods from '@/components/checkout/CheckoutPaymentMethods'
import CheckoutSummary from '@/components/checkout/CheckoutSummary'
import AddressDetailForm from '@/components/forms/AddressDetailForm'
import { useCheckoutStore } from '@/store/checkout'
import autoAnimate from '@formkit/auto-animate'
import { useAnimate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function Checkout() {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const checkout = useCheckoutStore((state) => state.checkout)
  const [parent] = useAutoAnimate({
    duration: 150,
    easing: 'linear',
  })

  console.log('ADDRESS', checkout?.shipping_address_detail)
  return (
    <div className="flex justify-center gap-4 bg-gray-100 py-10">
      <div className="w-full max-w-3xl ">
        <div className=" bg-white">
          <div>
            <div className="flex justify-between bg-gray-50 px-4 py-2  font-bold">
              <p className="text-lg">Shipping Address</p>
              <p onClick={() => setIsFormVisible((prev) => !prev)}>Edit</p>
            </div>
            {checkout?.shipping_address_detail !== undefined && (
              <>
                <div className="px-4 py-2">
                  {isFormVisible ? (
                    <div className="px-4 pb-4" ref={parent}>
                      <AddressDetailForm
                        address={checkout?.shipping_address_detail}
                        type="update"
                      />
                    </div>
                  ) : (
                    <div ref={parent}>
                      <div className="flex gap-4">
                        {/* <p>{address?.}</p> */}
                        <p>
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
        <CheckoutLine />
        <CheckoutPaymentMethods />
      </div>
      <CheckoutSummary buttonLabel="Place Order" redirectLink="/orders" />
    </div>
  )
}
