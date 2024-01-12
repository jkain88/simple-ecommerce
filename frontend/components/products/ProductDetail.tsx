'use client'

import { Product } from '@/lib/Api'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

type Props = {
  product: Product
}

const ProductDetail: React.FC<Props> = ({ product }: Props) => {
  return (
    <div className="grid auto-rows-auto lg:grid-cols-2">
      <div className="flex h-full w-full justify-center">
        <Image
          src={
            product.images[0].image !== undefined
              ? product.images[0].image
              : '/placeholder.jpg'
          }
          alt="Product Image"
          width={300}
          height={300}
        />
      </div>
      <div className="mt-8 flex flex-col gap-5 lg:justify-center">
        <div>
          <p className="font-serif text-3xl">{product.name}</p>
          <p>{product.category?.name}</p>
        </div>
        <p className="text-2xl font-bold text-neutral-600">${product.price}</p>
        {/* <p className="tracking-wide">{product.description}</p> */}
        <div className="mt-4 flex gap-4">
          <input
            type="number"
            className="w-12 border-[1px] border-solid border-neutral-200 py-1 pl-3"
            min="1"
            value={1}
            onChange={() => console.log('Changed')}
          />
          <Button className="bg-black px-10 text-white">Add To Cart</Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
