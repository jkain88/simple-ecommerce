import ProductPageContainer from '@/components/ProductPageContainer'
import React from 'react'
import { Product } from '@/app/page'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import ProductDetail from '@/components/products/ProductDetail'

const getProduct = async (id: number) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

const getProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products?limit=4')

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
    <div className="mt-10 grid auto-rows-auto sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <ProductCard
            id={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            image={product.image}
          />
        </Link>
      ))}
    </div>
  )
}

export default async function ProductPage(
  {
    params,
  }: {
    params: { id: number }
  } = { params: { id: 0 } }
) {
  const product = await getProduct(params.id)
  const products = await getProducts()
  return (
    <ProductPageContainer>
      <ProductDetail product={product} />

      <hr />
      <div className="flex flex-col gap-4">
        <p className="font-serif text-xl font-semibold">Reviews (0)</p>
        <p>There are no reviews yet.</p>
      </div>

      <hr />
      <div>
        <p className="font-serif text-3xl font-normal">Related Products</p>
        <div>
          <RelatedProducts products={products} />
        </div>
      </div>
    </ProductPageContainer>
  )
}
