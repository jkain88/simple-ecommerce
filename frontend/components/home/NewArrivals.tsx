'use client'

import Link from 'next/link'
import React from 'react'
import ProductCard from '../ProductCard'
import { Button } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { Api, Product } from '@/lib/Api'

const NewArrivals: React.FC = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['new-arrival-products'],
    queryFn: () => {
      const api = new Api()
      const response = api.products.productsList({ page_size: 10 })
      return response
    },
  })
  return (
    <section className="mb-8 flex flex-col items-center px-10">
      <h1 className="text-center text-3xl">New Arrivals</h1>
      <p className="mt-2 text-center text-sm">
        Grabe these new items before they&apos;re gone!
      </p>
      <div className="mt-5 grid max-w-max grid-cols-2 gap-10 px-10 md:grid-cols-4">
        {!isLoading &&
          products!.data.results.map((product: Product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <ProductCard
                key={product.id}
                price={product.price}
                image={product.images[0].image}
                name={product.name}
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
