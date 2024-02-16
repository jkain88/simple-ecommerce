import FeaturedProducts from '@/components/home/FeaturedProducts'
import NewArrivals from '@/components/home/NewArrivals'

export interface Product {
  id: number
  price: number
  category: string
  description: string
  image: string
  title: string
}

interface User {
  id: number
  image: string
  firstName: string
  lastName: string
}

export default async function Home() {
  return (
    <div className="bg-gray-100">
      <FeaturedProducts />
      <NewArrivals />
    </div>
  )
}
