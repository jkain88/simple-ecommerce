import { Address, CheckoutLine, Order } from '@/types'

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

export const checkoutLines: CheckoutLine[] = [
  {
    id: 1,
    amount: 1000,
    quantity: 2,
    product_variant: {
      id: 1,
      name: '9.5',
      product: {
        name: 'Sneakers',
      },
      price: 1000,
      image: {
        url: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      },
    },
  },
  {
    id: 2,
    amount: 3000,
    quantity: 5,
    product_variant: {
      id: 2,
      name: '1KG',
      product: {
        name: 'Mixed Nuts',
      },
      price: 1000,
      image: {
        url: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      },
    },
  },
  {
    id: 3,
    amount: 70,
    quantity: 1,
    product_variant: {
      id: 2,
      name: '',
      product: {
        name: 'Safeguard',
      },
      price: 1000,
      image: {
        url: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      },
    },
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

export const orders: Order[] = [
  {
    id: 1,
    reference: 'ABCD',
    status: 'pending',
    shipping_fee: 150,
    sub_total: 4000,
    total: 4150,
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
          name: '9.5',
          product: {
            name: 'Sneakers',
          },
          price: 1000,
          image: {
            url: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
          },
        },
      },
      {
        id: 2,
        amount: 3000,
        quantity: 5,
        product_variant: {
          id: 2,
          name: '9.5',
          product: {
            name: 'Sneakers',
          },
          price: 1000,
          image: {
            url: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
          },
        },
      },
    ],
  },
  {
    id: 2,
    reference: 'ABCD',
    status: 'in transit',
    shipping_fee: 200,
    sub_total: 3000,
    total: 3200,
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
          name: '9.5',
          product: {
            name: 'Sneakers',
          },
          price: 1000,
          image: {
            url: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
          },
        },
      },
    ],
  },
  {
    id: 3,
    reference: 'ABCD',
    status: 'in transit',
    shipping_fee: 150,
    sub_total: 3000,
    total: 3150,
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
          name: '9.5',
          product: {
            name: 'Sneakers',
          },
          price: 1000,
          image: {
            url: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
          },
        },
      },
    ],
  },
  {
    id: 4,
    reference: 'ABCD',
    status: 'delivered',
    shipping_fee: 180,
    sub_total: 1000,
    total: 1080,
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
          name: '9.5',
          product: {
            name: 'Sneakers',
          },
          price: 1000,
          image: {
            url: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
          },
        },
      },
    ],
  },
  {
    id: 5,
    reference: 'ABCD',
    status: 'delivered',
    shipping_fee: 150,
    sub_total: 1500,
    total: 1650,
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
          name: '9.5',
          product: {
            name: 'Sneakers',
          },
          price: 1000,
          image: {
            url: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
          },
        },
      },
    ],
  },
]
