'use client'

import { Product } from '@/app/page'
import Link from 'next/link'
import React from 'react'
import ProductCard from '../ProductCard'
import { Button } from '@nextui-org/react'

type Props = {
  products: Product[]
}

const NewArrivals: React.FC<Props> = ({ products }: Props) => {
  return (
    <section className="mb-8 flex flex-col items-center px-10">
      <h1 className="text-center text-3xl">New Arrivals</h1>
      <p className="mt-2 text-center text-sm">
        Grabe these new items before they're gone!
      </p>
      <div className="mt-5 grid max-w-max grid-cols-2 gap-10 px-10 md:grid-cols-4">
        {products.map((product: Product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <ProductCard
              id={product.id}
              key={product.id}
              price={product.price}
              category={product.category}
              image={product.image}
              title={product.title}
            />
          </Link>
        ))}
      </div>
      <Button className="mb-20 mt-10 bg-black px-8 text-white">
        View More
      </Button>
    </section>
  )
}

export default NewArrivals
