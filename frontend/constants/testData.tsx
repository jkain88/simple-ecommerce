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
    street: '1234 Street',
    barangay: 'Barangay',
    city: 'City',
    province: 'Province',
    isDefault: true,
    deliveryLabel: 'Home',
  },
  {
    id: 2,
    fullName: 'Josh Martin Torricer',
    contactNumber: '+639888888888',
    street: '1234 Street',
    barangay: 'Barangay',
    city: 'City',
    province: 'Province',
    isDefault: false,
    deliveryLabel: 'Office',
  },
]

export const orders = [
  {
    id: 1,
    reference: 'ABCD',
    status: 'pending',
    shipping_address: {
      id: 1,
      fullName: 'Martin Josh Torricer',
      contactNumber: '+63999999999',
      street: '1234 Street',
      barangay: 'Barangay',
      city: 'City',
      province: 'Province',
      isDefault: true,
      deliveryLabel: 'Home',
    },
    lines: [
      {
        id: 1,
        amount: 1000,
        quantity: 2,
        product_variant: {
          id: 1,
          name: 'Product 1',
          price: 1000,
          image: {
            url: 'https://via.placeholder.com/150',
          },
        },
      },
      {
        amount: 3000,
        quantity: 5,
        product_variant: {
          id: 2,
          name: 'Product 1',
          price: 1000,
          image: {
            url: 'https://via.placeholder.com/150',
          },
        },
      },
    ],
  },
  {
    id: 2,
    reference: 'ABCD',
    status: 'in transit',
    shipping_address: {
      id: 1,
      fullName: 'Martin Josh Torricer',
      contactNumber: '+63999999999',
      street: '1234 Street',
      barangay: 'Barangay',
      city: 'City',
      province: 'Province',
      isDefault: true,
      deliveryLabel: 'Home',
    },
    lines: [
      {
        id: 2,
        amount: 3000,
        quantity: 5,
        product_variant: {
          id: 2,
          name: 'Product 1',
          price: 1000,
          image: {
            url: 'https://via.placeholder.com/150',
          },
        },
      },
    ],
  },
  {
    id: 3,
    reference: 'ABCD',
    status: 'in transit',
    shipping_address: {
      id: 1,
      fullName: 'Martin Josh Torricer',
      contactNumber: '+63999999999',
      street: '1234 Street',
      barangay: 'Barangay',
      city: 'City',
      province: 'Province',
      isDefault: true,
      deliveryLabel: 'Home',
    },
    lines: [
      {
        id: 3,
        amount: 3000,
        quantity: 5,
        product_variant: {
          id: 2,
          name: 'Product 1',
          price: 1000,
          image: {
            url: 'https://via.placeholder.com/150',
          },
        },
      },
    ],
  },
  {
    id: 4,
    reference: 'ABCD',
    status: 'delivered',
    shipping_address: {
      id: 1,
      fullName: 'Martin Josh Torricer',
      contactNumber: '+63999999999',
      street: '1234 Street',
      barangay: 'Barangay',
      city: 'City',
      province: 'Province',
      isDefault: true,
      deliveryLabel: 'Home',
    },
    lines: [
      {
        id: 4,
        amount: 3000,
        quantity: 5,
        product_variant: {
          id: 2,
          name: 'Product 1',
          price: 1000,
          image: {
            url: 'https://via.placeholder.com/150',
          },
        },
      },
    ],
  },
  {
    id: 5,
    reference: 'ABCD',
    status: 'delivered',
    shipping_address: {
      id: 1,
      fullName: 'Martin Josh Torricer',
      contactNumber: '+63999999999',
      street: '1234 Street',
      barangay: 'Barangay',
      city: 'City',
      province: 'Province',
      isDefault: true,
      deliveryLabel: 'Home',
    },
    lines: [
      {
        id: 5,
        amount: 1500,
        quantity: 2,
        product_variant: {
          id: 2,
          name: 'Product 1',
          price: 1000,
          image: {
            url: 'https://via.placeholder.com/150',
          },
        },
      },
    ],
  },
]
