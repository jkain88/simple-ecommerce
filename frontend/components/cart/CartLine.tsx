'use client'

import _ from 'lodash'
import { Checkbox } from '../ui/checkbox'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'
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
  const logAndSideEffects = (quantity: number) => {
    console.log('New Quantity:', quantity)
    // Add any other side effects here
  }

  const debouncedLogAndSideEffects = _.debounce(logAndSideEffects, 600) // 1000ms debounce time

  const handlePlus = useCallback(() => {
    setQuantity((prev) => {
      const newQuantity = prev! + 1
      debouncedLogAndSideEffects(newQuantity)
      return newQuantity
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMinus = useCallback(() => {
    setQuantity((prev) => {
      if (prev === 1) {
        onOpen()
        return prev
      }
      const newQuantity = prev! - 1
      debouncedLogAndSideEffects(newQuantity)
      return newQuantity
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      className="mt-3 grid grid-cols-2 items-center justify-between rounded-lg bg-white p-4 sm:flex-row md:grid-cols-3 md:gap-4"
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
        <div className="flex max-w-xs flex-col font-semibold md:text-lg">
          <p>{line.product_variant_detail!.name}</p>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center gap-2">
          <p className="font-semibold">₱{line.amount}</p>
          <button onClick={onOpen}>
            <Trash2 className="w-5" />
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mt-4 flex items-center">
          <button className="h-7 border-1 px-1" onClick={() => handleMinus()}>
            <Minus className="text-gray-500" />
          </button>
          <input
            className="h-7 w-10 rounded-none border-1 border-l-0 border-r-0 text-center"
            value={quantity}
            onChange={() => {
              console.log('CHANGED')
            }}
          />
          <button className="h-7 border-1 px-1" onClick={() => handlePlus()}>
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
