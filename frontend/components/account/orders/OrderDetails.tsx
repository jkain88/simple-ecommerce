'use client'

import { Order } from '@/types'
import { Image } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

type Props = {
  order: Order
}

const OrderDetails: React.FC<Props> = ({ order }) => {
  return (
    <div key={order.id}>
      <div className="mt-4 divide-y-1 bg-white p-4">
        <div>
          <p className="pb-2 text-2xl font-bold">Products</p>
        </div>
        <div className=" pt-2">
          <div className="divide-y-1">
            {order.lines.map((line) => (
              <div key={line.id} className="flex gap-5 px-6 py-4">
                <Image
                  alt="product"
                  isZoomed
                  className="h-20 justify-center rounded-xl object-cover"
                  src={line.product_variant.image.url}
                />
                <div className="flex w-full justify-between">
                  <div>
                    <p className="text-xl">{line.product_variant.name}</p>
                    <p>Qty: {line.quantity}</p>
                  </div>
                  <div>
                    <p>₱{line.product_variant.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 bg-white px-4 py-6">
        <div className="flex justify-between pb-3">
          <div className="text-xl font-semibold">
            Reference: {order.reference}
          </div>
          <div className="rounded-lg bg-black px-3 py-1 capitalize text-white">
            {order.status}
          </div>
        </div>
        <p>Placed on: August, 21, 2023</p>
        <p>Paid by Credit/Debit Card</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-10">
        <div className="divide-y-2 bg-white p-4">
          <div className="pb-2">
            <p className="text-xl font-bold">Shipping Address</p>
          </div>
          <div>
            <div className="my-2 inline-block rounded-lg bg-black px-3 py-1 capitalize text-white">
              {order.shipping_address.deliveryLabel}
            </div>
            <p>{order.shipping_address.fullName}</p>
            <p>
              {order.shipping_address.street}, {order.shipping_address.barangay}
              , {order.shipping_address.city}, {order.shipping_address.province}
            </p>
            <p>{order.shipping_address.contactNumber}</p>
          </div>
        </div>

        <div className="divide-y-2 bg-white p-4">
          <p className="pb-2 text-xl font-bold">Order Summary</p>
          <div className="py-4 ">
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p>₱{order.sub_total}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping Fee:</p>
              <p>₱{order.shipping_fee}</p>
            </div>
          </div>
          <div className="flex justify-between pt-4">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg font-semibold">₱{order.total}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
