'use client'

import React from 'react'
import { Button } from '../ui/button'
import { Checkout, useCheckoutStore } from '@/store/checkout'
import { useMutation } from '@tanstack/react-query'
import { Api } from '@/lib/Api'
import { useSession } from 'next-auth/react'
import { Spinner } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

type Props = {
  buttonLabel: 'Place Order' | 'Proceed to Checkout'
  redirectLink: string
  checkout: Checkout | null
}

const CheckoutSummary: React.FC<Props> = ({
  buttonLabel,
  redirectLink,
  checkout,
}) => {
  const { data: session } = useSession()
  const resetCheckout = useCheckoutStore((state) => state.resetCheckout)
  const checkoutTotal = checkout?.lines?.reduce(
    (accumulator, line) => accumulator + Number(line.amount),
    0
  )
  const router = useRouter()
  const { mutate: checkoutComplete, isPending: isCheckoutCompleteLoading } =
    useMutation({
      mutationKey: ['checkoutComplete'],
      mutationFn: async () => {
        const api = new Api()
        return api.checkout.checkoutCompleteCreate(
          { checkout: checkout!.id! },
          {
            headers: {
              Authorization: `Token ${session?.token}`,
            },
          }
        )
      },
      onSuccess: () => {
        router.push('/orders')
        resetCheckout()
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    })
  const { mutate: checkoutPaymentCreate, isPending: isPaymentCreateLoading } =
    useMutation({
      mutationKey: ['checkoutPaymentCreate'],
      mutationFn: async () => {
        const api = new Api()
        return api.checkout.checkoutPaymentCreateCreate(
          {
            checkout: checkout?.id!,
            gateway: 'dummy',
          },
          {
            headers: {
              Authorization: `Token ${session?.token}`,
            },
          }
        )
      },
      onSuccess: () => {
        checkoutComplete()
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    })

  const onCheckoutSubmit = () => {
    if (buttonLabel === 'Place Order') {
      checkoutPaymentCreate()
    } else if (buttonLabel === 'Proceed to Checkout') {
      router.push('/checkout')
    }
  }

  return (
    <div className="sticky top-6 shrink-0 rounded-lg bg-white px-4 py-8 md:max-h-72 md:w-72">
      <p className="text-lg font-semibold">Checkout Summary</p>
      <div className="mt-4 flex flex-col gap-4 divide-y-2">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p>Subtotal:</p>
            <p>₱{checkoutTotal}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping Fee:</p>
            <p>₱0.00</p>
          </div>
        </div>
        <div className="flex justify-between pt-4">
          <p>Total:</p>
          <p>₱{checkoutTotal}</p>
        </div>
      </div>
      <Button
        className="mt-4 w-full"
        onClick={onCheckoutSubmit}
        disabled={isPaymentCreateLoading}
      >
        <div className="flex items-center gap-2">
          {isPaymentCreateLoading && <Spinner size="sm" color="default" />}
          {buttonLabel}
        </div>
      </Button>
    </div>
  )
}

export default CheckoutSummary
