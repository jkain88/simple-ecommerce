import { Address } from '@/types'

export const categories = [
  {
    id: 1,
    name: "What's new",
    slug: 'whats-new',
  },
  {
    id: 2,
    name: 'Best sellers',
    slug: 'best-sellers',
  },
  {
    id: 3,
    name: 'Suits',
    slug: 'suits',
  },
  {
    id: 4,
    name: 'Dresses',
    slug: 'dresses',
  },
  {
    id: 5,
    name: 'Swimsuit',
    slug: 'swimsuit',
  },
  {
    id: 6,
    name: 'Accessories',
    slug: 'accessories',
  },
]

export const addresses: Address[] = [
  {
    id: 1,
    fullName: 'Martin Josh Torricer',
    contactNumber: '+63999999999',
    street:'1234 Street',
    barangay: 'Barangay',
    city: 'City',
    province: 'Province',
    isDefault: true,
    deliveryLabel: 'Home',
  },
  {
    id: 2,
    fullName: 'Martin Josh Torricer',
    contactNumber: '+63999999999',
    street:'1234 Street',
    barangay: 'Barangay',
    city: 'City',
    province: 'Province',
    isDefault: false,
    deliveryLabel: 'Office',
  },
]
