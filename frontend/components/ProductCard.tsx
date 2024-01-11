'use client'

import { Card, CardBody, Image } from '@nextui-org/react'
import React from 'react'

type Props = {
  name: string
  price: string
  image: string | undefined
}

const ProductCard: React.FC<Props> = ({ name, price, image }: Props) => {
  return (
    <Card className="flex h-full w-56 flex-col" isPressable>
      <CardBody className="grow-1 relative items-center justify-center overflow-hidden px-0 ">
        <Image
          alt="product"
          isZoomed
          className="h-52 justify-center rounded-xl object-cover"
          src={image}
        />
        <div className="mt-5 text-center">
          <p className="text-sm">{name}</p>
          <p className="font-bold">${price}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProductCard
