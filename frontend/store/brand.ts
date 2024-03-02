import { Brand } from '@/lib/Api'
import { create } from 'zustand'

interface BrandState {
  selectedBrand: Brand | undefined
  setSelectedBrand: (brand: Brand | undefined) => void
}

export const useBrandStore = create<BrandState>()((set) => ({
  selectedBrand: undefined,
  setSelectedBrand: (brand: Brand | undefined) => set({ selectedBrand: brand }),
}))
