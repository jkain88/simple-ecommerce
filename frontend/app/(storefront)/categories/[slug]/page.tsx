'use client'

import ProductCard from '@/components/ProductCard'
import SortDropdown from '@/components/SortDropdown'
import { Button } from '@/components/ui/button'
import { Api, Product } from '@/lib/Api'
import { extractPageFromUrl } from '@/lib/utils'
import { useInfiniteQuery } from '@tanstack/react-query'

const getProducts =
  (slug: string) =>
  async ({ pageParam = 1 }: { pageParam: number }) => {
    const api = new Api()
    const response = await api.products.productsList({
      category__slug: slug,
      page_size: 10,
      page: pageParam,
    })
    return response.data
  }

export default function CategoriesPage({
  params,
}: {
  params: { slug: string }
}) {
  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['category-products'],
    queryFn: getProducts(params.slug),
    getNextPageParam: (lastPage) => {
      const nextPage = extractPageFromUrl(lastPage.next)
      return nextPage
    },
    initialPageParam: 1,
  })

  return (
    <section className="flex flex-col items-center bg-gray-100 px-10 py-14">
      <div className="flex w-full flex-col items-center gap-4 px-10 md:flex-row md:justify-between md:gap-0">
        <p className="text-xs">Showing: 1 - 40 of 1000</p>
        <SortDropdown />
      </div>
      <div className="mt-10 grid grid-cols-2 gap-10 md:grid-cols-4">
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
