'use client'

import Link from 'next/link'
import React from 'react'
import ProductCard from '../ProductCard'
import { Button } from '@nextui-org/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Api, Product } from '@/lib/Api'
import { extractPageFromUrl } from '@/lib/utils'

const getProducts = async ({ pageParam = 1 }) => {
  const api = new Api()
  const response = await api.products.productsList({
    page_size: 10,
    page: pageParam,
  })
  return response.data
}

const NewArrivals: React.FC = () => {
  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['new-arrival-products'],
    queryFn: getProducts,
    getNextPageParam: (lastPage) => {
      const nextPage = extractPageFromUrl(lastPage.next)
      return nextPage
    },
    initialPageParam: 1,
  })

  return (
    <section className="mb-8 flex flex-col items-center px-10 pb-20">
      <h1 className="text-center text-3xl">New Arrivals</h1>
      <p className="mt-2 text-center text-sm">
        Grabe these new items before they&apos;re gone!
      </p>
      <div className="mt-5 grid max-w-max grid-cols-1 gap-10 px-10 md:grid-cols-2 xl:grid-cols-4">
        {!isLoading &&
          products!.pages.map((page, i) =>
            page.results.map((product: Product) => (
              <ProductCard
                key={product.id}
                price={product.price}
                image={product.images[0].image}
                name={product.name}
                slug={product.slug}
              />
            ))
          )}
      </div>
      {hasNextPage && (
        <Button
          className="mt-10 bg-black px-8 text-white"
          onClick={() => fetchNextPage()}
        >
          View More
        </Button>
      )}
    </section>
  )
}

export default NewArrivals
