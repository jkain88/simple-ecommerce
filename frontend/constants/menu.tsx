import { SideBarItem } from '@/types'

export const menuOptions = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'Products',
    link: '/products',
  },
  {
    label: 'About',
    link: '#',
  },
  {
    label: 'Contact',
    link: '#',
  },
  {
    label: 'Sign In',
    link: '/signin',
  },
]

export const sidebarOptions: SideBarItem[] = [
  {
    label: 'Account',
    link: '/account/profile',
    icon: 'user',
    subMenus: [
      {
        label: 'Profile',
        link: '/account/profile',
      },
      {
        label: 'Addresses',
        link: '/account/addresses',
      },
      {
        label: 'Change Password',
        link: '/account/change-password',
      },
    ],
  },
  {
    label: 'Orders',
    link: '/orders',
    icon: 'dollar-sign',
  },
]
