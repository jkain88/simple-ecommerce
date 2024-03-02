import { Category } from '@/lib/Api'
import { create } from 'zustand'

interface CategoryState {
  selectedCategory: Category | undefined
  setSelectedCategory: (category: Category | undefined) => void
}

export const useCategoryStore = create<CategoryState>()((set) => ({
  selectedCategory: undefined,
  setSelectedCategory: (category: Category | undefined) =>
    set({ selectedCategory: category }),
}))
