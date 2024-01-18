import { User } from '@/lib/Api'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserState {
  user: User 
  setUser: (user: User ) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        email: '',
        firstName: '',
        lastName: '',
        id: 0,
        checkout: undefined,

      },
      setUser: (user) => set({ user }),
    }),
    {
      name: 'userStorage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
