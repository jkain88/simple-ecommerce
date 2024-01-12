import FeaturedProducts from '@/components/home/FeaturedProducts'
import NewArrivals from '@/components/home/NewArrivals'

const getUserTestimonials = async () => {
  const response = await fetch('https://dummyjson.com/users?limit=3')

  if (!response.ok) {
    throw new Error('Failed to fetch user testimonials')
  }

  return response.json()
}

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
  const { users: userTestimonials } = await getUserTestimonials()

  return (
    <div className="bg-gray-100">
      <FeaturedProducts />
      <NewArrivals />
    </div>
  )
}
