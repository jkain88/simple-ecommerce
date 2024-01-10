import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import SortDropdown from '@/components/SortDropdown'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import NewArrivals from '@/components/home/NewArrivals'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { menuOptions } from '@/constants/menu'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

const getProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products?limit=4')

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

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
  const products = await getProducts()
  const { users: userTestimonials } = await getUserTestimonials()
  const product = products[0]

  return (
    <div className="bg-gray-100">
      <FeaturedProducts />
      <NewArrivals />
    </div>
  )
}
