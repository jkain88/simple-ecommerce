import ProductPageContainer from '@/components/ProductPageContainer'
import Image from 'next/image'
import React from 'react'

const getProduct = async (id: number) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export default async function Product({ params }: { params: { id: number } }) {
    const product = await getProduct(params.id)
    console.log(product)
    return (
        <ProductPageContainer>
            <div className="grid grid-cols-2">
                <div className="w-full bg-gray-500">
                    <Image
                        src={product.image}
                        alt="Product Image"
                        width={300}
                        height={300}
                    />
                </div>
                <p>Product details</p>
            </div>
        </ProductPageContainer>
    )
}
