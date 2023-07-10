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
