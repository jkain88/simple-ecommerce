import Image from 'next/image'
import { Product } from '../page'
import ProductCard from '@/components/ProductCard'
import Paginator from '@/components/Paginator'
import Link from 'next/link'
import ProductPageContainer from '@/components/ProductPageContainer'

const getProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products?limit=5')

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export default async function Products() {
    const products = await getProducts()
    return (
        <ProductPageContainer>
            <p className="text-slate-500">Home / Shop</p>
            <div className="flex justify-between">
                <p>Showing 1-9 of 25 results</p>
                <p>Default sorting</p>
            </div>
            <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
                {products.map((product: Product) => (
                    <Link href={`/products/${product.id}`}>
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
        </ProductPageContainer>
    )
}
