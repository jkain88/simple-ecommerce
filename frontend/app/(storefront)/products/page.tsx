import Image from 'next/image'
import { Product } from '../page'
import ProductCard from '@/components/ProductCard'
import Paginator from '@/components/Paginator'
import Link from 'next/link'
import ProductPageContainer from '@/components/ProductPageContainer'
import SortDropdown from '@/components/SortDropdown'

export default async function Products() {
  return (
    <div className="">
      {/* <section className="lg:px- mt-8 px-10 md:mt-5 lg:px-64">
        <div className="flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between md:gap-0">
          <p className="text-xs">Showing: 1 - 40 of 1000</p>
          <SortDropdown />
        </div>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
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
      </section> */}
    </div>
  )
}
