import { User } from '@/lib/Api'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserState {
  user: User
  setUser: (user: User) => void
  resetUser: () => void
}

const initialUserState = {
  email: '',
  firstName: '',
  lastName: '',
  id: 0,
  checkout: undefined,
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: initialUserState,
      setUser: (user) => set({ user }),
      resetUser: () => set({ user: initialUserState }),
    }),
    {
      name: 'userStorage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
