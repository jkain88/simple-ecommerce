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
            <div className="h-96 w-96 bg-gray-500">
                <Image src={image} width={100} height={100} alt="product" />
            </div>
            <p>{title}</p>
            <p>{category}</p>
            <p>${price}</p>
        </div>
    )
}

export default ProductCard
