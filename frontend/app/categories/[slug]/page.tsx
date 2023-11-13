import { Product } from '@/app/page'
import Paginator from '@/components/Paginator'
import ProductCard from '@/components/ProductCard'
import SortDropdown from '@/components/SortDropdown'
import Link from 'next/link'

const getProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products?limit=20')

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

export default async function CategoriesPage({
  params,
}: {
  params: { slug: string }
}) {
  const products = await getProducts()
  console.log(params)
  return (
    <section className="flex flex-col items-center bg-gray-100 px-10 py-14">
      <div className="flex w-full flex-col items-center gap-4 px-10 md:flex-row md:justify-between md:gap-0">
        <p className="text-xs">Showing: 1 - 40 of 1000</p>
        <SortDropdown />
      </div>
      <div className="mt-10 grid grid-cols-2 gap-10 md:grid-cols-4">
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
      <Paginator />
    </section>
  )
}
