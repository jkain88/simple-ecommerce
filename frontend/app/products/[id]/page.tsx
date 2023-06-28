import ProductPageContainer from '@/components/ProductPageContainer'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { Product } from '@/app/page'
import Link from 'next/link'

const getProduct = async (id: number) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

const getProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products?limit=2')

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

interface Props {
    products: Product[]
}

const RelatedProducts: React.FC<Props> = ({ products }) => {
    return (
        <div className="mt-10 flex gap-8">
            {products.map((product) => (
                <Link href={`/products/${product.id}`}>
                    <div className="flex flex-col items-center gap-4">
                        <div className="">
                            <Image
                                src={product.image}
                                width="0"
                                height="0"
                                sizes="100vw"
                                alt="product"
                                className="h-40 w-40"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="w-60 truncate font-serif text-base">
                                {product.title}
                            </div>
                            <div className="font-serif text-neutral-600">
                                {product.category}
                            </div>
                            <div className="text-sm font-semibold">
                                ${product.price}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default async function ProductPage({
    params,
}: {
    params: { id: number }
}) {
    const product = await getProduct(params.id)
    const products = await getProducts()
    console.log(product)
    return (
        <ProductPageContainer>
            <div>
                <div className="grid grid-cols-2">
                    <div className="flex h-full w-full justify-center">
                        <Image
                            src={product.image}
                            alt="Product Image"
                            width={300}
                            height={300}
                        />
                    </div>
                    <div className="flex flex-col gap-5">
                        <div>
                            <p className="font-serif text-3xl">
                                {product.title}
                            </p>
                            <p>{product.category}</p>
                        </div>
                        <p className="text-2xl font-bold text-neutral-600">
                            ${product.price}
                        </p>
                        <p className="tracking-wide">{product.description}</p>
                        <div className="mt-10 flex gap-4">
                            <input
                                type="number"
                                className="w-12 border-[1px] border-solid border-neutral-200 py-1 pl-3"
                                min="1"
                                value={1}
                            />
                            <Button className="rounded-none bg-primary px-16">
                                Add To Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <div className="flex flex-col gap-4">
                <p className="font-serif text-xl font-semibold">Reviews (0)</p>
                <p>There are no reviews yet.</p>
            </div>

            <hr />
            <div>
                <p className="font-serif text-3xl font-normal">
                    Related Products
                </p>
                <div>
                    <RelatedProducts products={products} />
                </div>
            </div>
        </ProductPageContainer>
    )
}
