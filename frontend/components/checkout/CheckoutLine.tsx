'use client'

import { checkoutLines } from '@/constants/testData'
import Image from 'next/image'
import React from 'react'

const CheckoutLine: React.FC = () => {
  return (
    <div className="mt-4 bg-white ">
      <div className="bg-gray-50 px-4 py-2">
        <p className="text-lg font-bold">Items</p>
      </div>
      <div className="px-4 py-2">
        {checkoutLines.map((line) => (
          <div
            key={line.id}
            className="mt-5 flex items-center justify-between gap-4 bg-white p-4"
          >
            <div className="flex items-center gap-4">
              <Image
                src={line.product_variant.image.url}
                alt="Checkout Line"
                width={45}
                height={10}
              />
              <div className="flex flex-col">
                <p>{line.product_variant.product.name}</p>
                {line.product_variant.name && (
                  <p className="text-xs text-gray-400">
                    Variant: {line.product_variant.name}
                  </p>
                )}
              </div>
            </div>
            <p className="text-lg font-semibold">
              ₱{line.product_variant.price}
            </p>
            <p>Qty: {line.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CheckoutLine
