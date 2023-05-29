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
            <div className="relative flex h-60 items-center justify-center bg-gray-100 md:h-96">
                <div className="absolute flex h-3/4 w-3/4 ">
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
            <div className="flex flex-col gap-2">
                <p className="text-base">{title}</p>
                <p className="text-sm text-gray-400">{category}</p>
                <p className="font-bold">${price}</p>
            </div>
        </div>
    )
}

export default ProductCard
