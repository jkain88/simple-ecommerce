import { addressSchema } from '@/lib/form-validations/account'
import { z } from 'zod'

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
