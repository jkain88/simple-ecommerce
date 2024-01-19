'use client'

import { Checkbox } from '../ui/checkbox'
import { Trash2 } from 'lucide-react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { useUserStore } from '@/store/user'
import CartLine from './CartLine'
import { useCheckoutStore } from '@/store/checkout'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { Api } from '@/lib/Api'
import { useSession } from 'next-auth/react'

const CartLines: React.FC = () => {
  const [isAllSelected, setIsAllSelected] = useState(false)
  const { data: session } = useSession()
  const checkout = useCheckoutStore((state) => state.checkout)
  const setCheckout = useCheckoutStore((state) => state.setCheckout)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { mutate: deleteSelectedLines } = useMutation({
    mutationKey: ['deleteSelectedLines'],
    mutationFn: async (lines: number[]) => {
      const api = new Api()
      return api.checkout.checkoutLinesDeleteCreate(
        {
          checkout: checkout?.id!,
          lines,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${session?.token}`,
          },
        }
      )
    },
    onSuccess: () => {
      setCheckout({
        ...checkout,
        lines: checkout?.lines?.filter((line) => !line.isSelected),
      })
    },
  })

  useEffect(() => {
    // Set every line isSelected to false on initial render
    setCheckout({
      ...checkout,
      lines: checkout?.lines?.map((lineStore) => {
        return {
          ...lineStore,
          isSelected: false,
        }
      }),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const onDeleteCheckoutLines = (onClose: () => void) => {
    onClose()
    const selectedLinesIDs = checkout?.lines
      ?.filter((line) => line.isSelected)
      .map((line) => line.id!) as number[]
    deleteSelectedLines(selectedLinesIDs)
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Remove all selected items from cart
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to remove all of the items?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => onDeleteCheckoutLines(onClose)}
                >
                  Remove
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CartLines
