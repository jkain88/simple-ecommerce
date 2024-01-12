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

const RelatedProducts: React.FC<Props> = ({ products }) => {
  return (
    <div className="mt-10 grid auto-rows-auto sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <ProductCard
            name={product.name}
            slug={product.slug}
            image={product.images[0].image}
            price={product.price}
          />
        </Link>
      ))}
    </div>
  )
}

export default function ProductPage(
  {
    params,
  }: {
    params: { slug: string }
  } = { params: { slug: '' } }
) {
  const { data: product, isLoading: isProductLoading } = useQuery({
    queryKey: ['product', params.slug],
    queryFn: async () => {
      const api = new Api()
      const response = await api.products.productsDetailRead(params.slug)
      return response
    },
  })

  if (isProductLoading) return <div></div>

  console.log('PRODUCT', product)

  // const product = await getProduct(params.slug)
  // const products = await getProducts()
  return (
    <ProductPageContainer>
      <ProductDetail product={product!.data} />

      <hr />
      <div className="flex flex-col gap-4">
        <p className="font-serif text-xl font-semibold">Reviews (0)</p>
        <p>There are no reviews yet.</p>
      </div>

      <hr />
      {/* <div>
        <p className="font-serif text-3xl font-normal">Related Products</p>
        <div>
          <RelatedProducts products={products} />
        </div>
      </div> */}
    </ProductPageContainer>
  )
}
