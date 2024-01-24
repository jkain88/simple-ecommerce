'use client'

import { Card, CardBody, Image } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

type Props = {
  name: string
  price: string
  image: string | undefined
  slug: string | null | undefined
}

const ProductCard: React.FC<Props> = ({ name, price, image, slug }: Props) => {
  return (
    <Link href={`/products/${slug}`}>
      <Card className="z-0 flex h-full w-48 flex-col lg:w-56" isPressable>
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
    </Link>
  )
}

export default ProductCard
