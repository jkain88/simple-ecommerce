import { Address } from '@/lib/Api'
import { create } from 'zustand'

interface AddressState {
  addresses: Address[]
  setAddresses: (addresses: Address[]) => void
  addAddress: (address: Address) => void
}

export const useAddressStore = create<AddressState>()((set) => ({
  addresses: [],
  addAddress: (address: Address) =>
    set((state) => ({ addresses: [...state.addresses, address] })),
  setAddresses: (addresses: Address[]) => set({ addresses }),
}))
