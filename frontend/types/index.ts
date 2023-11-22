interface SideBarSubMenu {
  label: string
  link: string
}

export interface SideBarItem {
  label: string
  link: string
  icon: 'user' | 'dollar-sign'
  subMenus?: SideBarSubMenu[]
}

export interface Address {
  id: number
  fullName: string
  street: string
  contactNumber: string
  barangay: string
  city: string
  province: string
  deliveryLabel: string
  isDefault: boolean
}

export interface ProductVariant {
  id: number
  name: string
  price: number
  image: {
    url: string
  }
  product: {
    name: string
  }
}
export interface CheckoutLine {
  id: number
  amount: number
  quantity: number
  product_variant: ProductVariant
}
export interface OrderLine {
  id: number
  amount: number
  quantity: number
  product_variant: ProductVariant
}

export interface Order {
  id: number
  reference: string
  status: string
  shipping_fee: number
  sub_total: number
  total: number
  shipping_address: Address
  lines: OrderLine[]
}
