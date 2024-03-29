'use client'

import ProductPageContainer from '@/components/ProductPageContainer'
import React from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import ProductDetail from '@/components/products/ProductDetail'
import { useQuery } from '@tanstack/react-query'
import { Api, Product } from '@/lib/Api'

interface Props {
  products: Product[]
}

type ProductPageProps = {
  params: {
    slug: string
  }
}

const RelatedProducts: React.FC<Props> = ({ products }) => {
  return (
    <div className="mt-10 grid auto-rows-auto justify-center gap-y-4 md:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          slug={product.slug}
          image={product.images[0].image}
          price={product.price}
        />
      ))}
    </div>
  )
}

export default function ProductPage({ params }: ProductPageProps) {
  const { data: product, isLoading: isProductLoading } = useQuery({
    queryKey: ['product', params.slug],
    queryFn: async () => {
      const api = new Api()
      const response = await api.products.productsDetailRead(params.slug)
      return response
    },
  })

  const { data: relatedProducts, isLoading: isRelatedProductsLoading } =
    useQuery({
      queryKey: ['relatedProducts', params.slug],
      queryFn: async () => {
        const api = new Api()
        const response = await api.products.productsList({
          category: product!.data.category!.slug as string,
          page_size: 4,
        })
        return response
      },
      enabled: product?.data.category?.slug !== undefined,
    })

  if (isProductLoading) return <div></div>

  return (
    <ProductPageContainer>
      <ProductDetail product={product!.data} />

      <hr />
      <div className="flex flex-col gap-4">
        <p className="font-serif text-xl font-semibold">Reviews (0)</p>
        <p>There are no reviews yet.</p>
      </div>

      <hr />
      {!isRelatedProductsLoading && (
        <div>
          <p className="font-serif text-3xl font-normal">Related Products</p>
          <RelatedProducts products={relatedProducts!.data.results} />
        </div>
      )}
    </ProductPageContainer>
  )
}
