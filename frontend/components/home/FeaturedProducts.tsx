import Link from 'next/link'
import React from 'react'
import ProductCard from '../ProductCard'
import { Product } from '@/app/page'

type Props = {
  products: Product[]
}

const FeaturedProducts: React.FC<Props> = ({ products }: Props) => {
  return (
    <section className="flex flex-col items-center px-10 py-14">
      <h1 className="text-center text-3xl">Featured Products</h1>
      <p className="mt-2 text-center text-sm">Handpicked Just for You!</p>
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
    </section>
  )
}

export default FeaturedProducts
