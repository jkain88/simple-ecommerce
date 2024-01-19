'use client'

import { Checkbox } from '../ui/checkbox'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { Api } from '@/lib/Api'
import { useSession } from 'next-auth/react'
import { CheckoutLine, useCheckoutStore } from '@/store/checkout'
import React from 'react'

type Props = {
  line: CheckoutLine
}

const CartLine: React.FC<Props> = ({ line }) => {
  const { data: session } = useSession()
  const [quantity, setQuantity] = useState(line.quantity)
  // const [selected, setSelected] = useState(line.isSelected)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const checkout = useCheckoutStore((state) => state.checkout)
  const setCheckout = useCheckoutStore((state) => state.setCheckout)
  const { mutate: checkoutLineDelete } = useMutation({
    mutationKey: ['checkoutLineDelte'],
    mutationFn: async () => {
      const api = new Api()
      return api.checkout.checkoutLineDelete(line.id!, {
        headers: {
          Authorization: `Token ${session?.token}`,
        },
      })
    },
    onSuccess: () => {
      setCheckout({
        ...checkout,
        lines: checkout?.lines?.filter(
          (currentLine) => currentLine.id !== line.id
        ),
      })
    },
  })
  const handleMinus = (id: number) => {
    setQuantity((prev) => (prev! += 1))
  }

  const handlePlus = (id: number) => {
    setQuantity((prev) => (prev! -= 1))
  }

  const onDeleteCheckoutLine = (onClose: () => void) => {
    checkoutLineDelete()
    onClose()
  }

  const onSelectline = () => {
    // setSelected((prev) => !prev)
    setCheckout({
      ...checkout,
      lines: checkout?.lines?.map((lineStore) => {
        if (lineStore.id === line.id) {
          return {
            ...lineStore,
            isSelected: !lineStore.isSelected,
          }
        }
        return lineStore
      }),
    })
  }

  return (
    <div
      key={line.id}
      className="mt-5 flex items-center justify-between gap-4 rounded-lg bg-white p-4"
    >
      <div className="flex items-center gap-4">
        <Checkbox
          id={`line-${line.id}`}
          checked={line.isSelected}
          onClick={onSelectline}
        />
        <Image
          src={line!.product_variant_detail!.product!.thumbnail!}
          alt="Checkout Line"
          width={65}
          height={10}
        />
        <div className="flex flex-col">
          <p>{line.product_variant_detail!.name}</p>
        </div>
      </div>
      <div className="flex items-center gap-36">
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-semibold">₱{line.amount}</p>
          <button
            onClick={() => {
              //   setSelectedLineToDelete(line.id!)
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
            value={quantity}
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

export default CartLine
