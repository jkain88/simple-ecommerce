'use client'

import { Checkout, useCheckoutStore } from '@/store/checkout'
import Image from 'next/image'
import React from 'react'

type Props = {
  checkout: Checkout | null
}
const CheckoutLine: React.FC<Props> = ({ checkout }) => {
  return (
    <div className="mt-4 rounded-lg bg-white">
      <div className="rounded-lg bg-gray-50 px-4 py-2">
        <p className="text-lg font-bold">Items</p>
      </div>
      <div className="px-4 py-2">
        {checkout?.lines?.map((line) => (
          <div
            key={line.id}
            className="mt-5 grid grid-cols-4 items-center justify-between gap-4 bg-white p-4"
          >
            <div className="col-span-2 flex items-center gap-4">
              <Image
                src={line.product_variant_detail?.product?.thumbnail!}
                alt="Checkout Line"
                width={45}
                height={10}
              />
              <div className="flex flex-col">
                <p>{line.product_variant_detail?.product?.name}</p>
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold">
                ₱{line.product_variant_detail?.price}
              </p>
              <p>Qty: {line.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CheckoutLine
