import Image from 'next/image'
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
    <div className="" key={id}>
      <div className="relative flex h-60 items-center justify-center md:h-96">
        <div className="absolute flex h-1/2 w-1/2 ">
          <Image
            src={image}
            width="0"
            height="0"
            sizes="100vw"
            alt="product"
            className="h-full w-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 text-center">
        <p className="text-sm">{title}</p>
        <p className="text-sm font-bold">${price}</p>
      </div>
    </div>
  )
}

export default ProductCard
