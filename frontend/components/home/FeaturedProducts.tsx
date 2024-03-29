'use client'

import React from 'react'
import ProductCard from '../ProductCard'
import { useQuery } from '@tanstack/react-query'
import { Api, Product } from '@/lib/Api'

const FeaturedProducts: React.FC = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => {
      const api = new Api()
      const response = api.products.productsList({
        is_featured: 'true',
        page_size: 4,
      })
      return response
    },
  })

  return (
    <section className="flex flex-col items-center px-10 py-14">
      <h1 className="text-center text-3xl">Featured Products</h1>
      <p className="mt-2 text-center text-sm">Handpicked Just for You!</p>
      <div className="mt-5 grid max-w-max sm:grid-cols-2 gap-10 px-10 md:grid-cols-3 xl:grid-cols-4">
        {!isLoading &&
          products!.data.results.map((product: Product) => (
            <ProductCard
              key={product.id}
              price={product.price}
              image={product.images[0].image}
              name={product.name}
              slug={product.slug}
            />
          ))}
      </div>
    </section>
  )
}

export default FeaturedProducts
