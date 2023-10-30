'use client'

import { Card, CardBody, Image } from '@nextui-org/react'
import NextImage from 'next/image'
import React from 'react'

type Props = {
  id: number
  title: string
  price: number
  category: string
  image: string
}

const ProductCard: React.FC<Props> = ({
  id,
  title,
  price,
  category,
  image,
}: Props) => {
  return (
    <Card className="flex h-full w-60 flex-col" isPressable>
      <CardBody className="grow-1 relative items-center justify-center overflow-hidden py-8">
        <Image
          alt="product"
          isZoomed
          className="h-52 justify-center rounded-xl object-cover"
          src={image}
        />
        <div className="mt-5 text-center">
          <p className="text-sm">{title}</p>
          <p className="font-bold">${price}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProductCard
