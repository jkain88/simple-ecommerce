'use client'

import { Checkbox } from '../ui/checkbox'
import { Trash2 } from 'lucide-react'
import { useDisclosure } from '@nextui-org/react'
import { useUserStore } from '@/store/user'
import CartLine from './CartLine'
import { useCheckoutStore } from '@/store/checkout'
import { useEffect, useState } from 'react'

const CartLines: React.FC = () => {
  const user = useUserStore((state) => state.user)
  const [isAllSelected, setIsAllSelected] = useState(false)
  const checkout = useCheckoutStore((state) => state.checkout)
  const setCheckout = useCheckoutStore((state) => state.setCheckout)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    const allSelected = checkout?.lines?.every((line) => line.isSelected)
    if (!allSelected) {
      setIsAllSelected(false)
    }
  }, [checkout])

  if (checkout?.lines?.length === 0) return <div></div>

  const onSelectAll = () => {
    setIsAllSelected((prev) => {
      const newIsAllSelected = !prev
      setCheckout({
        ...checkout,
        lines: checkout?.lines?.map((lineStore) => {
          return {
            ...lineStore,
            isSelected: newIsAllSelected,
          }
        }),
      })
      return newIsAllSelected
    })
  }

  return (
    <div className="w-full max-w-3xl grow">
      <div className="flex justify-between rounded-lg bg-white px-6 py-4">
        <div className=" flex items-center justify-center gap-2">
          <Checkbox
            id="select-all"
            onClick={onSelectAll}
            checked={isAllSelected}
          />
          <label htmlFor="select-all" className="text-base font-semibold">
            {' '}
            Select All
          </label>
        </div>
        <div>
          <button className="flex items-center gap-1" onClick={onOpenChange}>
            <Trash2 />
            <p className="text-sm">Delete</p>
          </button>
        </div>
      </div>
      {checkout?.lines?.map((line) => (
        <CartLine line={line} key={line.id} />
      ))}
    </div>
  )
}

export default CartLines
