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
            <div className="relative h-60 bg-gray-100 md:h-96">
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src={image}
                        style={{ objectFit: 'cover' }}
                        width={200}
                        height={200}
                        alt="product"
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
