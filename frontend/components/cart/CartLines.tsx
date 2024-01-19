'use client'

import { Checkbox } from '../ui/checkbox'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { checkoutLines } from '@/constants/testData'
import Image from 'next/image'
import { useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  useUser,
} from '@nextui-org/react'
import { Button } from '../ui/button'
import { useUserStore } from '@/store/user'
import { useMutation } from '@tanstack/react-query'
import { Api } from '@/lib/Api'
import { useSession } from 'next-auth/react'
import { useCheckoutStore } from '@/store/checkout'

const CartLines: React.FC = () => {
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const checkout = useCheckoutStore((state) => state.checkout)
  const { data: session } = useSession()
  const [quantities, setQuantities] = useState(
    Object.fromEntries(
      user!.checkout!.lines!.map((line) => [line.id, line.quantity])
    )
  )
  const [selectLineToDelete, setSelectedLineToDelete] = useState<number | null>(
    null
  )
  const { data: deleteCheckoutLine } = useMutation({
    mutationKey: ['deleteCheckoutLine'],
    mutationFn: async (id: number) => {
      const api = new Api()
      return api.checkout.checkoutLineDelete(id, {
        headers: {
          Authorization: `Token ${session?.token}`,
        },
      })
    },
    onSuccess: () => {
      console.log('yes')
    },
  })
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  console.log('QUANTITES', quantities, user.checkout?.lines)
  const handleMinus = (id: number) => {
    setQuantities((prev: any) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }))
  }

  const handlePlus = (id: number) => {
    setQuantities((prev: any) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))
  }

  const onDeleteCheckoutLine = (onClose: () => void) => {
    onClose()
  }

  if (user?.checkout?.lines?.length === 0) return <div></div>

  return (
    <div className="w-full max-w-3xl grow">
      <div className="flex justify-between rounded-lg bg-white px-6 py-4">
        <div className=" flex items-center justify-center gap-2">
          <Checkbox id="select-all" />
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
      {user!.checkout!.lines!.map((line) => (
        <div
          key={line.id}
          className="mt-5 flex items-center justify-between gap-4 rounded-lg bg-white p-4"
        >
          <div className="flex items-center gap-4">
            <Checkbox id={`line-${line.id}`} />
            <Image
              src={line!.product_variant_detail!.product!.thumbnail!}
              alt="Checkout Line"
              width={65}
              height={10}
            />
            <div className="flex flex-col">
              <p>{line.product_variant_detail!.name}</p>
              {/* {line.product_variant.name && (
                <p className="text-xs text-gray-400">
                  Variant: {line.product_variant.name}
                </p>
              )} */}
            </div>
          </div>
          <div className="flex items-center gap-36">
            <div className="flex flex-col items-center gap-2">
              <p className="text-lg font-semibold">₱{line.amount}</p>
              <button
                onClick={() => {
                  setSelectedLineToDelete(line.id!)
                  onOpen()
                }}
              >
                <Trash2 className="w-5" />
              </button>
            </div>
            <div className="flex items-center">
              <button
                className="h-7 border-1 px-1"
                onClick={() => handleMinus(line.id!)}
              >
                <Minus className="text-gray-500" />
              </button>
              <input
                className="h-7 w-10 rounded-none border-1 border-l-0 border-r-0 text-center"
                value={quantities[line.id!]}
                onChange={() => {
                  console.log('CHANGED')
                }}
              />
              <button
                className="h-7 border-1 px-1"
                onClick={() => handlePlus(line.id!)}
              >
                <Plus className="w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      ))}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Remove Item From Cart
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to remove these item(s)?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => onDeleteCheckoutLine(onClose)}
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
